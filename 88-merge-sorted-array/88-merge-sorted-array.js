/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) { 
    
    // let nums1=[1,2,3,0,0,0];
    // let nums2=[2,5,6];
    // let newArr = [...nums1, ...nums2]
    // let demo=newArr.filter((ele)=>ele!=0)
    // console.log(demo.sort())
    
    while(n){
        nums1[m++]=nums2[--n];
    }
    nums1.sort((a,b)=>a-b);
};