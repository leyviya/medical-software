package yconsoft.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import yconsoft.entities.PatientEntity;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PatientRepository extends CrudRepository<PatientEntity, Integer> {
    PatientEntity findByCode(Integer code);
    List<PatientEntity> findByStaffInChargeId(Integer staffInChargeId);
    List<PatientEntity> findByJoinDateTime(Date joinDateTime);
    List<PatientEntity> findAll(Pageable pageable);
}
