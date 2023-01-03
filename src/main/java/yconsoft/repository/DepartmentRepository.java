package yconsoft.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import yconsoft.entities.DepartmentEntity;

import java.util.List;

public interface DepartmentRepository extends CrudRepository<DepartmentEntity, Integer> {
    DepartmentEntity findByTitle(String title);
    List<DepartmentEntity> findAll(Pageable pageable);
}
