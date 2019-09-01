import entity.Person;
import service.TestService;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestMerge {

    ApplicationContext applicationContext;
    @BeforeEach
    public void loadCtx(){
        applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    }

    @Test
    public void testSpring(){
        TestService userService = (TestService) applicationContext.getBean("testService");
        userService.say();
    }
    @Test
    public void testHibernate(){
        SessionFactory sessionFactory = (SessionFactory) applicationContext.getBean("sessionFactory");
        Session session = sessionFactory.openSession();
        session.getTransaction().begin();
        Person person = new Person();
        person.setName("2019-04-29-学习");
        session.save(person);
        session.getTransaction().commit();
        session.close();

    }

    @Test
    public void testServiceAndDao(){
        TestService userService = (TestService) applicationContext.getBean("testService");
        Person person = new Person();
        person.setName("0429-2047");
        userService.save(person);
    }
}
