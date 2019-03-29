package com.company;

public class 商场库存清单 {
    public static void main(String[] args){
        int a=5,b=10,c=18,total;
        double d=6988.88,e=5999.99,f=4999.5,sum;
        total = a+b+c;
        sum = a*d+b*e+c*f;
        System.out.println("---------------------商场库存清单----------------------");
        System.out.println("品牌型号          尺寸          价格       库存数");
        System.out.println("MacBookAir"+"       "+"13.3"+"          "+a+"           "+d);
        System.out.println("ThinkpadT450"+"     "+"14.0"+"          "+b+"          "+e);
        System.out.println("Asus-Fl5800"+"      "+"15.6"+"          "+c+"          "+f);
        System.out.println("总库存数:"+total);
        System.out.println("库存商品总金额:"+sum);





    }
}
