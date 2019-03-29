package com.company.抽象;
/*
当多个类中出现相同功能，但是功能主体不同，这时可以进行向上抽取
只抽取功能定义而不抽取功能主体
抽象的特点：
1、抽象方法必须存放在抽象类中
2、抽象方法和抽象类都必须被abstract关键字修饰
3、抽象类不可以用new创建对象，因为调用抽象方法没意义
4、抽象类中的抽象方法要被使用，必须由子类复写所有的抽象方法后，建立子类对象调用
如果子类只覆盖了部分抽象方法，那么该子类还是一个抽象类

功能不确定的，在子类中实现
抽象类比一般类多了一个抽象函数，就是在类中定义了抽象方法。
抽象类不可以实例化；
抽象方法会被子类重新，没有实现的必要。
含有抽象方法，必须是抽象类
特性：抽象类中可以不定义抽象方法，这样做仅仅是不让该类建立对象
 */
abstract class Student{
    abstract void study();
    abstract void study1();
}
class BaseStudent extends Student{
    void study(){
       System.out.println("study");
    }
    void study1(){}
}
class AdvStudent{
    void study(){
        System.out.println("study");
    }
}
public class AbstractDemo {
    public static void  main(String args[]){
        System.out.println("Hello world");
        new BaseStudent().study();
    }
}
