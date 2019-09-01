package cn.itcast.nsfw.role.dao.impl;

import cn.itcast.core.dao.impl.BaseDaoImpl;
import cn.itcast.nsfw.role.dao.RoleDao;
import cn.itcast.nsfw.role.entity.Role;
import org.hibernate.Query;

public class RoleDaoImpl extends BaseDaoImpl<Role> implements RoleDao {

    @Override
    public void deleteRolePrivilegeByRoleId(String roleId) {
        Query query = getSession().createQuery("DELETE FROM RolePrivilege WHERE id.role.roleId=?");
        query.setParameter(0, roleId);
        query.executeUpdate();
    }
}
