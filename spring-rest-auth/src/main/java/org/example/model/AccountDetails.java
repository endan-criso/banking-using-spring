package org.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "accountInfo")
public class AccountDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String accountNo;
    private double cash;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;



    public AccountDetails(Long id, String accountNo, double cash) {
        this.id = id;
        this.accountNo = accountNo;
        this.cash = cash;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccountDetails(){

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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;

        if(user != null && user.getAccount() != this)
        {
            user.setAccount(this);
        }
    }
}
