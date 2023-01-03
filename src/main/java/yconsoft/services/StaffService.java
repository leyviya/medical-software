package yconsoft.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import yconsoft.entities.DepartmentEntity;
import yconsoft.entities.StaffEntity;
import yconsoft.repository.StaffRepository;

import java.util.List;
import java.util.Optional;

@Component
public class StaffService {
    @Autowired
    StaffRepository staffRepository;

    public Optional<StaffEntity> getStaffById(int id){
        return staffRepository.findById(id);
    }
    public Optional<StaffEntity> getStaffByUsernamePwd(String username, String pwd){
        return Optional.ofNullable(staffRepository.findByUsernameAndPwd(username, pwd));
    }
    public List<StaffEntity> getStaffListByDepartment(DepartmentEntity departmentEntity, int upperLimit, int lowerLimit){
        return staffRepository.findByDepartment(departmentEntity.getId(), PageRequest.of(upperLimit, lowerLimit, Sort.by("id")));
    }
    public List<StaffEntity> getStaffList(int upperLimit, int lowerLimit){
        return staffRepository.findAll(PageRequest.of(upperLimit, lowerLimit, Sort.by(Sort.Direction.DESC, "id"))).getContent();
    }
    public Iterable<StaffEntity> getStaffList(){
        return staffRepository.findAll();
    }

    public StaffEntity saveAndGetStaff(StaffEntity newStaffEntity){
        return staffRepository.save(newStaffEntity);
    }

    public StaffRepository getStaffRepository(){
        return staffRepository;
    }
}
