package com.company.对象;
/*
    对象一建立就会调用与之对应的构造函数
    构造函数的作用，可以用于给对象进行初始化。
    构造函数细节，当一个类中没有定义构造函数时，系统默认给该类加入一个空参数的构造函数
    当在类中自定义构造函数后，默认的构造函数没有了
    构造函数和一般函数写法上不同。
    运行上也不同：构造函数是在对象一建立就运行，给对象初始化。一般方法是对象调用才执行，给对象添加具备的功能，一个对象建立构造函数只运行一次
    一般方法可以被该对象调用多次
    什么时候定义构造函数，分析事物时存在就具备一些特性或者行为，那么将这些内容定义在构造函数中。
 */
class Person2{
    private String name;
    private int age;
    /*
    构造代码块
    作用：给对象初始化
    对象一建立就运行，而且优先于构造函数执行；
    和构造函数的区别：构造代码块是给所有的对象进行统一初始化，而构造函数是给对应的对象初始化
    代码快中定义的是不同对象共性的初始化内容
     */
    {
        System.out.println("Person code run");
    }
    Person2(){
        System.out.println("A;name="+name+",,age="+age);
        cry();
    }
    Person2(String n){
        name =n;
        System.out.println("B;name="+name+",,age="+age);
        cry();
    }
    Person2(String n,int a){
        name =n;
        age=a;
        System.out.println("C;name="+name+",,age="+age);
        cry();
    }
    public void cry(){
        System.out.println("cry");
    }
}
public class 构造代码块 {
    public static void  main(String agrs[]){
        Person2 p1=new Person2();
        Person2 p2=new Person2("lisi");
        Person2 p3=new Person2("lisi",20);
    }
}
