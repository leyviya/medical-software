package yconsoft.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import yconsoft.entities.PatientEntity;
import yconsoft.entities.StaffEntity;

import java.util.List;


public interface StaffRepository extends CrudRepository<StaffEntity, Integer> {
    @Query("select stf from StaffEntity stf where stf.username = :uname and stf.pwd = :pwd")
    StaffEntity findByUsernameAndPwd(@Param("uname") String username, @Param("pwd") String pwd);

    @Query("select stf from StaffEntity stf where stf.departmentId = :dept and stf.isActive = TRUE")
    List<StaffEntity> findByDepartment(@Param("dept") Integer departmentId, Pageable pageable);

    Page<StaffEntity> findAll(Pageable pageable);
    StaffEntity findByCode(String code);
}
