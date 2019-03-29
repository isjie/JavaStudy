package com.company.this关键字;
/*
this 代表本类的对象，this代表使用该方法的所属对象的引用
哪个对象在调用this所在方法，this就代表哪个对象
this的应用：当定义类中的功能时，该函数内部要用到调用该函数的对象时，用this表示这个对象。
 */
class Person3{
    private String name;
    private int age;


    Person3(String name){
        this.name =name;
        System.out.println("B;name="+name+",,age="+age);
        cry();
    }
    Person3(String n,int a){
        name =n;
        age=a;
        System.out.println("C;name="+name+",,age="+age);
        cry();
    }
    public void cry(){
        System.out.println("cry");
    }

}
public class this关键字 {
    public static void  main(String agrs[]){
        Person3 p2=new Person3("lisi");
        Person3 p3=new Person3("lisi",20);
    }
}
