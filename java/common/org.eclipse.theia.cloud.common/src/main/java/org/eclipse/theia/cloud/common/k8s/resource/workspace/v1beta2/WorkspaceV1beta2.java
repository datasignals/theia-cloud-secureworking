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
package org.eclipse.theia.cloud.common.k8s.resource.workspace.v1beta2;

import org.eclipse.theia.cloud.common.k8s.resource.workspace.hub.WorkspaceHub;
import org.eclipse.theia.cloud.common.util.CustomResourceUtil;

import io.fabric8.kubernetes.api.model.Namespaced;
import io.fabric8.kubernetes.client.CustomResource;
import io.fabric8.kubernetes.model.annotation.Group;
import io.fabric8.kubernetes.model.annotation.Kind;
import io.fabric8.kubernetes.model.annotation.Plural;
import io.fabric8.kubernetes.model.annotation.Singular;
import io.fabric8.kubernetes.model.annotation.Version;

@Deprecated
@Version("v1beta2")
@Group("theia.cloud")
@Kind("Workspace")
@Singular("workspace")
@Plural("workspaces")
public class WorkspaceV1beta2 extends CustomResource<WorkspaceV1beta2Spec, WorkspaceV1beta2Status>
	implements Namespaced {

    public static final String API = "theia.cloud/v1beta2";
    public static final String CRD_NAME = "workspaces.theia.cloud";
    public static final String KIND = "Workspace";

    public WorkspaceV1beta2() {
    }

    public WorkspaceV1beta2(WorkspaceHub fromHub) {
	this.setMetadata(fromHub.getMetadata());
	this.spec = new WorkspaceV1beta2Spec(fromHub.getSpec());
	if (fromHub.getStatus() != null) {
	    this.status = new WorkspaceV1beta2Status(fromHub.getStatus());
	}
    }

    @Override
    public String toString() {
	return CustomResourceUtil.toString(this);
    }

}
