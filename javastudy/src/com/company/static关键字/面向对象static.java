package com.company.static关键字;
/*
    静态：static
    用法：是一个修饰符，用于修饰成员（成员变量和成员函数）
    当成员被静态修饰后，就多了一种调用方式，除了可以被对象调用外，还可以直接被类名调用。用法：对象.成员。（Person7.country）
    static特点：
    1、随着类的加载而加载，随着类的消失而消失。
    2、优先于对象存在：存在的时候对象还不存在
    3、被所有对象所共享
    4、可以直接被类名调用
    实例变量和类变量的区别：
    类变量随着类的加载而存在于方法区中，随着类的消失而消失
    实例变量的生命周期随着对象的消失而消失。
    静态注意事项：
    1、静态方法只能访问静态成员、
    非静态方法既可以访问静态方法也可以访问非静态。
    静态有利有弊；
    利：节省空间，没有必要每个对象中都有，可以直接被类名调用。
    弊：生命周期过长，访问出现局限性，
 */

class Person7
{
    String  name;//成员变量，实例变量
    static String  country="CN";//静态的成员变量，类变量。
    public void show()
    {
        System.out.println(name+"::"+country);
    }

}
public class 面向对象static {
    public static void main(String args[]){
        Person7 p = new Person7();
        p.name="zhangsan";
        p.show();
//        System.out.println(Person7.country);
    }

}
