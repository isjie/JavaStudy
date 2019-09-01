import java.util.Scanner;

public class lianxi {
    public static void main(String[] args) {
        //定义初始最大最小数组

        System.out.println("输入数组大小：");
        Scanner scanner = new Scanner(System.in);
        int nums = scanner.nextInt();
        int[] arr = new int[nums];
        System.out.println("创建一个数组");
        for(int i=0;i<nums;i++){
            arr[i]=(int)(Math.random()*100);
        }
        System.out.println("遍历数组");
        for(int j =0;j<nums;j++){
            System.out.println(arr[j]);
        }
        System.out.println("寻找最大值和最小值");
       int max =arr[0];
        int min = arr[0];
        int temp;
        for(int s=0;s<nums;s++){
            if(arr[s]<arr[0]) min=arr[s];
            if(arr[s]>arr[0]) max=arr[s];
        }
        System.out.println("最大值"+max);
        System.out.println("最小值"+ min);
    }


}
