package yconsoft.services;

import org.springframework.beans.factory.annotation.Autowired;
import yconsoft.entities.DepartmentEntity;
import yconsoft.repository.DepartmentRepository;


public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    public Iterable<DepartmentEntity> getDepartments(){
        return departmentRepository.findAll();
    }
}
