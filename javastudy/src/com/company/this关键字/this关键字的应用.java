package com.company.this关键字;
/*
this 代表本类的对象，this代表使用该方法的所属对象的引用
哪个对象在调用this所在方法，this就代表哪个对象
this的应用：当定义类中的功能时，该函数内部要用到调用该函数的对象时，用this表示这个对象。
 */

class Person4{
    private int age;
    private  String name;
    Person4(int age){
        this.age=age;
    }
    Person4(String name){
        this.name=name;
    }
    Person4(String name,int age){
        this.name=name;
        this.age=age;
    }
    public boolean compare(Person4 p){
        return this.age==p.age;
    }
}

public class this关键字的应用 {
    public static void  main(String agrs[]){
        Person4 p1=new Person4(20);
        Person4 p2=new Person4(25);
        boolean b=p1.compare(p2);
        System.out.println(b);
    }
}
