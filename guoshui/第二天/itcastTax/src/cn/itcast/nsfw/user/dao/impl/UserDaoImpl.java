package cn.itcast.nsfw.user.dao.impl;

import cn.itcast.core.dao.impl.BaseDaoImpl;
import cn.itcast.nsfw.user.entity.User;
import cn.itcast.nsfw.user.dao.UserDao;
import cn.itcast.nsfw.user.entity.UserRole;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;

import java.io.Serializable;
import java.util.List;

public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {
    @Override
    public List<User> findUserByAccountAndId(String id, String account) {
        String hql = "FROM User WHERE account = ?";
        if(StringUtils.isNotBlank(id)){
            hql += " AND id!=?";
        }
        Query query = getSession().createQuery(hql);
        query.setParameter(0,account);
        if(StringUtils.isNotBlank(id)){
            query.setParameter(1, id);
        }


        return query.list();
    }

    @Override
    public void deleteUserRoleByUserId(Serializable id) {
        String hql="from UserRole where id.userId=?";
        Query query = getSession().createQuery(hql);
        query.setParameter(0, id);
        query.executeUpdate();
    }

    @Override
    public void saveUserRole(UserRole userRole) {
        getHibernateTemplate().save(userRole);
    }

    @Override
    public List<UserRole> getUserRolesByUserId(String id) {
        Query query = getSession().createQuery("FROM UserRole WHERE id.userId=?");
        query.setParameter(0, id);
        return query.list();
    }

    @Override
    public List<User> findUserByAccountAndPass(String account, String password) {
        String hql="from User where account=? AND password=?";
        Query query = getSession().createQuery(hql);
        query.setParameter(0, account);
        query.setParameter(1, password);
        return query.list();
    }
}
