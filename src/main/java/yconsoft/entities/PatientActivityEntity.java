package yconsoft.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
public class PatientActivityEntity {
    public static final String ACTIVITY_NEW_PATIENT = "New Patient Registration";
    public static final String ACTIVITY_RETURNING_PATIENT = "Returning Patient";
    public static final String ACTIVITY_ADMITTED_PATIENT = "Admitted Patient";
    public static final String ACTIVITY_DISCHARGED_PATIENT = "Discharged Patient";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic(optional = false)
    private Integer patientId;

    @Basic(optional = false)
    private Integer staffId;

    @Basic(optional = false)
    private String activityType;
    private String remarks;

    private Date dateTime;

    private Date nextAppointmentDateTime;

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public Integer getId() {
        return id;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Date getNextAppointmentDateTime() {
        return nextAppointmentDateTime;
    }

    public void setNextAppointmentDateTime(Date nextAppointmentDateTime) {
        this.nextAppointmentDateTime = nextAppointmentDateTime;
    }
    public Integer getStaffId() {
        return staffId;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getRemarks() {
        return remarks;
    }
}
