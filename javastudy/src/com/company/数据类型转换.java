package com.company;
/*
     //范围小的转为范围大的（如byte转成int）
        //byte short int long float double
        //boolean不参与类型转换
 */
public class 数据类型转换 {
   public static void main(String[] args){
       //定义double类型的变量
       double d = 1000;  //出现自动转换类型,int自动转换成double
       System.out.println(d);
       int i = 100;
       double d2 = i;
       System.out.println(d2);


       /*
       数据强制类型转换
       强制：数字类型大的转成数字类型小的
        */
       //double浮点，转换成整数int,被转后的数据类型  变量名 = （被转后的数据类型）要被转的数据
       double h = 3.14;
       int f = (int)h;
       System.out.println(f);
   }
}
