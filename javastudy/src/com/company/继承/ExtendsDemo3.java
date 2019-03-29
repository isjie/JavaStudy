package com.company.继承;
/*
字符类函数的特点-覆盖：
当子类出现和父类一模一样的函数时，当子类对象调用该函数，会运行子类函数的内容
如同父类的函数被覆盖一样，这样的情况是函数的另外一个特性，重写（覆盖）

当子类继承父类，沿袭了父类的功能到子类中
但是子类虽具备该功能，但是功能的内容却和父类不一致，这时，没有必要定义新功能，而是使用覆盖特性，
保留父类的功能定义，并重写功能内容
覆盖（重写）
1、子类覆盖父类，必须保证子类的权限大于父类权限，才可以覆盖，否则编译失败
2、静态只能覆盖静态

重载：只看同名函数的参数列表
重写：子父类方法一么一样

 */
class Fuu{
    void show1(){
        System.out.println("fu show");
    }
}
class Zii extends Fuu{
    void show2(){
        System.out.println("zi show");
    }
}
public class ExtendsDemo3 {
    public static void main(String args[]){
        Zii z = new Zii();
        z.show1();
        z.show2();

    }
}
