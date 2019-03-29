package com.company.继承;
/*
3、子父类中的构造函数
在对子类对象进行初始化时，父类的构造函数也会运行，
那是因为子类的构造函数默认第一行有一条隐式的语句super()；
super():会访问父类中空参数的构造函数，而且子类中所有的构造函数默认第一行都是super（）；
为什么子类要访问父类中的构造函数
因为父类中的数据子类可以直接获取，所以子类对象在建立时，需要先查看父类是如何对这些数据进行初始化的，
所有子类对象初始化时，要先访问一下父类中的构造函数。
如果要访问父类中指定的构造函数，可以通过手动定义super语句来指定
注意：super语句一定定义在子类构造函数的第一行
如果子类的构造方法中没有显示地调用基类构造方法，则默认系统调用基类的无参数的构造方法
如果子类构造方法中没有显示地调用基类构造方法，而基类又没有无参数的构造方法，则编译出错
 */
class Fuuu{
    Fuuu(){
        System.out.println("Fu run");
    }
}
class Ziii extends Fuuu{
    Ziii(){
        System.out.println("Zi run");
    }
    Ziii(int x){
        System.out.println("zi..."+x);
    }
}
public class ExtendsDemo4 {
    public static void main(String args[]){
        Ziii z=new Ziii();
        Ziii z1=new Ziii(4);


    }
}
