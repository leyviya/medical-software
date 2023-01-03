package yconsoft.repository;

import org.springframework.data.repository.CrudRepository;
import yconsoft.entities.StaffPrivilegeEntity;

public interface StaffPrivilegeRepository extends CrudRepository<StaffPrivilegeEntity, Integer> {
    StaffPrivilegeEntity findByCode(String code);
}
