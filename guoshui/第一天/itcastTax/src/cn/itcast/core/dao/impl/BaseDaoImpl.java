package cn.itcast.core.dao.impl;

import cn.itcast.core.dao.BaseDao;
import org.hibernate.Query;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

public class BaseDaoImpl<T> extends HibernateDaoSupport implements BaseDao<T> {
    private Class<T> clazz;

    public BaseDaoImpl() {
        //获得class
        //        Class<T> clazz = (Class<T>) this.getClass();
        //获得带有泛型的父类，class继承的一个类
        //        Type type = clazz.getGenericSuperclass();
        //将带有泛型的父类转化为具体参数化的类型
        //        ParameterizedType pt = (ParameterizedType) type;
        //将参数化类型转化为实际参数类型
        //        clazz = (Class<T>)pt.getActualTypeArguments()[0];

        ParameterizedType pt =  (ParameterizedType)this.getClass().getGenericSuperclass();//BaseDaoImpl<User>
        clazz = (Class<T>)pt.getActualTypeArguments()[0];
    }


    @Override
    public void save(T entity) {
        this.getHibernateTemplate().save(entity);
    }

    @Override
    public void update(T entity) {
        this.getHibernateTemplate().update(entity);
    }

    @Override
    public void delete(Serializable id) {
        this.getHibernateTemplate().delete(id);
    }

    @Override
    public T findObjectById(Serializable id) {
        return this.getHibernateTemplate().get(clazz,id);
    }

    @Override
    public List<T> findObjects() {
//        Query query = getSession().createQuery("FROM " + clazz.getSimpleName());
//        return query.list();
    return this.getHibernateTemplate().find("FROM " + clazz.getSimpleName());
    }
}
