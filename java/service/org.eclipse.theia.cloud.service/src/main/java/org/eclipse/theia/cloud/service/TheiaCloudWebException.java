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
package org.eclipse.theia.cloud.service;

import org.eclipse.theia.cloud.common.k8s.resource.session.Session;
import org.eclipse.theia.cloud.common.k8s.resource.session.SessionStatus;
import org.eclipse.theia.cloud.common.k8s.resource.workspace.Workspace;
import org.eclipse.theia.cloud.common.k8s.resource.workspace.WorkspaceStatus;
import org.eclipse.theia.cloud.common.util.TheiaCloudError;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

public class TheiaCloudWebException extends WebApplicationException {
    private static final long serialVersionUID = -4151261201767478256L;

    public TheiaCloudWebException(Response response) {
        super(response);
    }

    public TheiaCloudWebException(Response.Status status) {
        super(status);
    }

    public TheiaCloudWebException(Response.Status status, String message) {
        super(message, status);
    }

    public TheiaCloudWebException(TheiaCloudError status) {
        this(Response.status(status.getCode(), status.getReason()).entity(status).type(MediaType.APPLICATION_JSON_TYPE)
                .build());
    }

    public TheiaCloudWebException(String error) {
        this(TheiaCloudError.fromString(error));
    }

    public static Session throwIfErroneous(Session session) {
        throwIfErroneous(session.getNonNullStatus());
        return session;
    }

    public static SessionStatus throwIfErroneous(SessionStatus status) {
        if (status != null && status.hasError()) {
            throw new TheiaCloudWebException(TheiaCloudError.fromString(status.getError()));
        }
        return status;
    }

    public static Workspace throwIfErroneous(Workspace workspace) {
        throwIfErroneous(workspace.getNonNullStatus());
        return workspace;
    }

    public static WorkspaceStatus throwIfErroneous(WorkspaceStatus status) {
        if (status != null && status.getError() != null) {
            throw new TheiaCloudWebException(TheiaCloudError.fromString(status.getError()));
        }
        return status;
    }

    public static void throwIfError(String error) {
        if (TheiaCloudError.isErrorString(error)) {
            throw new TheiaCloudWebException(TheiaCloudError.fromString(error));
        }
    }

    public static void main(String[] args) {
        throwIfError(TheiaCloudError.INVALID_APP_ID.asString());
    }
}
