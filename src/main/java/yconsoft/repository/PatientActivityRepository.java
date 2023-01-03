package yconsoft.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import yconsoft.entities.PatientActivityEntity;

import java.util.Date;
import java.util.List;

public interface PatientActivityRepository extends CrudRepository<PatientActivityEntity, Integer> {
    List<PatientActivityEntity> findByPatientId(Integer patientId);
    List<PatientActivityEntity> findByPatientId(Integer patientId, Pageable pageable);
    List<PatientActivityEntity> findByStaffId(Integer staffId);
    List<PatientActivityEntity> findByActivityType(String activityType, Sort sort);
    List<PatientActivityEntity> findAll(Sort sort);
    List<PatientActivityEntity> findAll(Pageable pageable);
    List<PatientActivityEntity> findByNextAppointmentDateTimeBetween(Date dateBegin, Date dateEnd, Sort sort);

}
