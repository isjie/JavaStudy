package com.company.接口;
/*

接口可以被类多实现，也是不支持多继承的转换形式
 */


interface Inter1
{
    public static final int NUM=3;
    public abstract void show();
}
interface InterA
{
    public abstract void method();
}
class Demo6
{
    public void function(){}
}
class Test1 extends Demo6 implements  Inter1,InterA
{
    public void show(){
        System.out.println("接口子类创建对象");
    }
    public void method(){};
}
interface A
{
    void methodA();
}
interface B extends A
{
    void methodB();
}
interface C extends B
{
    void methodC();
}
class D implements C
{
    public void methodA(){}
    public void methodB(){}
    public void methodC(){}

}
public class InterfaceDemo1 {
    public static void main(String args[]){
        System.out.println("HelloWorld");
        Test1 t=new Test1();
        System.out.println(t.NUM);
        System.out.println(Test.NUM);
        System.out.println(Inter.NUM);

    }
}
