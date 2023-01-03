package yconsoft.contracts;
//use @Value to bring value in here and make this a component class
public interface BusinessConstantsConfig {
    String PRIVILEGE_MANAGER = "mtt";
    String PRIVILEGE_ADMIN = "aft";
    String PRIVILEGE_STAFF = "sff";
    int expiryThreshold = 60 * 60 * 2 * 1000; //2 hours
}
