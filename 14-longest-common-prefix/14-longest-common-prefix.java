class Solution {
    public String longestCommonPrefix(String[] strs) {
        if(strs == null || strs.length == 0){
            return "";
        }
        String firstWord = strs[0];
        StringBuilder strB = new StringBuilder();
        for(int i=0; i < firstWord.length() ; i++){
            Character letter = firstWord.charAt(i);
            boolean match = true;
            for(int j = 1; j < strs.length; j++){
                String word = strs[j];
                if(word.length() >= i+1){
                    Character wl = word.charAt(i);
                    if(wl != letter){
                        match = false;
                        break;
                    }
                } else{ match = false; break;}
            }
            if(match){
                strB.append(letter);
            } else{
                break;
            }
        }
        return strB.toString();
    }
}