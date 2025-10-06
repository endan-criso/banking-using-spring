package org.example.service;

import org.example.dao.UserRepository;
import org.example.dto.LoginRequest;
import org.example.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffAuthService {

    @Autowired
    UserRepository userRepository;
    Argon2PasswordEncoder passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public UserDetails authStaff(LoginRequest loginRequest){

        Users u = userRepository.findByEmail(loginRequest.getEmail());

        if(u != null)
        {
            if(passwordEncoder.matches(loginRequest.getPassword(), u.getPassword()))
            {
                return new org.springframework.security.core.userdetails.User(
                        u.getEmail(),
                        u.getPassword(),
                        List.of(new SimpleGrantedAuthority(u.getRole()))
                );
            }
        }

        return null;

    }
}
