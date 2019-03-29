package com.company.数组;

public class 数组中取最大值和最小值 {
    public static void main(String[] args)
    {
        int[] arry = {5,1,6,4,2,8,9};
        for (int x=0;x<arry.length;x++)
        {
            if(arry[x]>arry[0])
                arry[0]=arry[x];
        }
        System.out.println(arry[0]);


        int arry1[] = {1,-1,-8,-9,-5,12,1,4,5,8};
        for(int y=0;y<arry.length;y++)
        {
            if(arry1[y]<arry1[0])
                arry1[0]=arry1[y];
        }
        System.out.println(arry1[0]);
    }
}
