package org.example.dto;

public class UserProfileRequest {

    private String name;
    private String accNo;
    private double cash;

    public UserProfileRequest(String name, String accNo, double cash) {
        this.name = name;
        this.accNo = accNo;
        this.cash = cash;
    }

    public UserProfileRequest(){

        
    }

    public String getAccNo() {
        return accNo;
    }

    public void setAccNo(String accNo) {
        this.accNo = accNo;
    }

    public double getCash() {
        return cash;
    }

    public void setCash(double cash) {
        this.cash = cash;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
