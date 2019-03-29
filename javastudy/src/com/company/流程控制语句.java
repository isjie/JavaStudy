package com.company;
/*
    break语句：应用范围，循环结构和选择结构
    continue:循环结构，结束本次循环继续下次循环
 */
public class 流程控制语句 {
    public static void main(String[] args){
        for (int x=0;x<3;x++)
        {
            for(int y=0;y<4;y++)
                System.out.println("x="+y);
            // break;  //结束内循环
        }

//        continue:只能用于循环结构，继续下一次循环循环
        for (int c=1;c<=10;c++)
        {
            if (c%2==1)
                continue;
            System.out.println("x="+c);
        }

        for(int s=1;s<6;s++)
        {
            for(int r=s;r<=4;r++)
            {
                System.out.print("-");
            }
            for (int w=1;w<=s;w++)
            {
                System.out.print("*");
                System.out.print(" ");
            }
            System.out.println("");
        }
        }
}
