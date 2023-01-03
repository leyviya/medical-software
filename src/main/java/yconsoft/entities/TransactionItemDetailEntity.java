package yconsoft.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TransactionItemDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer itemQuantity;
    private Integer itemPrice;

    private String ItemDescription;

    public void setItemDescription(String itemDescription) {
        ItemDescription = itemDescription;
    }

    public void setItemPrice(Integer itemPrice) {
        this.itemPrice = itemPrice;
    }

    public void setItemQuantity(Integer itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public Integer getId() {
        return id;
    }

    public Integer getItemPrice() {
        return itemPrice;
    }

    public Integer getItemQuantity() {
        return itemQuantity;
    }

    public String getItemDescription() {
        return ItemDescription;
    }
}
