package org.example.dto;

public class SendMoneyRequest {

    private String receiverEmail;
    private String accountNo;
    private double cash;

    public SendMoneyRequest(){

    }

    public SendMoneyRequest(String receiverEmail, String accountNo, double cash) {
        this.receiverEmail = receiverEmail;
        this.accountNo = accountNo;
        this.cash = cash;
    }

    public String getReceiverEmail() {
        return receiverEmail;
    }

    public void setReceiverEmail(String receiverEmail) {
        this.receiverEmail = receiverEmail;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public double getCash() {
        return cash;
    }

    public void setCash(double cash) {
        this.cash = cash;
    }
}
