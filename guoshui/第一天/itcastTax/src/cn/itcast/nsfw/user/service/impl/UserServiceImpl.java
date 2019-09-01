package cn.itcast.nsfw.user.service.impl;

import cn.itcast.nsfw.user.entity.User;
import cn.itcast.nsfw.user.dao.UserDao;
import cn.itcast.nsfw.user.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;
@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private  UserDao userDao;
    @Override
    public void save(User user) {
        userDao.save(user);
    }

    @Override
    public void update(User user) {
        userDao.update(user);
    }

    @Override
    public void delete(Serializable id) {
        userDao.delete(id);
    }

    @Override
    public User findObjectById(Serializable id) {
        return userDao.findObjectById(id);
    }

    @Override
    public List<User> findObjects() {
        return userDao.findObjects();
    }
}
