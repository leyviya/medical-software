package yconsoft.services;

import org.springframework.beans.factory.annotation.Autowired;
import yconsoft.entities.StaffEntity;
import yconsoft.entities.TransactionEntity;
import yconsoft.repository.TransactionRepository;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    private Optional<TransactionEntity> getTransactionById(int id){
        return transactionRepository.findById(id);
    }
    private Iterable<TransactionEntity> getTransactionList(){
        return transactionRepository.findAll();
    }
    public Iterable<TransactionEntity> getTransactionListByAddedDate(LocalDate data){
        return Collections.emptyList();
    }
    public Iterable<TransactionEntity> getTransactionListByDateRange(LocalDate dateFrom, LocalDate dateTo){
        return Collections.emptyList();
    }
    public Iterable<TransactionEntity> getTransactionListByStaffInCharge(StaffEntity staffEntity){
        return Collections.emptyList();
    }
}
