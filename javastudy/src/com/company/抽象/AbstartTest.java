package com.company.抽象;
/*
在开发一个系统时需要对员工进行建模，员工包含三个属性，姓名，工号，工资。
经理也是员工，除了含有员工的属性外，还有奖金的属性，请使用继承的思想设计出员工类和经理类。
要求类中提供必要的方法进行属性访问

员工类：name id pay
经理类：继承了员工，并有自己特有的bonus
 */
abstract class Employee{
    private String name;
    private String id;
    private double pay;
    Employee(String name,String id,double pay){
        this.name=name;
        this.id=id;
        this.pay=pay;
    }
    public abstract void work();
}
class Manager extends Employee{
    private int bonus;
    Manager(String name,String id,double pay,int bonus){
        super(name,id,pay);
        this.bonus=bonus;
    }
    public void work(){
        System.out.println("manager work");
    }
}
class pro extends Employee{
    pro(String name,String id,double pay){
        super(name,id,pay);
    }
    public void work(){
        System.out.println("pro work");
    }
}
public class AbstartTest {
    public static void main(String args[]){
        System.out.println("Hello world");

        new Manager("li","li",4.0,4).work();
    }
}
