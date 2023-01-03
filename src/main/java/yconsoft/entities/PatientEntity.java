package yconsoft.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
public class PatientEntity {
    public static final String CARD_TYPE_ANTENATAL = "ANTENATAL";
    public static final String CARD_TYPE_INDIVIDUAL = "INDIVIDUAL";
    public static final String CARD_TYPE_FAMILY = "FAMILY";
    public static final String CARD_TYPE_NHIS = "NHIS";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer code;
    @Column(name = "join_date_time", columnDefinition = "DATE NOT NULL DEFAULT '1970-01-01'")
    private Date joinDateTime;
    private Integer staffInChargeId;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    private PatientDetailEntity patientDetailEntity;

    @Basic(optional = false)
    private String patientCardType;

    public void setPatientDetail(PatientDetailEntity patientDetailEntity) {
        this.patientDetailEntity = patientDetailEntity;
    }

    public String getPatientCardType() {
        return patientCardType;
    }

    public void setPatientCardType(String patientCardType) {
        this.patientCardType = patientCardType;
    }

    public PatientDetailEntity getPatientDetailEntity() {
        return patientDetailEntity;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public void setJoinDateTime(Date joinDateTime) {
        this.joinDateTime = joinDateTime;
    }

    public Integer getCode() {
        return code;
    }

    public Integer getId() {
        return id;
    }

    public Date getJoinDateTime() {
        return joinDateTime;
    }

    public Integer getStaffInChargeId() {
        return staffInChargeId;
    }

    public void setStaffInChargeId(Integer staffInChargeId) {
        this.staffInChargeId = staffInChargeId;
    }

    public void setPatientDetailEntity(PatientDetailEntity patientDetailEntity) {
        this.patientDetailEntity = patientDetailEntity;
    }
}
