package com.company;
/*
    函数是定义在类中的具有特定功能的一段独立小程序。
    函数也称为方法
    函数的格式：
    修饰符 返回值类型 函数名（参数类型 形式参数1，参数类型 形式参数2）
    {
        执行语句；
        return 返回值；
     }
     返回值类型：函数运行后的结果的实际类型。
     参数类型:是形式参数的数据类型。
     形式参数是一个变量，用于存储调用函数时传递给函数的实际参数。
     return：用于结束函数。
     返回值：该值返回给调用者
 */
public class 函数 {
    public static void main(String[] args){
        int x= getResult(4);
        System.out.println(x);
    }
    public static int getResult(int num)
    {
        return num*3+5;
    }

    /*
        函数只有被调用时才被执行
        void表示函数没有具体返回值
        函数返回值是void时，函数中的return语句可以不写
        函数中只能调用函数，不能定义函数
     */


    /*
        如何定义一个函数
        1：明确函数的运算结果，明确函数的返回值类型
        2：明确函数是否需要位置的内容参与运算，明确函数的参数列表（参数的类型和个数）
     */

}
