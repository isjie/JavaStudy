package com.company.数组;

public class 对给定数组进行选择排序
{
    public static void main(String[] args)
    {
        int[] arry = {5, 1, 6, 4, 2, 8, 9};
        int tmp = 0;
        for (int x = 0; x < arry.length - 1; x++)
        {
            for (int y = x + 1; y < arry.length; y++)
            {
                if (arry[y] < arry[x])
                {
                    tmp = arry[x];
                    arry[x] = arry[y];
                    arry[y] = tmp;
                }
                System.out.println(arry[x]);
                System.out.println(arry[y]);
            }

        }
        for (int x=0; x < arry.length; x++)
        {
            System.out.print(arry[x]+",");
        }
    }
}
