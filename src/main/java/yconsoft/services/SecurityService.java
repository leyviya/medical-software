package yconsoft.services;


public class SecurityService {
    public static String getPasswordHash(String pwd){
        StringBuilder builder = new StringBuilder("");
        for(char token : pwd.toCharArray()){
            builder.append(token ^ 33);
        }
        return builder.toString();
    }
    public static String generateStaffSessionToken(String ipAddress, String username, String staffCode){
        return getPasswordHash(ipAddress + username + staffCode + System.currentTimeMillis());
    }
}
