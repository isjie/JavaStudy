package test;

import model.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.junit.jupiter.api.Test;



public class MyTest {
    @Test
    public void testSave(){
        Configuration configure = new Configuration().configure();
        SessionFactory sessionFactory = configure.buildSessionFactory();
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();
        Student student = new Student("张三", 23, 93.5);
        session.save(student);
        session.getTransaction().commit();



    }
}
