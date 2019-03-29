package com.company;
/*
    j=i++ ++后算，先赋值，后做+运算
    n = ++m  先做+运算，再赋值
 */
public class 运算符 {
    public static void main(String[] args){
        int i =5;
        int j=i++;
        System.out.println(i);
        System.out.println(j);
        int m=5;
        int n=++m;
        System.out.println(m);
        System.out.println(n);
        /*
            赋值运算符
                = ,+=,-=,*=,/=,%=
         */
        /*
            逻辑运算符
         */
        /*
            三元运算符
            公式：
            布尔表达式？ 结果1：结果2；
            布尔表达式结果true,三元运算符的结果就是1
            布尔表达式结果false,三元运算符的结果就是2
         */
        System.out.println(3>5?99:89);

    }

}
