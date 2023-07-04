// Leetcode Two Sum: 

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order. 

function twoSum(nums: number[], target: number): number[] {
    const hashmap :{[key: number]: number} = {};
    for( let i = 0; i < nums.length ; i++){
        const compliment = target - nums[i];
        // find potential compliment in hashmap
        if (compliment in hashmap){
            return [hashmap[compliment], i]
        }
        // update hashmap current index as we search for compliment
        hashmap[nums[i]] = i;
    }return [];
};

