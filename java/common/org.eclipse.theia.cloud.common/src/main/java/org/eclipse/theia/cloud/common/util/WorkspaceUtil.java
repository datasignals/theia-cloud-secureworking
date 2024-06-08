package org.eclipse.theia.cloud.common.util;

import static org.eclipse.theia.cloud.common.util.NamingUtil.*;

import java.time.Instant;

import org.eclipse.theia.cloud.common.k8s.resource.workspace.Workspace;

public final class WorkspaceUtil {
    private static final String SESSION_SUFFIX = "-session";
    private static final String STORAGE_SUFFIX = "pvc";
    private static final String STORAGE_SUFFIX_TOOLS = "pvc-tools";
    private static final String WORKSPACE_PREFIX = "ws-";
    private static final int WORKSPACE_NAME_LIMIT = NamingUtil.VALID_NAME_LIMIT - SESSION_SUFFIX.length();

    private WorkspaceUtil() {
	// util
    }

    public static String generateUniqueWorkspaceName(String user, String appDefinitionName) {
	return asValidName((WORKSPACE_PREFIX + Instant.now().toEpochMilli() + getWorkspaceDescription(appDefinitionName)
		+ "-" + user).toLowerCase(), WORKSPACE_NAME_LIMIT);
    }

    public static String generateNonUniqueWorkspaceName(String user, String appDefinitionName) {
	return asValidName((WORKSPACE_PREFIX + getWorkspaceDescription(appDefinitionName) + "-" + user).toLowerCase(),
		WORKSPACE_NAME_LIMIT);
    }

    public static String getSessionName(String workspaceName) {
	return workspaceName + SESSION_SUFFIX;
    }

    public static String getSessionName(String user, String appDefinitionName, boolean unique) {
	String workspaceName = unique ? generateUniqueWorkspaceName(user, getWorkspaceDescription(appDefinitionName))
		: generateNonUniqueWorkspaceName(user, getWorkspaceDescription(appDefinitionName));
	return getSessionName(workspaceName);
    }

    public static String getStorageName(Workspace workspace) {
	return NamingUtil.createName(workspace, STORAGE_SUFFIX);
    }

    public static String getStorageNameTools(Workspace workspace) {
        return NamingUtil.createName(workspace, STORAGE_SUFFIX_TOOLS);
    }



    public static String generateWorkspaceLabel(String user, String appDefinitionName) {
	return getWorkspaceDescription(appDefinitionName) + " of " + user;
    }

    protected static String getWorkspaceDescription(String appDefinitionName) {
	return (appDefinitionName == null || appDefinitionName.isBlank()) ? "Workspace" : appDefinitionName;
    }

}
