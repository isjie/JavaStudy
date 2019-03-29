package com.company.数组;

public class 冒泡排序 {
    public static void main(String[] args)
    {
        int[] arry = {5, 1, 6, 4, 2, 8, 9};
        buble(arry);
//        for (int y=arry.length-1;y>1;y--)
//        {
//            for (int x=0;x<y;x++)
//            {
//                if(arry[x]>arry[x+1])
//                {
//                    tmp = arry[x+1];
//                    arry[x+1]=arry[x];
//                    arry[x]=tmp;
//                }
//            }
//        }
        for (int x=0; x < arry.length; x++)
        {
            System.out.print(arry[x]+",");
        }

    }
    public static void buble(int[] arry){
        int tmp;
        for (int y=arry.length-1;y>1;y--)
        {
            for (int x=0;x<y;x++)
            {
                if(arry[x]>arry[x+1])
                {
                    tmp = arry[x+1];
                    arry[x+1]=arry[x];
                    arry[x]=tmp;
                }
            }
        }
    }
    /*
        无论什么排序，都需要对满足条件的元素进行位置置换
        可以把部分相同的代码提取出来，单独封装成一个函数
     */
    public static void swap(int[] arr,int a,int b){
        int tmp =arr[a];
        arr[a]= arr[b];
        arr[b]=tmp;
    }
}