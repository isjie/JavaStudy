package com.company.static关键字;
/*
静态代码块：
格式
static
{
静态代码块中的执行语句
}
特点：随着类的加载而执行，只执行一次。用于给类进行初始化，优先于主函数执行。
 */
class   StaticCode{
    static {
        System.out.println("a");
    }
    public static void show(){
        System.out.println("show run");
    }
}
class StaticCodeDemo {
    static {
        System.out.println("b");
    }
    public static void main (String args[]){
        new StaticCode();
//        new StaticCode(); 不执行了，类已经存在了，只执行一次。
        System.out.println("over");
//        StaticCode.show();没有对象也能加载类
    }
    static {
        System.out.println("c");
    }
}


