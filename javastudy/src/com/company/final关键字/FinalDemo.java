package com.company.final关键字;
/*
final最终，作为一个修饰符
1、可以修饰类，函数、变量
2、被final修饰的类不可以被继承
3、被final修饰的类不可以被重写
4、被final修饰的变量是一个常量，只赋值一次，既可以修饰成员变量，又可以修饰局部变量
当在描述事物时，一些数据的出现值是固定的，那么这是为了增强阅读性，都给这些值起个名字，方便阅读
而这个值不需要改变，可以用final修饰作为常量
 */
/*
不能被复写
class Demo5{
    final void show1(){

    }
    void show2(){

    }
}
*/
class Demo5{
    final int x=3;
    void show1(){

    }
    void show2(){
        final int y=4;

    }
}
class SubDemo extends Demo5{
    void show1(){}
}
public class FinalDemo {
    public static void main(String args[]){
        System.out.println();
    }
}
