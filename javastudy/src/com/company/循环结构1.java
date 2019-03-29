package com.company;
/*
    while:先判断条件，只有条件满足才执行循环体
    do while：先执行循环体，再判断条件，条件满足，再继续执行循环体，无论条件是否满足，循环体至少执行一次。
    for:变量有自己的作用域，如果从控制循环的增量定义在for语句中，变量只在for语句内有效
        2for和while可以互换，如果需要定义循环变量，用for更为合适

    无线循环模式：for(;;){},while(true)
 */
public class 循环结构1 {
    public static void main(String[] args){
             /*
            定义初始化表达式；
            while（条件表达式）
            {
                循环体（执行语句）；
            }
            */
        int x = 1;
        while (x < 3)
        {
            System.out.println("x="+x);
            ++x;
        }


        /*
            do while
         */
        int y = 3;
        do {
            System.out.println("do :x="+x);
        }
        while (x<3);

        /*
            for(初始化表达式；循环条件表达式；循环后的操作表达式)
            {
                执行语句
            }
         */
        for(int z = 0; z < 3;z++)
        {
            System.out.println("z="+z);
        }
        //for的执行顺序
        int m = 1;
        for( System.out.println("a"); m < 3; System.out.println("b"))
        {
            System.out.println("c");
            m++;
        }


        /*
            1:获取1~10的和，并打印。
            2:1~100之间7的倍数的个数，并打印
         */
        int sum=0;
        for(int i=1;i<11;i++)
            sum = sum+i;
        System.out.println(sum);
        int n=0;
        for(int f =1;f<=100;f++)
            if(f%7==0)
            {
                System.out.println(f);
                n++;
            }
        System.out.println(n);

        /*
        *****
        ****
        ***
        **
        *
        **
        ***
        ****
        *****
         */

        for(int g=1;g<=5;g++)
        {
            for (int p=g;p<=5;p++)
            {
                System.out.print("*");
            }
            System.out.println();
        }
        for(int g=5;g>0;g--)
        {
            for (int p=g;p<=5;p++)
            {
                System.out.print("*");
            }
            System.out.println();
        }
        for(int g=0;g<5;g++)
        {
            for (int p=0;p<=g;p++)
            {
                System.out.print("*");
            }
            System.out.println();
        }

        /*
            1*1=1
            1*2=2 2*2=4
            1*3=3 2*3=6 3*3=9
         */
        int mul=1;
        for(int s=1;s<=9;s++)
        {
            for (int t=1;t<=s;t++)
            {
                mul=s*t;
                System.out.print(t+"*"+s+"="+mul+"\t");
            }
            System.out.println();
        }





    }
}
