/********************************************************************************
 * Copyright (C) 2022-2023 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
package org.eclipse.theia.cloud.operator.handler.ws;

import static org.eclipse.theia.cloud.common.util.LogMessageUtil.*;

import java.io.InputStream;
import java.util.ArrayList; // Add this import statement
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.eclipse.theia.cloud.common.k8s.client.TheiaCloudClient;
import org.eclipse.theia.cloud.common.k8s.resource.OperatorStatus;
import org.eclipse.theia.cloud.common.k8s.resource.StatusStep;
import org.eclipse.theia.cloud.common.k8s.resource.workspace.Workspace;
import org.eclipse.theia.cloud.common.k8s.resource.workspace.WorkspaceStatus;
import org.eclipse.theia.cloud.common.model.SnapshotGroup;
import org.eclipse.theia.cloud.common.model.SnapshotGroupList;
import org.eclipse.theia.cloud.common.model.SnapshotGroupSpec;
import org.eclipse.theia.cloud.common.util.WorkspaceUtil;
import org.eclipse.theia.cloud.operator.pv.PersistentVolumeCreator;

import com.google.inject.Inject;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import io.fabric8.kubernetes.api.model.ObjectMeta;
import io.fabric8.kubernetes.api.model.PersistentVolumeClaim;
import io.fabric8.kubernetes.client.DefaultKubernetesClient;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.Watcher;
import io.fabric8.kubernetes.client.WatcherException;
import io.fabric8.kubernetes.client.dsl.NonNamespaceOperation;
import io.fabric8.kubernetes.client.dsl.Resource;

@SuppressWarnings("deprecation")
public class LazyWorkspaceHandler implements WorkspaceHandler {
    private static final Logger LOGGER = LogManager.getLogger(LazyWorkspaceHandler.class);

    @Inject
    protected TheiaCloudClient client;

    @Inject
    protected PersistentVolumeCreator persistentVolumeHandler;

    @Override
    public boolean workspaceAdded(Workspace workspace, String correlationId) {
        try {
            return doWorkspaceAdded(workspace, correlationId);
        } catch (Throwable ex) {
            LOGGER.error(formatLogMessage(correlationId, "An unexpected exception occurred while adding Workspace: " + workspace), ex);
            client.workspaces().updateStatus(correlationId, workspace, status -> {
                status.setOperatorStatus(OperatorStatus.ERROR);
                status.setOperatorMessage("Unexpected error. Please check the logs for correlationId: " + correlationId);
            });
            return false;
        }
    }

    protected boolean doWorkspaceAdded(Workspace workspace, String correlationId) {
        LOGGER.info(formatLogMessage(correlationId, "Handling " + workspace));

        // Check current session status and ignore if handling failed or finished before
        Optional<WorkspaceStatus> status = Optional.ofNullable(workspace.getStatus());
        String operatorStatus = status.map(ws -> ws.getOperatorStatus()).orElse(OperatorStatus.NEW);
        if (OperatorStatus.HANDLED.equals(operatorStatus)) {
            LOGGER.trace(formatLogMessage(correlationId, "Workspace was successfully handled before and is skipped now. Workspace: " + workspace));
            return true;
        }
        if (OperatorStatus.HANDLING.equals(operatorStatus)) {
            LOGGER.warn(formatLogMessage(correlationId, "Workspace handling was unexpectedly interrupted before. Workspace is skipped now and its status is set to ERROR. Workspace: " + workspace));
            client.workspaces().updateStatus(correlationId, workspace, s -> {
                s.setOperatorStatus(OperatorStatus.ERROR);
                s.setOperatorMessage("Handling was unexpectedly interrupted before. CorrelationId: " + correlationId);
            });
            return false;
        }
        if (OperatorStatus.ERROR.equals(operatorStatus)) {
            LOGGER.warn(formatLogMessage(correlationId, "Workspace could not be handled before and is skipped now. Workspace: " + workspace));
            return false;
        }

        // Set workspace status to being handled
        client.workspaces().updateStatus(correlationId, workspace, s -> s.setOperatorStatus(OperatorStatus.HANDLING));

        String storageName = WorkspaceUtil.getStorageName(workspace);
        client.workspaces().updateStatus(correlationId, workspace, s -> s.setVolumeClaim(new StatusStep("started")));

        if (!client.persistentVolumesClient().has(storageName)) {
            LOGGER.trace(formatLogMessage(correlationId, "Creating new persistent volume named " + storageName));
            persistentVolumeHandler.createAndApplyPersistentVolume(correlationId, workspace);
        }

        client.workspaces().updateStatus(correlationId, workspace, s -> {
            s.setVolumeClaim(new StatusStep("finished"));
            s.setVolumeAttach(new StatusStep("started"));
        });

        if (!client.persistentVolumeClaimsClient().has(storageName)) {
            LOGGER.trace(formatLogMessage(correlationId, "Creating new persistent volume claim named " + storageName));
            Optional<PersistentVolumeClaim> pvc = persistentVolumeHandler.createAndApplyPersistentVolumeClaim(correlationId, workspace);
            if (pvc.isPresent()) {
                createGeminiSnapshotGroup(workspace, correlationId, pvc.get());
            } else {
                LOGGER.error(formatLogMessage(correlationId, "Failed to create PersistentVolumeClaim for storage " + storageName));
            }
        }

        client.workspaces().updateStatus(correlationId, workspace, s -> s.setVolumeAttach(new StatusStep("claimed")));

        LOGGER.trace(formatLogMessage(correlationId, "Set workspace storage " + storageName));
        client.workspaces().edit(correlationId, workspace.getSpec().getName(), toEdit -> toEdit.getSpec().setStorage(storageName));

        client.workspaces().updateStatus(correlationId, workspace, s -> s.setVolumeAttach(new StatusStep("finished")));

        client.workspaces().updateStatus(correlationId, workspace, s -> s.setOperatorStatus(OperatorStatus.HANDLED));
        return true;
    }

    @Override
    public boolean workspaceDeleted(Workspace workspace, String correlationId) {
        String sessionName = WorkspaceUtil.getSessionName(workspace.getSpec().getName());
        client.sessions().delete(correlationId, sessionName);

        String storageName = WorkspaceUtil.getStorageName(workspace);
        client.persistentVolumeClaimsClient().delete(correlationId, storageName);
        client.persistentVolumesClient().delete(correlationId, storageName);
        return true;
    }

private void createGeminiSnapshotGroup(Workspace workspace, String correlationId, PersistentVolumeClaim pvc) {
        try (final KubernetesClient kubernetesClient = new DefaultKubernetesClient()) {
            String namespace = kubernetesClient.getNamespace();

            // Load configuration from file
            InputStream resourceStream = getClass().getClassLoader().getResourceAsStream("snapshot.config");
            if (resourceStream == null) {
                throw new IllegalArgumentException("File not found: snapshot.conf");
            }
            Config config = ConfigFactory.parseReader(new java.io.InputStreamReader(resourceStream));

            // Retrieve the snapshot occurrence list from the configuration
            List<? extends Config> snapshotOccurrenceList = config.getConfigList("snapshot.config");

            // Convert the configuration list to the expected format
            List<String[]> snapshotOccurrences = new ArrayList<>();
            for (Config snapshotConfig : snapshotOccurrenceList) {
                String every = snapshotConfig.getString("every");
                int keep = snapshotConfig.getInt("keep");
                snapshotOccurrences.add(new String[]{every, String.valueOf(keep)});
            }

            // Create snapshot group client
            NonNamespaceOperation<SnapshotGroup, SnapshotGroupList, Resource<SnapshotGroup>> snapshotGroupClient =
                    kubernetesClient.resources(SnapshotGroup.class, SnapshotGroupList.class).inNamespace(namespace);

            // Create snapshot group
            SnapshotGroup snapshotGroup = new SnapshotGroup();
            ObjectMeta snapshotGroupMetadata = new ObjectMeta();
            snapshotGroupMetadata.setName(workspace.getSpec().getUser().replace(".", "-").replace("@", "-") + "-snapshotgroup");
            snapshotGroup.setMetadata(snapshotGroupMetadata);

            // Set schedule and persistent volume claim in snapshot group spec
            SnapshotGroupSpec snapshotGroupSpec = new SnapshotGroupSpec();
            snapshotGroupSpec.setSnapShotOccurance(snapshotOccurrences);
            SnapshotGroupSpec.PersistentVolumeClaim snapshotGroupPVC = new SnapshotGroupSpec.PersistentVolumeClaim();
            snapshotGroupPVC.setClaimName(pvc.getMetadata().getName());
            snapshotGroupSpec.setPersistentVolumeClaim(snapshotGroupPVC);
            snapshotGroup.setSpec(snapshotGroupSpec);

            // Create or replace snapshot group
            SnapshotGroup createdSnapshotGroup = snapshotGroupClient.createOrReplace(snapshotGroup);
            System.out.println("Upserted " + createdSnapshotGroup);

            // Watch for changes in the created snapshot group
            snapshotGroupClient.createOrReplace(createdSnapshotGroup);
            snapshotGroupClient.withResourceVersion(createdSnapshotGroup.getMetadata().getResourceVersion())
                    .watch(new Watcher<SnapshotGroup>() {
                        @Override
                        public void eventReceived(Action action, SnapshotGroup resource) {
                            System.out.println("==> " + action + " for " + resource);
                            if (resource.getSpec() == null) {
                                System.err.println("No Spec for resource " + resource);
                            }
                        }

                        @Override
                        public void onClose(WatcherException cause) {
                            // Handle watch closure if needed
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
  