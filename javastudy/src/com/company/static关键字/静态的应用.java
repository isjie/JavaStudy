package com.company.static关键字;
/*
静态的应用：每一个应用程序中都有共性的功能，可以将这些功能进行抽取，独立封装，以便复用。
虽然可以使用ArrayTool的对象使用这些工具方法，对数组进行操作，但是
1、对象是用于封装数据的，可是ArrayTool对象并未封装特有数据
2、操作数组的每一个方法都没有用到ArrayTool对象中特有的数据
这时考虑，让程序更严谨，是不需要对象的，可以将ArrayTool中的方法都定义成static，直接通过类名调用即可。
将方法静态后，可以方便使用，但是该类还是可以被其它程序建立对象、为了更为严谨，强制让该类不能创建对象，可以通过将构造函数私有化完成

 */

//public class 静态的应用 {
//    public static void  main(String args[]){
//        int arr[]={3,4,1,8};
//
//        System.out.println("max="+arr[max]);
//    }
//    public static int getMax(int arr[]){
//        int max=0;
//        for(int x=1;x<arr.length;x++)
//        {
//            if(arr[x]>arr[max])
//                max=x;
//        }
//        return arr[max];
//    }
//}
class ArryTool
{
    private ArryTool(){};
    public  static int getMax(int arr[]) {
        int max = 0;
        for (int x = 1; x < arr.length; x++) {
            if (arr[x] > arr[max])
                max = x;
        }
        return arr[max];
    }
    public static int getMin(int arr[]) {
        int min = 0;
        for (int x = 1; x < arr.length; x++) {
            if (arr[x] < arr[min])
                min = x;
        }
        return arr[min];
    }
    public static void selectSort(int arr[]){
        for(int x=0;x<arr.length-1;x++){
            for(int y=x+1;y<arr.length;y++){
                if(arr[x]>arr[y]){
                    swap(arr,x,y);

                }
            }
        }

    }
    public static void bubbleSort(int arr[]){
        for(int x=0;x<arr.length-1;x++){
            for(int y=0;y<arr.length-x-1;y++){
                if(arr[y]>arr[y+1]){
                    swap(arr,x,y);
                }
            }
        }
    }
    public static void swap(int arr[],int a,int b){
        int temp=arr[a];
        arr[a]=arr[b];
        arr[b]=temp;
    }
    public static void printArray(int arr[]){
        System.out.print("[");
        for(int i=0;i<arr.length;i++){
            if(i!=arr.length-1)
                System.out.print(arr[i]+",");
            else
                System.out.print("]");
        }

    }
}
public class 静态的应用{
    public static void main(String args[]){
        int arr[]={3,1,67,32,8};
        /*
        ArryTool tool=new ArryTool();
        int max = tool.getMax(arr);
        System.out.println("max="+max);
        int min = tool.getMin(arr);
        System.out.println("min="+min);
        tool.printArray(arr);
        tool.selectSort(arr);
        tool.printArray(arr);
        */
        int max = ArryTool.getMax(arr);
        System.out.println("max="+max);

    }
}