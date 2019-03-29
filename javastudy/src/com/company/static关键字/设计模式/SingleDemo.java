package com.company.static关键字.设计模式;
/*
设计模式：解决一类问题最有效的方法
java中有23种设计模式
单例设计模式：一个类在内存中只有一个对象
保证对象唯一：
1、为了避免其他程序过多建立该类对象，先禁止其他程序建立该对象
2、为了让其他程序可以访问该类对象，只好在本类中自定义一个对象
3、为了方便其他程序对自定义对象的访问，可以对外提供一些访问方式
代码体现：
1、
 */
//class Single
//{
//    private int num;
//    public void setNum(int num)
//    {
//        this.num=num;
//    }
//    public int getNum()
//    {
//        return num;
//    }
//    private Single(){}
//    private static Single  s=new Single();
//    public static Single getInstance(){
//        return s;
//    }
//}
//public class SingleDemo {
//    public static void main(String args[]){
//       Single s1=Single.getInstance();
//       Single s2=Single.getInstance();
////       s1.setNum(23);
//    }
//}
