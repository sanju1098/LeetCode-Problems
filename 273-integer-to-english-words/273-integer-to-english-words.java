class Solution {
    String[] ones = {"","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"};
    String[] tens = {"Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"};
    String[] hundreds = {"","Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"};
    public String numberToWords(int num) {
        if(num==0)
            return "Zero";
        return intToEngWords(num);
    }
    private String intToEngWords(int num) {
        String result = new String();
        if(num<10) result=ones[num];
        else if(num<20) result=tens[num-10];
        else if(num<100) result=hundreds[num/10]+" "+intToEngWords(num%10);
        else if(num<1000) result=intToEngWords(num/100)+" Hundred "+intToEngWords(num%100);
        else if(num<1000000) result= intToEngWords(num/1000)+" Thousand "+ intToEngWords(num%1000);
        else if(num<1000000000) result= intToEngWords(num/1000000)+" Million "+ intToEngWords(num%1000000);
        else result=intToEngWords(num/1000000000)+" Billion "+ intToEngWords(num%1000000000);
        return result.trim();
    }
}