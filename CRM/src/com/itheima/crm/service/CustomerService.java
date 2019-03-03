package com.itheima.crm.service;

import com.itheima.crm.pojo.Customer;
import com.itheima.crm.pojo.QueryVo;
import com.itheima.crm.utils.Page;

import java.util.List;

public interface CustomerService {
    Page<Customer> getCustomerByQueryVo(QueryVo vo);
    Customer getCustomerById(Integer id);
    void updateCustomer(Customer customer);
    void deleteCustomer(Integer id);
}
