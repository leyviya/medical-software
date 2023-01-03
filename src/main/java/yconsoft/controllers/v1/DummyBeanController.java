package yconsoft.controllers.v1;

import org.springframework.web.bind.annotation.*;
import yconsoft.entities.*;
import yconsoft.services.SecurityService;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;

@RestController
@CrossOrigin("http://localhost")
@RequestMapping(path = "/v1/dummy")
public class DummyBeanController {
    @GetMapping(path = "/get-staff-privilege")
    public @ResponseBody
    StaffPrivilegeEntity getStaffPrivilege() {
        StaffPrivilegeEntity privilege = new StaffPrivilegeEntity();
        privilege.setCode("manager");
        //privilege.setCode("admin");
        //privilege.setCode("staff");
        privilege.setManageTransactions(true);
        privilege.setManageStaff(true);
        privilege.setManagePatient(true);
        return privilege;
    }

    @GetMapping(path = "/get-department")
    public @ResponseBody
    DepartmentEntity getDepartment() {
        DepartmentEntity departmentEntity = new DepartmentEntity();
        departmentEntity.setTitle("Pharmacy");
        departmentEntity.setDescription("Department where all drug related activities are handled");
        return departmentEntity;
    }

    @GetMapping(path = "/get-staff")
    public @ResponseBody
    StaffEntity getSampleStaff() {
        StaffEntity staffEntity = new StaffEntity();
        staffEntity.setPwd(SecurityService.getPasswordHash("JESUS"));
        staffEntity.setFirstname("Great");
        staffEntity.setLastname("King");
        staffEntity.setPhone("0908743844");
        staffEntity.setCode("ie2j43");
        staffEntity.setPrivilegeId(1);
        staffEntity.setDepartmentId(1);
        return staffEntity;
    }

    @GetMapping(path = "/get-patient")
    public @ResponseBody
    PatientEntity getPatient() {
        PatientEntity patientEntity = new PatientEntity();
        patientEntity.setCode(1);
        patientEntity.setJoinDateTime(Date.from(Instant.now()));
        patientEntity.setPatientCardType(PatientEntity.CARD_TYPE_INDIVIDUAL);

        PatientDetailEntity patientDetail = new PatientDetailEntity();
        patientDetail.setBloodGroup("OO");
        patientDetail.setDoctorInCharge("Dr Adejumo");
        patientDetail.setNurseInCharge("Nurse Juliet");
        patientDetail.setCityOfOrigin("osogbo");
        patientDetail.setCurrentAddress("Somewhere like somewhere");
        patientDetail.setDateOfBirth(
                Date.from(
                        LocalDate.of(1993, 11, 03)
                                .atStartOfDay()
                                .atZone(ZoneId.systemDefault()).toInstant())
        );
        patientDetail.setEmail("test@email.com");
        patientDetail.setFirstname("Adekunle");
        patientDetail.setGender(PatientDetailEntity.GENDER_MALE);
        patientDetail.setHeight(23.0);
        patientDetail.setLastname("Opemola");
        patientDetail.setNextOfKinName("Oluwaseyi ");
        patientDetail.setNextOfKinPhone("09034329384");
        patientDetail.setPhone("09034359434");
        patientDetail.setStateOfOrigin("Lagos");
        patientDetail.setWeight(80.0);

        patientEntity.setPatientDetail(patientDetail);
        return patientEntity;
    }

    @GetMapping(path = "/get-patient-activity")
    public @ResponseBody PatientActivityEntity getPatientActivity(){
        PatientActivityEntity activity = new PatientActivityEntity();
        activity.setDateTime(Date.from(Instant.now()));
        activity.setStaffId(2);
        activity.setNextAppointmentDateTime(Date.from(Instant.now()));
        activity.setActivityType(PatientActivityEntity.ACTIVITY_NEW_PATIENT);
        activity.setPatientId(1);
        return activity;
    }

    @GetMapping(path = "/get-transaction")
    public @ResponseBody TransactionEntity getTransaction(){
        TransactionEntity transactionEntity = new TransactionEntity();
        transactionEntity.setDateTime(Date.from(Instant.now()));
        transactionEntity.setDepartmentId(1);
        transactionEntity.setStaffId(1);
        TransactionItemDetailEntity details = new TransactionItemDetailEntity();
        details.setItemDescription("Paracetamol 300ml");
        details.setItemPrice(200);
        details.setItemQuantity(5);
        TransactionItemDetailEntity details2 = new TransactionItemDetailEntity();
        details2.setItemDescription("Flagill 150ml");
        details2.setItemPrice(10);
        details2.setItemQuantity(1);
        TransactionItemDetailEntity details3 = new TransactionItemDetailEntity();
        details3.setItemDescription("Orheptal Blood Tonic Nigerian Brand");
        details3.setItemPrice(1500);
        details3.setItemQuantity(2);
        transactionEntity.setTransactionItemDetailEntities(Arrays.asList(details, details2, details3));
        return transactionEntity;
    }
}
