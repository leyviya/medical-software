package yconsoft.entities;

import javax.persistence.*;

@Entity
public class StaffPrivilegeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic(optional = false)
    private String code;
    @Basic(optional = false)
    private Boolean manageStaff;
    @Basic(optional = false)
    private Boolean managePatient;
    @Basic(optional = false)
    private Boolean manageTransactions;

    public void setId(Integer id) {
        this.id = id;
    }
    public void setCode(String code) {
        this.code = code;
    }

    public void setManagePatient(Boolean managePatient) {
        this.managePatient = managePatient;
    }

    public void setManageStaff(Boolean manageStaff) {
        this.manageStaff = manageStaff;
    }

    public void setManageTransactions(Boolean manageTransactions) {
        this.manageTransactions = manageTransactions;
    }

    public Integer getId() {
        return id;
    }

    public Boolean getManagePatient() {
        return managePatient;
    }

    public Boolean getManageStaff() {
        return manageStaff;
    }

    public Boolean getManageTransactions() {
        return manageTransactions;
    }

    public String getCode() {
        return code;
    }
}
