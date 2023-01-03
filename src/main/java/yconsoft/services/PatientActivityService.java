package yconsoft.services;

import org.springframework.beans.factory.annotation.Autowired;
import yconsoft.entities.PatientEntity;
import yconsoft.entities.PatientActivityEntity;
import yconsoft.entities.StaffEntity;
import yconsoft.repository.PatientRepository;

import java.time.LocalDate;
import java.util.Collections;

public class PatientActivityService {
    @Autowired
    private PatientRepository patientRepository;

    public Iterable<PatientActivityEntity> getPatientActivityListByPatient(PatientEntity patientEntity){
        return Collections.emptyList();
    }
    public Iterable<PatientActivityEntity> getPatientActivityListByStaff(StaffEntity staffEntity){
        return Collections.emptyList();
    }
    public Iterable<PatientActivityEntity> getPatientActivityListByDate(LocalDate date){
        return Collections.emptyList();
    }
    public Iterable<PatientActivityEntity> getPatientActivityListByDateRange(LocalDate dateFrom, LocalDate dateTo){
        return Collections.emptyList();
    }
    public Iterable<PatientActivityEntity> getPatientActivityList(){
        return Collections.emptyList();
    }
}
