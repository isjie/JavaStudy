package com.company.数组;
/*
    ArrayIndexOutOfBoundsException  操作数组时，访问到了数组中不存在的角标。
    NullPointerException  空指针一样：当引用没有任何指向值，为null的情况
 */
public class 数组 {
    public static void main(String[] args) {
        //定义一个存储三个整数的容器
        int[] arr = new int[3];
        System.out.println(arr[1]);

        //数组的操作
        //获取数组中的元素，通常会用到遍历
        //计算数组长度 .length
        int[] arr1 = {1, 2, 3, 4, 5, 6};
        System.out.println(arr1.length);
        for (int x = 0; x < arr1.length; x++) {

            System.out.println("arr1[" + x + "]=" + arr1[x]);
            printarr1();
        }
    }

    public static void printarr1()
    {
        int[] arr1={1,2,3,4,5,6};
        System.out.println(arr1.length);
        for (int x=0;x<arr1.length;x++)
        {
            if(x!=arr1.length-1)
                System.out.print(arr1[x]+",");
            else
                System.out.print(arr1[x]);

        }
    }






}
