package org.example.service;

import org.example.dao.HistoryRepo;
import org.example.model.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HistoryService {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private HistoryRepo historyRepo;

    public void generateHistory(String senderName, String receiveName, String status, double cash){

        History history = new History();
        history.setSendAccount(senderName);
        history.setReceiveAccount(receiveName);
        history.setCash(cash);
        history.setStatus(status);
        history.setTimestamp(LocalDateTime.now());

        historyRepo.save(history);
    }
}
