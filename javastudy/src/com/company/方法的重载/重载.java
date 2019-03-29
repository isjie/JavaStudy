package com.company.方法的重载;
/*
 当定义的功能相同，但参与运算的位置内容不同,这时定义一个函数来表示其功能，
 方便阅读，通过参数列表的不同来区分多个同名函数

方法的重载是指一个类中可以定义有相同的名字，但参数不同的多个方法。调用时，会根据
不同的参数表选择对应的方法。
 */

public class 重载 {
   void max(int a,int b){
       System.out.println(a>b?a:b);
   }
    void max(float a,float b){
        System.out.println(a>b?a:b);
    }
    public static void main(String args[]){
        重载 t=new 重载();
        t.max(3,4);
    }
}
