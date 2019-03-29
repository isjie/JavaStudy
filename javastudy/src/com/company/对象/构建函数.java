package com.company.对象;
/*
    1、函数名和类名相同
    2、不用定义返回值类型
    3、不可以写return语句
    对象一建立就会调用与之对应的构造函数
    构造函数的作用，可以用于给对象进行初始化。
    构造函数细节，当一个类中没有定义构造函数时，系统默认给该类加入一个空参数的构造函数
    当在类中自定义构造函数后，默认的构造函数没有了
    构造函数和一般函数写法上不同。
    运行上也不同：构造函数是在对象一建立就运行，给对象初始化。一般方法是对象调用才执行，给对象添加具备的功能，一个对象建立构造函数只运行一次
    一般方法可以被该对象调用多次
    什么时候定义构造函数，分析事物时存在就具备一些特性或者行为，那么将这些内容定义在构造函数中。
 */
class Person1{
    private String name;
    private int age;
    Person1(){
        System.out.println("A;name="+name+",,age="+age);
        cry();
    }
    Person1(String n){
       name =n;
        System.out.println("B;name="+name+",,age="+age);
        cry();
    }
    Person1(String n,int a){
        name =n;
        age=a;
        System.out.println("C;name="+name+",,age="+age);
        cry();
    }
    public void cry(){
        System.out.println("cry");
    }
}
public class 构建函数 {
    public static void  main(String agrs[]){
        Person1 p1=new Person1();
        Person1 p2=new Person1("lisi");
        Person1 p3=new Person1("lisi",20);
    }
}
