package service.impl;

import dao.TestDao;
import entity.Person;
import service.TestService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("testService")
public class TestServiceImpl implements TestService {
    @Override
    public void say() {
        System.out.println("hi");
    }

    @Resource
    private TestDao testDao;

    @Override
    public void save(Person person) {
        testDao.save(person);
    }


}
