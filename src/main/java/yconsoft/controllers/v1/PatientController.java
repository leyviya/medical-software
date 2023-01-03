package yconsoft.controllers.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yconsoft.beans.ResponseBean;
import yconsoft.entities.PatientActivityEntity;
import yconsoft.entities.PatientEntity;
import yconsoft.repository.PatientActivityRepository;
import yconsoft.repository.PatientRepository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Please note that All auth mechanisms have been disabled.
 */
@RestController
@CrossOrigin("http://localhost")
@RequestMapping(path = "/v1/patient")
public class PatientController {
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    PatientActivityRepository patientActivityRepository;

    @GetMapping("/get-patient/{patient_id}")
    public ResponseEntity<ResponseBean<PatientEntity>> getPatient(@PathVariable("patient_id") Integer patientId) {
        Optional<PatientEntity> patient = patientRepository.findById(patientId);

        return (patient.isEmpty()) ?
                ResponseEntity.status(401)
                        .body(new ResponseBean<>("patient does not exist with ID: " + patientId))
                : ResponseEntity.ok(new ResponseBean<>("ok", patient.get()));
    }

    @GetMapping("/get-patient-code/{patient_code}")
    public ResponseEntity<ResponseBean<PatientEntity>> getPatientByCode(@PathVariable("patient_code") Integer patientCode) {
        Optional<PatientEntity> patient = Optional.ofNullable(patientRepository.findByCode(patientCode));

        return (patient.isEmpty()) ?
                ResponseEntity.status(401)
                        .body(new ResponseBean<>("patient does not exist with Code: " + patientCode))
                : ResponseEntity.ok(new ResponseBean<>("ok", patient.get()));
    }

