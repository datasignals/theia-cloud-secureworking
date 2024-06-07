package org.eclipse.theia.cloud.common.model;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.theia.cloud.common.k8s.resource.appdefinition.AppDefinitionSpec;

@Buildable
public class SnapshotGroupSpec extends AppDefinitionSpec {
    private List<Schedule> schedule;
    private PersistentVolumeClaim persistentVolumeClaim;

    public List<Schedule> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<Schedule> schedule) {
        this.schedule = schedule;
    }

    public PersistentVolumeClaim getPersistentVolumeClaim() {
        return persistentVolumeClaim;
    }

    public void setPersistentVolumeClaim(PersistentVolumeClaim persistentVolumeClaim) {
        this.persistentVolumeClaim = persistentVolumeClaim;
    }

    public void setSnapShotOccurance(List<String[]> configList) {
        List<Schedule> scheduleList = new ArrayList<>();

        for (String[] entry : configList) {
            String every = entry[0];
            int keep = Integer.parseInt(entry[1]);

            Schedule schedule = new Schedule(every, keep);
            scheduleList.add(schedule);
        }

        this.setSchedule(scheduleList);
    }

    public static class Schedule {
        private String every;
        private int keep;

        public Schedule() {
        }

        public Schedule(String every, int keep) {
            this.every = every;
            this.keep = keep;
        }

        public String getEvery() {
            return every;
        }

        public int getKeep() {
            return keep;
        }
    }

    public static class PersistentVolumeClaim {
        private String claimName;

        public String getClaimName() {
            return claimName;
        }

        public void setClaimName(String claimName) {
            this.claimName = claimName;
        }
    }

    public enum TimeSchedule {
        HOUR,
        DAY,
        WEEK,
        MONTH
    }
}
