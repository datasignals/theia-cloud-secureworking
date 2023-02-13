/********************************************************************************
 * Copyright (C) 2022 EclipseSource, Lockular, Ericsson, STMicroelectronics and 
 * others.
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
package org.eclipse.theia.cloud.service.workspace;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response.Status;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.theia.cloud.common.k8s.resource.Workspace;
import org.eclipse.theia.cloud.common.k8s.resource.WorkspaceSpec;
import org.eclipse.theia.cloud.common.util.TheiaCloudError;
import org.eclipse.theia.cloud.service.AccessRoles;
import org.eclipse.theia.cloud.service.ApplicationProperties;
import org.eclipse.theia.cloud.service.BaseResource;
import org.eclipse.theia.cloud.service.K8sUtil;
import org.eclipse.theia.cloud.service.TheiaCloudUser;
import org.eclipse.theia.cloud.service.TheiaCloudWebException;

@RolesAllowed(AccessRoles.USER)
@Path("/service/workspace")
public class WorkspaceResource extends BaseResource {

    @Inject
    private K8sUtil k8sUtil;

    @Inject
    private TheiaCloudUser theiaCloudUser;

    @Inject
    public WorkspaceResource(ApplicationProperties applicationProperties) {
	super(applicationProperties);
    }

    @Operation(summary = "List workspaces", description = "Lists the workspaces of a user.")
    @GET
    @Path("/{appId}/{user}")
    public List<UserWorkspace> list(@PathParam("appId") String appId, @PathParam("user") String user) {
	WorkspaceListRequest request = new WorkspaceListRequest(appId, user);
	String correlationId = evaluateRequest(request);
	info(correlationId, "Listing workspaces " + request);
	return k8sUtil.listWorkspaces(request.user);
    }

    @Operation(summary = "Create workspace", description = "Creates a new workspace for a user.")
    @POST
    public UserWorkspace create(WorkspaceCreationRequest request) {
	String correlationId = evaluateRequest(request);
	info(correlationId, "Creating workspace " + request);
	Workspace workspace = k8sUtil.createWorkspace(correlationId,
		new UserWorkspace(request.appDefinition, request.user, request.label));
	TheiaCloudWebException.throwIfErroneous(workspace);
	return new UserWorkspace(workspace.getSpec());
    }

    @Operation(summary = "Delete workspace", description = "Deletes a workspace.")
    @DELETE
    public boolean delete(WorkspaceDeletionRequest request) {
	String correlationId = evaluateRequest(request);
	if (request.workspaceName == null) {
	    throw new TheiaCloudWebException(TheiaCloudError.MISSING_WORKSPACE_NAME);
	}

	WorkspaceSpec existingWorkspace = k8sUtil.findWorkspace(request.workspaceName).orElse(null);
	if (existingWorkspace == null) {
	    info(correlationId, "Workspace " + request.workspaceName + " does not exist.");
	    // Return true because the goal of not having a workspace of the given name is
	    // reached
	    // Note: Another solution is returning a 404
	    return true;
	}
	if (!isOwner(theiaCloudUser, existingWorkspace)) {
	    info(correlationId,
		    "User " + theiaCloudUser.getIdentifier() + " does not own workspace " + request.workspaceName);
	    trace(correlationId, "Workspace: " + existingWorkspace);
	    throw new TheiaCloudWebException(Status.FORBIDDEN);
	}

	info(correlationId, "Deleting workspace " + request);
	return k8sUtil.deleteWorkspace(correlationId, request.workspaceName);
    }

    protected boolean isOwner(TheiaCloudUser user, WorkspaceSpec workspace) {
	if (user.isAnonymous()) {
	    logger.debugv("User is anonymous and cannot own workspace {0}", workspace);
	    return false;
	}

	if (workspace.getUser() == null || workspace.getUser().isBlank()) {
	    logger.warnv("Workspace does not have a user. {0}", workspace);
	    return false;
	}

	return workspace.getUser().equals(user.getIdentifier());
    }
}