package yconsoft.controllers.v1;

import org.springframework.web.bind.annotation.*;
import yconsoft.beans.ReceiptBean;

import java.util.Collections;
import java.util.List;

public class Auth {
    @GetMapping(path="/hello")
    public @ResponseBody String hello () {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return "JESUS ALWAYS STARTS EVERY PROJECT NO MATTER WHAT!!";
    }

    @GetMapping(path="/get-receipts")
    public @ResponseBody List<ReceiptBean> getReceipts(){
        return Collections.nCopies(5, new ReceiptBean("dammy", 4500, "samuel"));
    }

    @GetMapping(path="/get-receipt/{admin_name}")
    public @ResponseBody  ReceiptBean getReceipt(@PathVariable String admin_name){
        return new ReceiptBean("boss man", 3900, admin_name);
    }
}
