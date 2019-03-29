package com.company.接口;
/*
接口：初期理解可以理解成一个特殊的抽象类，这种抽象类只包含常量和方法的定义，而没有常量和方法的实现
当抽象类中的方法都是抽象的，该类可以通过接口的方式来表示
接口定义时，格式特点：
1、接口中常见定义：常量，抽象方法。
2、接口汇总的成员都有固定修饰符（默认的）
常量：public static final
方法：public abstract
记住：接口中的成员都是public+

接口不可以创建对象，因为有抽象方法
需要被子类实现，子类对接口中的抽象方法全部都覆盖后，子类才可以实例化

接口可以被类多重实现，也是不支持多继承的转换形式
 */


interface Inter
{
    public static final int NUM=3;
    public abstract void show();
}
class Test implements Inter
{
    public void show(){
        System.out.println("接口子类创建对象");
    }
}
public class InterfaceDemo {
    public static void main(String args[]){
        System.out.println("HelloWorld");
        Test t=new Test();
        System.out.println(t.NUM);
        System.out.println(Test.NUM);
        System.out.println(Inter.NUM);

    }
}
