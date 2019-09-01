package cn.itcast.nsfw.user.dao;


import cn.itcast.core.dao.BaseDao;
import cn.itcast.nsfw.user.entity.User;
import cn.itcast.nsfw.user.entity.UserRole;

import java.io.Serializable;
import java.util.List;

public interface UserDao extends BaseDao<User> {
    List<User> findUserByAccountAndId(String id, String account);

    public void deleteUserRoleByUserId(Serializable id);

    public void saveUserRole(UserRole userRole);

    List<UserRole> getUserRolesByUserId(String id);

    List<User> findUserByAccountAndPass(String account, String password);
}
