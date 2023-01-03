package yconsoft.beans;

public class ReceiptBean {
    private String buyer;
    private int totalCost;
    private String admin;

    public ReceiptBean(final String buyer, final int totalCost, final String admin){
        this.buyer = buyer;
        this.totalCost = totalCost;
        this.admin = admin;
    }

    public String getBuyer() {
        return buyer;
    }
    public String getAdmin(){
        return admin;
    }
    public int getTotalCost(){
        return totalCost;
    }
}
