package com.company.对象;
/*
    类就是对现实生活中事物的描述。
    对象：就是这类事物，实实在在存在的个体
    定义类就是描述事物，就是定义属性和行为，属性和行为共同成为类中的成员（局部变量和成员变量）
 */
public class 类与对象 {
    public static void main(String[]args)
    {

    }
}
/*
    成员变量和局部变量
    成员变量作用于整个类中
    局部变量作用于函数中
    在内存中的位置
    成员变量：在堆内存中，因为对象的存在才在内存中存在
    局部变量：存在于栈内存中
 */
class   Car
{
    //描述颜色
    String color = "红色";
    //描述轮胎数
    int num = 4;
    //运行行为
    void run(){
        System.out.println(color+".."+num);
    }
}
class CarDemo
{
    public static void main(String[] args)
    {
        //生产汽车，在java中通过new操作符来完成
        //其实就是在堆内存产生一个实体；
        Car c=new Car();   //c是一个类类型变量，类类型变量指向对象
        //需求：将已有车的颜色改成蓝色。指挥该对象做事情，在java指挥方式是：对象.对象成员
        c.color="blue";
        c.run();


        //匿名对象使用方式：
        //1：当对象的方法只调用一次时，可以用匿名对象来完成，这样写比较简化。
        //2：如果对一个对象进行多个成员调用，必须给这对象起个名字。

//        show (new Car());  //匿名对象使用方法2：可以将匿名对象作为实际参数进行传递
//        Car q=new Car();
////        show(q);
//        public static void show(Car c)
//        {
//            c.num=3;
//            c.color="black";
//            c.run();
//        }
//



    }
}
