package org.example.service;

import org.example.dao.AccountDetailsRepo;
import org.example.dao.UserRepository;
import org.example.dto.LoginRequest;
import org.example.dto.RegisterRequest;
import org.example.model.AccountDetails;
import org.example.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountDetailsRepo accountDetailsRepo;

    Argon2PasswordEncoder passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public boolean registerAuth(RegisterRequest request){

        if(userRepository.findByEmail(request.getEmail()) != null)
        {
            return false;
        }

        Users newUser = new Users();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        //newUser.setAccountNo(generateAcc()); //generateAcc func
        newUser.setRole("USER");
        userRepository.save(newUser);

        double cash = 1600;

        AccountDetails accountDetails = new AccountDetails();
        accountDetails.setCash(cash);

        accountDetailsRepo.save(accountDetails);
        String accountNo = generateAccount(accountDetails.getId());
        accountDetails.setAccountNo(accountNo);

        newUser.setAccount(accountDetails);
        userRepository.save(newUser);
        return true;
    }

    public UserDetails login(LoginRequest loginRequest){

        Users u = userRepository.findByEmail(loginRequest.getEmail());

        if(u != null && passwordEncoder.matches(loginRequest.getPassword(), u.getPassword())){
                    return new org.springframework.security.core.userdetails.User(
                            u.getEmail(),
                            u.getPassword(),
                            List.of(new SimpleGrantedAuthority(u.getRole()))
                    );
        }


        return null;
    }

    public String generateAccount(Long id)
    {
        return String.format("%010d", id);
    }


}
