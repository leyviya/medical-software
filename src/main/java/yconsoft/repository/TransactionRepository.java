package yconsoft.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import yconsoft.entities.TransactionEntity;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends CrudRepository<TransactionEntity, Integer> {
    List<TransactionEntity> findByStaffId(Integer staffId, Sort sort);
    List<TransactionEntity> findByDepartmentId(Integer departmentId, Sort sort);
    List<TransactionEntity> findAll(Pageable pageable);
    List<TransactionEntity> findByDateTimeBetween(Date dateTimeBegin, Date dateTimeEnd, Sort sort);
}
