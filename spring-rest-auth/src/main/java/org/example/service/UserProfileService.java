package org.example.service;

import org.example.dao.UserRepository;
import org.example.model.Users;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserRepository userRepository;


    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Users getUser(){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Users u = userRepository.findByEmail(email);

        return u;
    }

}
