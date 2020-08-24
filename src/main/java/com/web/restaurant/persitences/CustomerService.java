package com.web.restaurant.persitences;

import com.web.restaurant.models.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CustomerService {
    List<Customer> getByCustomerNameContaining(String name);

    Iterable<Customer> findAll();

    Customer save(Customer customer);

    void deleteByID(Integer id);


}
