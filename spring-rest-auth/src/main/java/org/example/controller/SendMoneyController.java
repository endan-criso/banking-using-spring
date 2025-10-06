package org.example.controller;


import org.example.dto.SendMoneyRequest;
import org.example.service.SendMoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class SendMoneyController {

    @Autowired
    private SendMoneyService sendMoneyService;

    @RequestMapping("/send")
    public ResponseEntity<String> sendRequest(@RequestBody SendMoneyRequest sendMoneyRequest){

        String result = sendMoneyService.checkUser(sendMoneyRequest);
        if(result == "Invalid Account")
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ACcount");
        } else if (result == "Cannot Self Transfer") {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Self Transfer");
        } else if (result == "Insufficient money") {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Insufficient money");
        }

        return ResponseEntity.ok("Success");
    }
}
