package com.itheima.crm.service.impl;

import com.itheima.crm.mapper.CustomerMapper;
import com.itheima.crm.pojo.Customer;
import com.itheima.crm.pojo.QueryVo;
import com.itheima.crm.service.CustomerService;
import com.itheima.crm.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public Page<Customer> getCustomerByQueryVo(QueryVo vo) {
        vo.setStart((vo.getPage() - 1) * vo.getRows());
        Integer total = customerMapper.getCountByQueryVo(vo);
        List<Customer> list = customerMapper.getCustomerByQueryVo(vo);
        //包装分页数据
        Page<Customer> page = new Page<Customer>(total, vo.getPage(), vo.getRows(), list);
        return page;
    }


    @Override
    public Customer getCustomerById(Integer id) {
        return customerMapper.getCustomerById(id);
    }

    @Override
    public void updateCustomer(Customer customer) {
        customerMapper.updateCustomer(customer);
    }

    @Override
    public void deleteCustomer(Integer id) {
        customerMapper.deleteCustomer(id);
    }
}
