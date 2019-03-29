package com.company.对象的创建和使用;

public class Circle {
}
class Point{
    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    private double x;

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    private double y;
    Point(double x1,double y1){
        x=x1;
        y=y1;
    }
}
