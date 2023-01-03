package yconsoft.services;

import org.springframework.beans.factory.annotation.Autowired;
import yconsoft.contracts.APIService;
import yconsoft.entities.PatientEntity;
import yconsoft.entities.StaffEntity;
import yconsoft.repository.PatientRepository;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

public class PatientService implements APIService {
    @Autowired
    PatientRepository patientRepository; //service provides its data and other needs, controller simply calls as it needs

    public Optional<PatientEntity> getPatientById(int id){
        return patientRepository.findById(id);
    }
    public Iterable<PatientEntity> getPatientList(int upperLimit, int lowerLimit){
        return Collections.emptyList();
    }
    public Iterable<PatientEntity> getPatientListByAddedDate(LocalDate data){
        return Collections.emptyList();
    }
    public Iterable<PatientEntity> getPatientListByActivityDate(LocalDate data){
        return Collections.emptyList();
    }
    public Iterable<PatientEntity> getPatientListByLastActivityDate(LocalDate data){
        return Collections.emptyList();
    }
    public Iterable<PatientEntity> getPatientListByDateRange(LocalDate dateFrom, LocalDate dateTo){
        return Collections.emptyList();
    }
    public Iterable<PatientEntity> getPatientListByStaffInCharge(StaffEntity staffEntity){
        return Collections.emptyList();
    }
}
