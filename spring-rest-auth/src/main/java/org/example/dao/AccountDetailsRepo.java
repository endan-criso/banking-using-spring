package org.example.dao;

import org.example.model.AccountDetails;
import org.example.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountDetailsRepo extends JpaRepository<AccountDetails, Long> {
    AccountDetails findByUser(Users user);

    AccountDetails findByAccountNoAndUser_Email(String accountNo, String email);

    AccountDetails findByUser_Email(String email);
}
