package dao.impl;

import dao.TestDao;
import entity.Person;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class TestDaoImpl extends HibernateDaoSupport implements TestDao {


    @Override
    public void save(Person person) {
        this.getHibernateTemplate().save(person);
    }
}
