import java.util.HashMap;

public class TwoSum {
    /**
     *  public int[] twoSum(int[] nums,int target){
     *         for(int i=0;i<nums.length;i++){
     *             for(int j=i+1;j<nums.length;j++){
     *                 if(target == nums[i]+nums[j]){
     *                     return new int[]{i,j};
     *                 }
     *             }
     *         }
     *         throw new IllegalArgumentException("No two sum solution");
     *     }
     */
    public int[] twoSum(int[] nums,int target){
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int i=0;i<nums.length;i++){
            map.put(nums[i],i);
        }

        for(int j=0;j<nums.length;j++){
            int targetValue = target - nums[j];
            if(map.containsKey(targetValue)&& map.get(targetValue)!=null){
                return new int[]{j,map.get(targetValue)};
            }
        }
        throw new IllegalArgumentException("No two sum solution");
    }


    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        TwoSum sum = new TwoSum();
        sum.twoSum(nums,target);
        System.out.println(sum.twoSum(nums,target)[0]);
        System.out.println(sum.twoSum(nums,target)[1]);
    }
}
