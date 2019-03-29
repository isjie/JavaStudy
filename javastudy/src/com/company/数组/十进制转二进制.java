package com.company.数组;

public class 十进制转二进制 {
    public static void main(String[]args)
    {
        toBin(6);

    }
    public static void toBin(int num)
    {
        StringBuffer sb= new StringBuffer();
        while(num>0)
        {

            sb.append(num%2);
            num=num/2;
        }
        System.out.println(sb.reverse());
    }

}
