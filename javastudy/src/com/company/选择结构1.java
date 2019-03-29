package com.company;

public class 选择结构1 {
    public static void main(String[] args){
        //需求1：根据用户定义的数值不同，打印对应的星期英文
        int num = 2;
        if(num==1)
            System.out.println("Monday");
        if(num==2)
            System.out.println("Tuesday");
        if(num==3)
            System.out.println("Wednesday");
        if(num==4)
            System.out.println("Thursday");
        if(num==5)
            System.out.println("Friday");
        if(num==6)
            System.out.println("Saturday");
        if(num==7)
            System.out.println("Sunday");
        /*
            需求2：根据指定月份，打印该月份所属的季节。
            345春季，678夏季，91011秋季，12,1,2冬季
         */

        int x = 9;
        if(x==3||x==4||x==5)
            System.out.println("春季");
        else if(x==6||x==7||x==8)
            System.out.println("夏季");
        else if(x==9||x==10||x==11)
            System.out.println("秋季");
        else if(x==12||x==1||x==2)
            System.out.println("冬季");
        else
            System.out.println("月份不存在");

        if(x>12||x<1)
            System.out.println("月份不存在");
        else if(x>2||x<6)
            System.out.println("春季");
        else if(x>5||x<9)
            System.out.println("夏季");
        else if(x>8||x<12)
            System.out.println("秋季");
        else
            System.out.println("冬季");






    }
}
