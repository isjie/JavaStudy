package test;

import model.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.junit.jupiter.api.Test;
import utils.HbnUtils;


public class MyTest {
    @Test
    public void testSave(){
        Session session = HbnUtils.getSession();
        session.beginTransaction();
        Student student = new Student("关羽", 23, 93.5);
        session.save(student);
        session.getTransaction().commit();
    }

    @Test
    public void testUpdate(){
        Configuration configure = new Configuration().configure();
        SessionFactory sessionFactory = configure.buildSessionFactory();
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();
        Student student = new Student("赵云",26,99);
        student.setId(2);
        session.update(student);
        session.getTransaction().commit();

    }

    @Test
    public void testDelete(){
        Configuration configure = new Configuration().configure();
        SessionFactory sessionFactory = configure.buildSessionFactory();
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();
        Student student = new Student();
        student.setId(3);
        session.delete(student);
        session.getTransaction().commit();

    }

    /**
     * get()与load()的共同点：根据id加载对象
     * get()与load()的区别：
     * get():若加载的对象不存在，则返回null
     * load():若加载的对象不存在，则抛出异常
     * */

    @Test
    public void testGet(){
        Session session = HbnUtils.getSession();
        session.beginTransaction();
        Student student = session.get(Student.class, 1);
        System.out.println(student.toString());
        session.getTransaction().commit();

    }

    @Test
    public void testLoad(){
        Session session = HbnUtils.getSession();
        session.beginTransaction();
        Student student = session.get(Student.class, 2);
        System.out.println(student.getId());
        session.getTransaction().commit();

    }

    /**
     * 如果对象在数据库中不存在，则创建
     * 如果对象在数据库中存在，则更新
     */
    @Test
    public void testSaveOrUpdate(){
        Session session = HbnUtils.getSession();
        session.beginTransaction();
        Student student = new Student("二哈", 27, 98);
        session.saveOrUpdate(student);
        session.getTransaction().commit();

    }




}
