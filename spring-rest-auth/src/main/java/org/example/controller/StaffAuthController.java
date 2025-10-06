package org.example.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.dto.LoginRequest;
import org.example.service.StaffAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/staff")
public class StaffAuthController {

        @Autowired
        private StaffAuthService staffAuthService;



        @GetMapping("/login")
        public ResponseEntity<String> loginFunc(@RequestBody LoginRequest loginRequest, HttpServletRequest httpServletRequest){

            UserDetails userDetails = staffAuthService.authStaff(loginRequest);

            if(userDetails == null)
            {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid email or password");
            }

            Authentication auth = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            HttpSession session = httpServletRequest.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            return ResponseEntity.ok("Login Successful");
        }
}
