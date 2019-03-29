package com.company;

/*
public boolean equals(Object obj)方法   提供定义对象是否相等的逻辑
Object的equals方法定义为：x.equals(y)当x和y是同一个对象的应用时返回true否则返回false
 */
public class equals方法 {
    public static void main(String args[]){
        Cat c1=new Cat();
        Cat c2=new Cat();
        System.out.println(c1==c2);
    }
}
class Cat{
    int color;
    int height,weight;
}