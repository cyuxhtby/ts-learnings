// Leetcode Partition Equal Subset Sum: 

// Given an integer array nums, return true if you can partition the array into two subsets
// such that the sum of the elements in both subsets is equal or false otherwise.

function canPartition(nums: number[]): boolean {
    const totalSum = nums.reduce((acc, num) => acc + num, 0);
  
    // If the total sum is odd, it cannot be partitioned into two equal subsets
    if (totalSum % 2 !== 0) return false;
  
    const target = totalSum / 2; // The sum that each of the two subsets needs to achieve for the partition to be equal
    
    // Initialize a dynamic programming boolean array to track achievable subset sums
    const dp: boolean[] = Array(target + 1).fill(false); 
    
    dp[0] = true; // The empty subset always has a sum of 0
  
    // Fill dp array to find compatible subsets
    for (const num of nums) {
    
      for (let i = target; i >= num; i--) {
        if (dp[i - num]) {
          dp[i] = true; // dp[i] will be true if a subset with sum i can be formed, key for partitioning check
        }
      }
    }
  
    return dp[target];  // Return whether the target sum can be achieved by a subset
  }
  