package com.company.多态;
/*
代码中多态的特点（多态使用的注意事项）
 */
/*
基础班学生：
    学习，睡觉
高级班学生：
    学习，睡觉
可以将这两类事物进行抽取。
 */
abstract class Student
{
    public abstract void study();
    public void sleep()
    {
        System.out.println("躺着睡");
    }

}
class BaseStudent extends Student
{
    public void study()
    {
        System.out.println("base study");
    }
}
class AdvStudent extends Student
{
    public void study()
    {
        System.out.println("adv study");
    }
    public void sleep()
    {
        System.out.println("坐着睡");
    }
}
class DoStudent
{
    public void doSome(Student stu)
    {
        stu.sleep();
        stu.study();
    }
}
public class 多态示例 {
    public static void main(String args[])
    {
        DoStudent ds = new DoStudent();
        ds.doSome(new BaseStudent());
        ds.doSome(new AdvStudent());
//        BaseStudent bs = new BaseStudent();
//        bs.study();
//        bs.sleep();
//        AdvStudent as = new AdvStudent();
//        as.study();
//        as.sleep();
    }
}
