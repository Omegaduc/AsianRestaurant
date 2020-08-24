package com.web.restaurant.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String customerName;

    private String phone;

    private String email;

    private String createdDate;

    private String partySize;

    private String tableNum;




    public Customer(){

    }

    public Customer( String customerName, String phone, String email,String createdDate, String partySize, String tableNum) {
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
        this.createdDate = createdDate;
        this.partySize = partySize;
        this.tableNum = tableNum;

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String date) {
        this.createdDate = date;
    }

    public String getPartySize() {
        return partySize;
    }

    public void setPartySize(String partySize) {
        this.partySize = partySize;
    }

    public String getTableNum() {
        return tableNum;
    }

    public void setTableNum(String table) {
        this.tableNum = table;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phoneNumber) {
        this.phone = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
