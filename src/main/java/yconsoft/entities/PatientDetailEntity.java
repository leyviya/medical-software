package yconsoft.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Entity
public class PatientDetailEntity {
    public static final String GENDER_MALE = "M";
    public static final String GENDER_FEMALE = "F";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic(optional = false)
    private String firstname;
    @Basic(optional = false)
    private String lastname;
    private String phone;
    private String nextOfKinPhone;
    private String email;
    @Basic(optional = false)
    private String gender;
    @Basic(optional = false)
    private String currentAddress;
    private String nextOfKinName;
    private String stateOfOrigin;
    private String cityOfOrigin;

    private String bloodGroup;
    private Double height;
    private Double weight;
    @Basic(optional = false)
    private Date dateOfBirth;
    //make shift hardcoded doctor and nurse
    @Basic(optional = false)
    private String doctorInCharge;
    
    private String nurseInCharge;

    public void setDoctorInCharge(String doctorInCharge) {
        this.doctorInCharge = doctorInCharge;
    }

    public String getDoctorInCharge() {
        return doctorInCharge;
    }

    public void setNurseInCharge(String nurseInCharge) {
        this.nurseInCharge = nurseInCharge;
    }

    public String getNurseInCharge() {
        return nurseInCharge;
    }

    public Integer getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getNextOfKinPhone() {
        return nextOfKinPhone;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public void setNextOfKinPhone(String nextOfKinPhone) {
        this.nextOfKinPhone = nextOfKinPhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }
    @Transient
    public Integer getAge(){
        if(getDateOfBirth() == null){
            return -1;
        }else{
            return LocalDate.now(ZoneId.systemDefault()).getYear() - LocalDate.ofInstant(getDateOfBirth().toInstant(), ZoneId.systemDefault()).getYear();
        }
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCurrentAddress() {
        return currentAddress;
    }

    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }

    public String getStateOfOrigin() {
        return stateOfOrigin;
    }

    public void setStateOfOrigin(String stateOfOrigin) {
        this.stateOfOrigin = stateOfOrigin;
    }

    public String getCityOfOrigin() {
        return cityOfOrigin;
    }

    public void setCityOfOrigin(String cityOfOrigin) {
        this.cityOfOrigin = cityOfOrigin;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getNextOfKinName() {
        return nextOfKinName;
    }

    public void setNextOfKinName(String nextOfKinName) {
        this.nextOfKinName = nextOfKinName;
    }
}
