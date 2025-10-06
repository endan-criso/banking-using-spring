package org.example.controller;

import org.example.dao.AccountDetailsRepo;
import org.example.dao.HistoryRepo;
import org.example.model.AccountDetails;
import org.example.model.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class HistoryController {

    @Autowired
    private HistoryRepo historyRepo;

    @Autowired
    private AccountDetailsRepo accountDetailsRepo;

    @GetMapping("/history")
    public ResponseEntity<List<History>> getEachUserHistory(Authentication auth)
    {
        String user = auth.getName();

        AccountDetails account = accountDetailsRepo.findByUser_Email(user);

        String accountNo = account.getAccountNo();

        List<History> history = historyRepo.findBySendAccount(accountNo);

        return ResponseEntity.ok(history);

    }
}
