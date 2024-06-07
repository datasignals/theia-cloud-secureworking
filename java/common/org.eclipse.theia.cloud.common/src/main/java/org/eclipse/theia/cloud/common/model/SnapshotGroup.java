package org.eclipse.theia.cloud.common.model;


import io.fabric8.kubernetes.api.model.Namespaced;
import io.fabric8.kubernetes.client.CustomResource;
import io.fabric8.kubernetes.model.annotation.Group;
import io.fabric8.kubernetes.model.annotation.Version;

@Group("gemini.fairwinds.com") // Replace with your actual API group
@Version("v1") // Replace with your actual API version

public class SnapshotGroup extends CustomResource<SnapshotGroupSpec, SnapshotGroupState> implements Namespaced{
    
    private String name;

    public String getName() {
        return name;
    }

    public String setName(String newName) {
        return this.name = newName;
    }
}
