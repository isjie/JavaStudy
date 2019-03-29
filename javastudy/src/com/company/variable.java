package com.company;
/*
    定义Java中的变量
    定义出所有数据类型的变量
    四类八种
 */
public class variable {
    //定义整数类型，字节类型，byte类型
    //内存中1个字节，-128~127
    public static void main(String[] args){
        byte b=100;
        System.out.println(b);
        //定义整数类型，短整形，short型
        //内存中占4个字节，-2147483648~2147483647
        short c = 200;
        System.out.println(c);
        //定义整数类型，整形，int型
        //内存中占2个字节
        int d = 500006;
        System.out.println(d);
        //定义整数类型，长整形，long型
        //内存中占8个字节
        long e = 21474836407L;
        System.out.println(e);
        //定义浮点数据，双精度double型,默认是double型
        //内存中8个字节
        double f = 2.2;
        System.out.println(f);
        //定义浮点数据，单精度float型
        //内存中4个字节
        float g = 1.0F;
        System.out.println(g);
        //定义字符类型，char
        //内存中占2个字节，必须单引号包裹，只能写一个字符
        char h = '我';
                System.out.println(h);
        //定义布尔类型，boolean
        //内存中占1个字节，数据值，true，false
        boolean bool = true;
        System.out.println(bool);


    }
}
