package org.example.controller;

import org.example.dto.UserProfileRequest;
import org.example.model.Users;
import org.example.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/user")
public class UserProfileController {

    @Autowired
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }


    @GetMapping("/profile")
    public UserProfileRequest displayUser()
    {
        Users u = userProfileService.getUser();

        UserProfileRequest userProfileRequest = new UserProfileRequest();

        userProfileRequest.setName(u.getName().toUpperCase());
        userProfileRequest.setAccNo(u.getAccount().getAccountNo());
        userProfileRequest.setCash(u.getAccount().getCash());

        return userProfileRequest;
    }

}
