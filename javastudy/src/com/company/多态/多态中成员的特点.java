package com.company.多态;

class Fu
{
    void method1()
    {
        System.out.println("Fu method1");
    }
    void method2()
    {
        System.out.println("Fu method2");
    }
}
class Zi extends Fu
{
    void method1()
    {
        System.out.println("Fu method1");
    }
    void method3()
    {
        System.out.println("Fu method3");
    }
}
public class 多态中成员的特点
{
    public static void main(String args[])
    {
        /*
        在多态中成员函数的特点
        在编译时期：参阅引用型变量所属的类中是否有调用的方法，如果有，编译通过，如果没有编译失败
        在运行时期：参阅对象所属的类中是否有调用方法
        总结：成员函数在多态调用时，编译看左边，运行看右边
         */
        Fu f = new Zi();
        f.method1();
        f.method2();
//        f.method3();


//        Zi z=new Zi();
//        z.method1();
//        z.method2();
//        z.method3();
    }
}
