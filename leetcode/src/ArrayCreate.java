import java.util.Scanner;

public class ArrayCreate {
    public static void main(String[] args){


        // 输入数字
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入数组的数字个数：");
        int num = scanner.nextInt();
        int a[] = new int[num];


        // 打印数组
        System.out.println("开始打印数组：");
        System.out.println("*********************");

        // 用for循环为数组赋值随机数
        for (int i = 0;i<num;i++){
            a[i] = (int)(Math.random()*100);
            System.out.println(a[i]);

        }
        System.out.println("");

        // 用for循环遍历数组，然后取出最大值与最小值
        int x,max,min;
        max = min = a[0];

        for (x = 0;x<a.length;x++){
            if (a[x]>=max)
                max = a[x];
            if (a[x]<=min)
                min = a[x];
        }

        System.out.println("*********************");
        System.out.println("");
        System.out.println("这个数组中最大的数是"+max);
        System.out.println("这个数组中最小的数是"+min);

    }

}
