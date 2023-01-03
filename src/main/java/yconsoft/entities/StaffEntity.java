package yconsoft.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
public class StaffEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic(optional = true)
    private String code;
/*
    @ManyToOne(cascade = CascadeType.ALL)
    private StaffPrivilegeEntity privilege;

    @ManyToOne(cascade = CascadeType.ALL)
    private Department department;
*/
    private Integer privilegeId;
    private Integer departmentId;

    @Basic(optional = false)
    private String username;
    @Basic(optional = false)
    private String pwd;
    @Basic(optional = false)
    private String firstname;
    @Basic(optional = false)
    private String lastname;
    private String phone;
    private String address;
    @Column(name="is_active", columnDefinition = "boolean default true")
    private Boolean isActive;

    @Column(name = "join_date_time", columnDefinition = "TIMESTAMP default NOW()")
    private Date joinDateTime;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setJoinDateTime(Date joinDateTime) {
        this.joinDateTime = joinDateTime;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Integer getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getAddress() {
        return address;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getPhone() {
        return phone;
    }

    public String getPwd() {
        return pwd;
    }

    public String getUsername() {
        return username;
    }

    public Date getJoinDateTime() {
        return joinDateTime;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public Integer getPrivilegeId() {
        return privilegeId;
    }

    public void setPrivilegeId(Integer privilegeId) {
        this.privilegeId = privilegeId;
    }

    @Override
    public String toString() {
        return "StaffEntity{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", privilegeId=" + privilegeId +
                ", departmentId=" + departmentId +
                ", username='" + username + '\'' +
                ", pwd='" + pwd + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", isActive=" + isActive +
                ", joinDateTime=" + joinDateTime +
                '}';
    }
}
