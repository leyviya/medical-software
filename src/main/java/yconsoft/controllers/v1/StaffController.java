package yconsoft.controllers.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yconsoft.beans.ResponseBean;
import yconsoft.contracts.BusinessConstantsConfig;
import yconsoft.entities.*;
import yconsoft.repository.DepartmentRepository;
import yconsoft.repository.LoginSessionRepository;
import yconsoft.repository.StaffPrivilegeRepository;
import yconsoft.services.IdentityService;
import yconsoft.services.SecurityService;
import yconsoft.services.StaffService;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@CrossOrigin("http://localhost")
@RequestMapping(path = "/v1/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;
    @Autowired
    private StaffPrivilegeRepository staffPrivilegeRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private LoginSessionRepository loginSessionRepository;

    @GetMapping(path = "/get-staff/{staff_id}")
    public ResponseEntity<ResponseBean<StaffEntity>> getStaff(@PathVariable("staff_id") Integer staffId) {
        Optional<StaffEntity> staff = staffService.getStaffById(staffId);

        return (staff.isEmpty()) ? ResponseEntity.status(401).body(new ResponseBean<>("staff does not exist with ID: " + staffId))
                : ResponseEntity.ok(new ResponseBean<>("ok", staff.get()));
    }
    @GetMapping("/get-staff-code/{staff_code}")
    public ResponseEntity<ResponseBean<StaffEntity>> getPatientByCode(@PathVariable("staff_code") String staffCode) {
        Optional<StaffEntity> staff = Optional.ofNullable(staffService.getStaffRepository().findByCode(staffCode));

        return (staff.isEmpty()) ?
                ResponseEntity.status(401)
                        .body(new ResponseBean<>("staff does not exist with Code: " + staffCode))
                : ResponseEntity.ok(new ResponseBean<>("ok", staff.get()));
    }

    @GetMapping(path = "/get-staff-list/{top_limit},{lower_limit}")
    public ResponseEntity<ResponseBean<List<StaffEntity>>> getStaffList(@PathVariable Integer top_limit,
                                                                        @PathVariable Integer lower_limit) {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                staffService.getStaffList(top_limit, lower_limit)));
    }

    @GetMapping("/get-staff-count")
    public ResponseEntity<ResponseBean<Long>> getStaffCount() {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                staffService.getStaffRepository().count()));
    }

    @PostMapping(path = "/staff-logout")
    public ResponseEntity<ResponseBean<String>> staffLogout(@RequestParam("staff_id") Integer staffId, HttpServletRequest servletRequest) {
        loginSessionRepository.delete(
                loginSessionRepository.findByUserId(staffId)
        );
        return ResponseEntity.status(201)
                .body(new ResponseBean<>("staff session destroyed"));
    }

    @PostMapping(path = "/staff-login")
    public ResponseEntity<ResponseBean<StaffEntity>> staffLogin(@RequestParam String username, @RequestParam String pwd, HttpServletRequest servletRequest) {
        pwd = SecurityService.getPasswordHash(pwd);
        Optional<StaffEntity> staff = staffService.getStaffByUsernamePwd(username, pwd);
        if (staff.isEmpty()) {
            return ResponseEntity.status(401).body(new ResponseBean<>("staff username and password does not exist"));
        }
        Optional<LoginSessionEntity> sessionEntity = Optional.ofNullable(loginSessionRepository.findByUserId(staff.get().getId()));
        //if user already has a session
        if (sessionEntity.isPresent()) {
            if (System.currentTimeMillis() >= sessionEntity.get().getExpires()) {
                //session expired, lets delete it and generate a new one
                loginSessionRepository.delete(sessionEntity.get());
                //go on to create a new one
            } else {
                return ResponseEntity.ok()
                        .body(new ResponseBean<>(
                                String.format("token:%s, expires:%s",
                                        sessionEntity.get().getSessionToken(),
                                        sessionEntity.get().getExpires()),
                                staff.get()));
            }
        }
        String sessionToken = SecurityService.generateStaffSessionToken(
                servletRequest.getHeader("X-FORWARDED-FOR"),
                staff.get().getUsername(),
                staff.get().getCode());
        LoginSessionEntity newSession = new LoginSessionEntity();
        newSession.setSessionToken(sessionToken);
        newSession.setPrivilegeId(staff.get().getPrivilegeId());
        newSession.setUserId(staff.get().getId());
        newSession.setExpires(System.currentTimeMillis() + BusinessConstantsConfig.expiryThreshold);
        loginSessionRepository.save(newSession);
        return ResponseEntity.ok()
                .body(new ResponseBean<>(
                        String.format("token:%s, expires:%s",
                                newSession.getSessionToken(),
                                newSession.getExpires()),
                        staff.get()));
    }

    @PostMapping(path = "/add-staff")
    public ResponseEntity<ResponseBean<StaffEntity>> addStaff(@RequestBody StaffEntity newStaffEntity) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing staff"));
        }*/

        if (staffPrivilegeRepository.findById(newStaffEntity.getPrivilegeId()).isEmpty()) {
            return ResponseEntity.status(400)
                    .body(new ResponseBean<>(String.format("privilege ID: %s does not exist", newStaffEntity.getPrivilegeId())));
        }
        if (departmentRepository.findById(newStaffEntity.getDepartmentId()).isEmpty()) {
            return ResponseEntity.status(400)
                    .body(new ResponseBean<>(String.format("department ID: %s does not exist", newStaffEntity.getDepartmentId())));
        }
        newStaffEntity.setPwd(SecurityService.getPasswordHash(newStaffEntity.getPwd()));
        Optional<StaffEntity> existing = staffService.getStaffByUsernamePwd(newStaffEntity.getUsername(), newStaffEntity.getPwd());
        if (existing.isPresent()) {
            return ResponseEntity.status(400)
                    .body(new ResponseBean<>("staff already exists with same password and username", existing.get()));
        }
        //otherwise
        newStaffEntity.setCode(IdentityService.generateUniqueIdentity());
        newStaffEntity.setJoinDateTime(Date.from(Instant.now()));
        return ResponseEntity
                .status(201)
                .body(new ResponseBean<>("staff added",
                        staffService.saveAndGetStaff(newStaffEntity)));
    }

    @PutMapping(path = "/update-staff")
    public ResponseEntity<ResponseBean<StaffEntity>> updateStaff(@RequestBody StaffEntity staffEntity) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing staff"));
        }*/

        if (staffService.getStaffById(staffEntity.getId()).isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("staff ID does not exists"));
        }
        staffEntity.setPwd(SecurityService.getPasswordHash(staffEntity.getPwd()));
        return ResponseEntity.status(201)
                .body(new ResponseBean<>("staff updated", staffService.saveAndGetStaff(staffEntity)));
    }

    @DeleteMapping(path = "/delete-staff/{staff_id}")
    public ResponseEntity<ResponseBean<String>> deleteStaff(@PathVariable("staff_id") Integer staffId) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing staff"));
        }*/

        Optional<StaffEntity> staff = staffService.getStaffById(staffId);
        if (staff.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("staff ID does not exists"));
        }
        staffService.getStaffRepository().delete(staff.get());
        return ResponseEntity.status(201)
                .body(new ResponseBean<>("staff deleted"));
    }

    @GetMapping(path = "/get-staff-privilege/{staff_id}")
    public ResponseEntity<ResponseBean<StaffPrivilegeEntity>> getStaffPrivilege(@PathVariable("staff_id") Integer staffId) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing staff"));
        }*/

        Optional<StaffEntity> staff = staffService.getStaffById(staffId);
        if (staff.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("staff ID does not exists"));
        }
        return ResponseEntity.ok(new ResponseBean<>("ok",
                staffPrivilegeRepository
                        .findById(staff.get().getPrivilegeId()).get()));
    }

    @PostMapping(path = "/add-staff-privilege")
    public ResponseEntity<ResponseBean<StaffPrivilegeEntity>> addStaffPrivilege(@RequestBody StaffPrivilegeEntity newStaffPrivilegeEntity) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing staff"));
        }*/

        Optional<StaffPrivilegeEntity> existing = Optional.ofNullable(staffPrivilegeRepository.findByCode(newStaffPrivilegeEntity.getCode()));
        if (existing.isEmpty()) {
            return ResponseEntity.status(201)
                    .body(new ResponseBean<>("privilege created",
                            staffPrivilegeRepository.save(newStaffPrivilegeEntity)));
        } else {
            return ResponseEntity.status(400)
                    .body(new ResponseBean<>(String.format("Privilege with code: %s already exists", newStaffPrivilegeEntity.getCode()), existing.get()));
        }
    }

    @PostMapping(path = "/add-staff-department")
    public ResponseEntity<ResponseBean<DepartmentEntity>> addDepartment(@RequestBody DepartmentEntity newDepartmentEntity) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing staff"));
        }*/

        Optional<DepartmentEntity> existing = Optional.ofNullable(departmentRepository.findByTitle(newDepartmentEntity.getTitle()));
        if (existing.isEmpty()) {
            return ResponseEntity.status(201)
                    .body(new ResponseBean<>("department added",
                            departmentRepository.save(newDepartmentEntity)));
        } else {
            return ResponseEntity.status(400)
                    .body(new ResponseBean<>(String.format("Department with title: %s already exists", newDepartmentEntity.getTitle()), existing.get()));
        }
    }

    @GetMapping(path = "/get-staff-departments")
    public ResponseEntity<ResponseBean<List<DepartmentEntity>>> getDepartments() {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                StreamSupport.stream(departmentRepository.findAll().spliterator(), false)
                        .collect(Collectors.toList())));
    }

    @DeleteMapping(path = "/delete-staff-department/{department_id}")
    public ResponseEntity<ResponseBean<String>> deleteDepartment(@PathVariable("department_id") Integer departmentId) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing staff departments"));
        }*/

        if (!departmentRepository.existsById(departmentId)) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("department ID does not exists"));
        }
        departmentRepository.deleteById(departmentId);
        return ResponseEntity.status(201)
                .body(new ResponseBean<>("department deleted"));
    }
}
