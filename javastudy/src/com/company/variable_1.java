package com.company;
/*
常量：字符串，双引号，包裹“0-n”
 */
public class variable_1 {
    public static void main(String[] args){
        //定义变量，字符串类型，数据类型string 表示字符串的数据类型。
        //数据java中的引用类型，定义方式和基本类型一样
        String s = "我爱java";
        System.out.println(s);


        /*
        变量定义和使用注意事项
        1：变量定义后，不赋值不能使用
        2:变量有自己的作用范围，变量的有效范围，定义的一堆大括号内
        3:变量不可以重新定义
         */
        int i=5;
        System.out.println(i);
        {
            int j = 10;
            System.out.println(j);
        }



    }
}


