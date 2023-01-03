package yconsoft.controllers.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yconsoft.beans.ResponseBean;
import yconsoft.controllers.v1.config.AccessAuthInterceptor;
import yconsoft.entities.TransactionEntity;
import yconsoft.repository.DepartmentRepository;
import yconsoft.repository.StaffRepository;
import yconsoft.repository.TransactionRepository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/transaction")
@CrossOrigin("http://localhost")
public class TransactionController {
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    DepartmentRepository departmentRepository;

    @GetMapping("/get-transactions/{upper_limit},{lower_limit}")
    public ResponseEntity<ResponseBean<List<TransactionEntity>>> getTransactions(@PathVariable Integer upper_limit,
                                                                                 @PathVariable Integer lower_limit) {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                transactionRepository.findAll(PageRequest.of(upper_limit, lower_limit,
                        Sort.by(Sort.Direction.DESC, "id")))));
    }
    @GetMapping("/get-transactions-count")
    public ResponseEntity<ResponseBean<Long>> getTransactionsCount() {
        return ResponseEntity.ok(new ResponseBean<>("ok",
                transactionRepository.count()));
    }

    @GetMapping("/get-staff-transactions/{staff_id}")
    public ResponseEntity<ResponseBean<List<TransactionEntity>>> getStaffTransactions(@PathVariable("staff_id") Integer staffId) {
        if (!staffRepository.existsById(staffId)) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("staff ID does not exists"));
        }

        return ResponseEntity.ok(new ResponseBean<>("ok", transactionRepository.findByStaffId(staffId,
                Sort.by(Sort.Direction.DESC, "id"))));
    }
    @GetMapping("/staff-transactions-date-range")
    public ResponseEntity<ResponseBean<List<TransactionEntity>>> getStaffTransactionsByDateRange(@RequestParam("date_begin") String dateBeginStr,
                                                                                                 @RequestParam("date_end") String dateEndStr) {
        Date dateBegin = Date.from(Instant.parse(dateBeginStr));
        Date dateEnd = Date.from(Instant.parse(dateEndStr));
        return ResponseEntity.ok(new ResponseBean<>("ok", transactionRepository.findByDateTimeBetween(dateBegin, dateEnd,
                Sort.by(Sort.Direction.DESC, "id"))));
    }
    @GetMapping("/break-staff-transaction/{trans_id}")
    public ResponseEntity<ResponseBean<TransactionEntity>> breakStaffTransaction(@PathVariable("trans_id") Integer transId) {
        Optional<TransactionEntity> trans = transactionRepository.findById(transId);
        if (trans.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("transaction ID does not exists"));
        }
        trans.get().setBroken(true);
        transactionRepository.save(trans.get());
        return ResponseEntity.ok(new ResponseBean<>("ok"));
    }

    @GetMapping("/get-department-transactions/{department_id}")
    public ResponseEntity<ResponseBean<List<TransactionEntity>>> getDepartmentTransactions(@PathVariable("department_id") Integer departmentId) {
        if (!departmentRepository.existsById(departmentId)) {
            return ResponseEntity.status(401)
                    .body(new ResponseBean<>("department ID does not exists"));
        }

        return ResponseEntity.ok(new ResponseBean<>("ok", transactionRepository.findByDepartmentId(departmentId,
                Sort.by(Sort.Direction.DESC, "id"))));
    }

    @PostMapping(path = "/add-transaction")
    public ResponseEntity<ResponseBean<TransactionEntity>> addTransaction(@RequestBody TransactionEntity transactionEntity) {
        if (departmentRepository.findById(transactionEntity.getDepartmentId()).isEmpty()) {
            return ResponseEntity.status(400)
                    .body(new ResponseBean<>(String.format("department ID: %s does not exist", transactionEntity.getDepartmentId())));
        }
        //otherwise
        //transactionEntity.setStaffId(AccessAuthInterceptor.getCurrentStaff().getId());
        transactionEntity.setDateTime(Date.from(Instant.now()));
        return ResponseEntity
                .status(201)
                .body(new ResponseBean<>("transaction added",
                        transactionRepository.save(transactionEntity)));
    }

    //by data range, by date, by price, sorts by -< these
}
