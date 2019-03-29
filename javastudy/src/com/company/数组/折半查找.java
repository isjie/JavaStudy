package com.company.数组;

public class 折半查找 {
//    public static void main(String[] args)
//    {
//        int [] arry={3,1,5,4,2};
//        int index=getIndex(arry,2);
//        System.out.println("Index="+index);
//
//    }
//    public static int getIndex(int[] arry,int key)
//    {
//        for (int x=0;x<arry.length;x++)
//        {
//            if (arry[x]==key)
//                return x;
//        }
//        return -1;
//    }
    public static void main(String[] args)
    {
        int[] arry={2,4,5,7,19,32,45};
        int index=halfSearch(arry,19);
        int index1=halfSearch_1(arry,5);
        System.out.println("Index="+index);
        System.out.println("Index1="+index1);
    }
    public static int halfSearch(int[] arry,int key)
    {
        int min,max,mid;
        min=0;
        max=arry.length-1;
        mid=(max+min)/2;
        while (key!=arry[mid])
        {
            if (key>arry[mid])
                min=mid +1;
            else if(key<arry[mid])
                max=mid-1;
            mid =(max+min)/2;
        }
        return mid;
    }
    public static int halfSearch_1(int[] arry,int key)
    {
        int min,max,mid;
        min=0;
        max=arry.length-1;
        mid=(min+max)/2;
        while(min<=max)
        {
            mid=(min+max)/2;
            if(key>arry[mid])
                min=mid+1;
            else if (key<arry[mid])
                max=mid-1;
            else
                return mid;
        }
        return -1;
    }
    public static int halfSearch_2(int[] arry,int key)
    {
        int min,max,mid;
        min=0;
        max=arry.length-1;
        mid=(min+max)/2;
        while(min<max)
        {
            mid=(min+max)/2;
            if(key>arry[mid])
                min=mid+1;
            else if (key<arry[mid])
                max=mid-1;
            else
                return mid;
        }
        return min;
    }
}
