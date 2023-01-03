package yconsoft.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Basic(optional = false)
    private Integer staffId;

    private Integer departmentId;

    @Column(name = "is_broken", columnDefinition = "boolean default false")
    private Boolean broken;

    @OneToMany(cascade = CascadeType.ALL)
    private List<TransactionItemDetailEntity> transactionItemDetailEntities;

    @Column(name = "transaction_date_time", columnDefinition = "TIMESTAMP default NOW()")
    private Date dateTime;

    public Integer getId() {
        return id;
    }

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    public Integer getStaffId() {
        return staffId;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setTransactionItemDetailEntities(List<TransactionItemDetailEntity> transactionItemDetailEntities) {
        this.transactionItemDetailEntities = transactionItemDetailEntities;
    }

    public List<TransactionItemDetailEntity> getTransactionItemDetailEntities() {
        return transactionItemDetailEntities;
    }

    public void setBroken(Boolean broken) {
        this.broken = broken;
    }

    public Boolean getBroken() {
        return broken;
    }
}