    @GetMapping(path = "/get-patient-list/{upper_limit},{lower_limit}")
    public ResponseEntity<ResponseBean<List<PatientEntity>>> getPatientList(@PathVariable Integer upper_limit,
                                                                            @PathVariable Integer lower_limit) {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                patientRepository.findAll(PageRequest.of(upper_limit, lower_limit,
                        Sort.by(Sort.Direction.DESC, "id")))));
    }

    @GetMapping("/get-patient-count")
    public ResponseEntity<ResponseBean<Long>> getPatientCount() {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                patientRepository.count()));
    }

    @PostMapping(path = "/add-patient")
    public ResponseEntity<ResponseBean<PatientEntity>> addPatient(@RequestBody PatientEntity newPatientEntity) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManagePatient()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing patients"));
        }*/

        //otherwise
        //newPatientEntity.setStaffInChargeId(AccessAuthInterceptor.getCurrentStaff().getId());
        newPatientEntity.setJoinDateTime(Date.from(Instant.now()));
        newPatientEntity.setCode((int) (patientRepository.count() + 1));
        //a new activity should be created for mew patient
        newPatientEntity = patientRepository.save(newPatientEntity);
        PatientActivityEntity patientActivity = new PatientActivityEntity();
        patientActivity.setStaffId(newPatientEntity.getStaffInChargeId());
        patientActivity.setPatientId(newPatientEntity.getId());
        patientActivity.setActivityType(PatientActivityEntity.ACTIVITY_NEW_PATIENT);
        patientActivity.setDateTime(Date.from(Instant.now()));
        patientActivityRepository.save(patientActivity);
        return ResponseEntity
                .status(201)
                .body(new ResponseBean<>("patient created",
                        newPatientEntity));
    }

    @PutMapping(path = "/update-patient")
    public ResponseEntity<ResponseBean<PatientEntity>> updatePatient(@RequestBody PatientEntity patientEntity) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManagePatient()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing patient"));
        }*/

        if (!patientRepository.existsById(patientEntity.getId())) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("patient ID does not exists"));
        }
        return ResponseEntity.status(201)
                .body(new ResponseBean<>("patient details updated", patientRepository.save(patientEntity)));
    }

    @DeleteMapping(path = "/delete-patient/{patient_id}")
    public ResponseEntity<ResponseBean<String>> deletePatient(@PathVariable("patient_id") Integer patientId) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManageStaff()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing patients"));
        }*/

        if (!patientRepository.existsById(patientId)) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("patient ID does not exists"));
        }
        patientRepository.deleteById(patientId);
        return ResponseEntity.status(201)
                .body(new ResponseBean<>("patient deleted"));
    }

    @PostMapping(path = "/add-patient-activity")
    public ResponseEntity<ResponseBean<PatientActivityEntity>> addPatientActivity(@RequestBody PatientActivityEntity newPatientActivity) {
        /*if (!AccessAuthInterceptor.getCurrentStaffPrivileges().getManagePatient()) {
            return ResponseEntity.status(403)
                    .body(new ResponseBean<>("This staff session does not have the privilege of managing patients"));
        }*/
        if (!patientRepository.existsById(newPatientActivity.getPatientId())) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("patient ID does not exists"));
        }
        //otherwise
        newPatientActivity.setStaffId(newPatientActivity.getStaffId());
        newPatientActivity.setDateTime(Date.from(Instant.now()));
        return ResponseEntity
                .status(201)
                .body(new ResponseBean<>("patient activity created",
                        patientActivityRepository.save(newPatientActivity)));
    }

    @GetMapping(path = "/get-patient-activity/{patient_id}/{upper_limit},{lower_limit}")
    public ResponseEntity<ResponseBean<List<PatientActivityEntity>>> getPatientActivityList(@PathVariable Integer patient_id,
                                                                                            @PathVariable Integer upper_limit,
                                                                                            @PathVariable Integer lower_limit) {
        if (!patientRepository.existsById(patient_id)) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("patient_id does not exist"));
        }
        return ResponseEntity.ok(new ResponseBean<>("ok",
                patientActivityRepository.findByPatientId(patient_id, PageRequest.of(upper_limit, lower_limit,
                        Sort.by(Sort.Direction.DESC, "id")))));
    }
    @GetMapping("/get-activity-appointment-date")
    public ResponseEntity<ResponseBean<List<PatientActivityEntity>>> getActivityByAppointmentDate(@RequestParam("date_begin") String dateBeginStr,
                                                                                                 @RequestParam("date_end") String dateEndStr) {
        Date dateBegin = Date.from(Instant.parse(dateBeginStr));
        Date dateEnd = Date.from(Instant.parse(dateEndStr));
        return ResponseEntity.ok(new ResponseBean<>("ok",
                patientActivityRepository.findByNextAppointmentDateTimeBetween(dateBegin, dateEnd,
                Sort.by(Sort.Direction.DESC, "id"))));
    }
    @GetMapping(path = "/get-patient-activity-code/{patient_code}/{upper_limit},{lower_limit}")
    public ResponseEntity<ResponseBean<List<PatientActivityEntity>>> getPatientActivityCodeList(@PathVariable Integer patient_code,
                                                                                            @PathVariable Integer upper_limit,
                                                                                            @PathVariable Integer lower_limit) {
        Optional<PatientEntity> patient = Optional.ofNullable(patientRepository.findByCode(patient_code));
        if (patient.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("patient_code does not exist"));
        }
        return ResponseEntity.ok(new ResponseBean<>("ok",
                patientActivityRepository.findByPatientId(patient.get().getId(), PageRequest.of(upper_limit, lower_limit,
                        Sort.by(Sort.Direction.DESC, "id")))));
    }

    @GetMapping(path = "/get-patient-activity")
    public ResponseEntity<ResponseBean<List<PatientActivityEntity>>> getAllPatientActivityList() {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                patientActivityRepository.findAll(Sort.by(Sort.Direction.DESC, "id"))));
    }

    @GetMapping(path = "/get-patient-activity/{upper_limit},{lower_limit}")
    public ResponseEntity<ResponseBean<List<PatientActivityEntity>>> getAllPatientActivityList(@PathVariable Integer upper_limit,
                                                                                               @PathVariable Integer lower_limit) {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                patientActivityRepository.findAll(PageRequest.of(upper_limit, lower_limit,
                        Sort.by(Sort.Direction.DESC, "id")))));
    }
}
