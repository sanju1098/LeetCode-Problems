class Solution {
    public boolean isPalindrome(int x) {
        int rem=0,orgVal=x,num=0;
      while(x>0){
          rem=x%10;
          num=num*10+rem; 
          x/=10;
      }
        if(num==orgVal){
            return true;
        }
        else{
            return false;
        }
    }
}