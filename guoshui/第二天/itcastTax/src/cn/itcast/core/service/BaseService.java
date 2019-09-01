package cn.itcast.core.service;

import cn.itcast.core.page.PageResult;
import cn.itcast.core.util.QueryHelper;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T> {
    //新增
    public void save(T entity);
    //更新
    public void update(T entity);
    //根据id删除
    public void delete(Serializable id);
    //根据id查找
    public T findObjectById(Serializable id);
    //查找列表
    public List<T> findObjects();
    //查询
    public List<T> findObjects(QueryHelper queryHelper);
    //分页对象查询
    PageResult getPageResult(QueryHelper queryHelper, int pageNo, int pageSize);
}
