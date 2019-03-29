package com.company.static关键字.设计模式;

class Single{
    private static Single s=new Single();
    private Single(){}
    public static Single getInstance(){
        return s;
    }
}
public class SingleDemo2 {
}
