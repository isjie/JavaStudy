package com.company;

public class 选择结构2 {
    /*
        1:被选中表达式的值只能为四种byte int short char
        2:最后执行default
        3：default，没有break的时候
        4:如果判断的具体数值不多，而且符合byte,short,int.char.使用switch。判断区间不太好，if可以判断区间，不能判断boolean型
     */
    public static void main(String[] args){
        int x = 2;
        switch (x)
        {
            case 4:
                System.out.println("a");
                break;
            case 2:
                System.out.println("b");
                break;
            case 6:
                System.out.println("c");
                break;
           default:
                System.out.println("d");
                break;
        }

        int y=4;
        switch (y)
        {
            case 3:
            case 4:
            case 5:
                System.out.println("春季");
                break;
            case 6:
            case 7:
            case 8:
                System.out.println("夏季");
                break;
            case 9:
            case 10:
            case 11:
                System.out.println("秋季");
                break;
            case 1:
            case 2:
            case 12:
                System.out.println("冬季");
                break;
        }
    }
}
