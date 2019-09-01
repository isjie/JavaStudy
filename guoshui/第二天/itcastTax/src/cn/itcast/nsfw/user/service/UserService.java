package cn.itcast.nsfw.user.service;


import java.io.File;
import java.io.Serializable;
import java.util.List;
import cn.itcast.nsfw.user.entity.User;
import cn.itcast.nsfw.user.entity.UserRole;

import javax.servlet.ServletOutputStream;

public interface UserService {
    //新增
    public void save(User user);
    //更新
    public void update(User user);
    //根据id删除
    public void delete(Serializable id);
    //根据id查找
    public User findObjectById(Serializable id);
    //查找列表
    public List<User> findObjects();

    public void exportExcel(List<User> userList, ServletOutputStream outputStream);

    public void importExcel(File userExcel, String userExcelFileName);

    List<User> findUserByAccountAndId(String id, String account);

    public void updateUserAndRole(User user, String[] userRoleIds);

    public void saveUserAndRole(User user, String[] userRoleIds);

    List<UserRole> getUserRolesByUserId(String id);

    List<User> findUserByAccountAndPass(String account, String password);
}
