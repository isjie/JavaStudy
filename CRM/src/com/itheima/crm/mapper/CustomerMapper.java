package com.itheima.crm.mapper;

import com.itheima.crm.pojo.Customer;
import com.itheima.crm.pojo.QueryVo;

import java.util.List;

public interface CustomerMapper {
    List<Customer> getCustomerByQueryVo(QueryVo vo);
    Integer getCountByQueryVo(QueryVo vo);
    Customer getCustomerById(Integer id);
    void updateCustomer(Customer customer);
    void deleteCustomer(Integer id);
}
