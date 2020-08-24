package com.web.restaurant.persitences;

import com.web.restaurant.models.Deli;

import java.util.List;

public interface DeliService {
    List<Deli> getByCustomerContaining(String name);

    Iterable<Deli> findAll();

    Deli save(Deli deli);

    void deleteByID(Integer id);


}