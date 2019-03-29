package com.company.多态;
/*
object:是所有对象的直接或者间接父类
该类中定义的肯定是所有对象都具备的功能
 */
class Demo //extends Object
{
    private int num;
    Demo(int num)
    {
        this.num=num;
    }
//    public boolean compare(Demo d)
//    {
//        return this.num ==d.num;
//    }
    public boolean equals(Object obj)
    {
        Demo d=(Demo)obj;
        return this.num ==d.num;
    }

}
class Person
{

}

public class object类equal
{
    public static void  main(String args[])
    {
//        Demo d1= new Demo();
//        Demo d2= new Demo();
//        Demo d3= d1;
//        System.out.println(d1.equals(d3));
//        System.out.println(d1.equals(d1=d2));
//        System.out.println(d1.equals(d1=d3));
        Demo d1 =new Demo(4);
        Demo d2 =new Demo(4);
        System.out.println(d1.equals(d2));

    }
}
