package org.example.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.dto.LoginRequest;
import org.example.dto.RegisterRequest;
import org.example.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    public AuthController() {

    }

    @PostMapping("/register")
    public ResponseEntity<String> userRegister(@RequestBody RegisterRequest register)
    {
        if(!authService.registerAuth(register))
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is Already Exist");
        }

        return ResponseEntity.ok("User Registered Successful");


    }

    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody LoginRequest loginRequest, HttpServletRequest httpRequest)
    {

            UserDetails userDetails = authService.login(loginRequest);
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password or Email");
            }

            Authentication auth = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(auth);
            HttpSession session = httpRequest.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            System.out.println("Session ID: " + httpRequest.getSession(false).getId());
            System.out.println("AUTH: " + auth);
            System.out.println("Principal: " + auth.getPrincipal());



            return ResponseEntity.ok("Login Successful");
    }
}
