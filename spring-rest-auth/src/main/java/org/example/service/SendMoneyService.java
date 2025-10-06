package org.example.service;

import org.example.dao.AccountDetailsRepo;
import org.example.dto.SendMoneyRequest;
import org.example.model.AccountDetails;
import org.example.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SendMoneyService {

    @Autowired
    private AccountDetailsRepo accountDetailsRepo;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private UserProfileService userProfileService;

    @Transactional
    public String checkUser(SendMoneyRequest sendMoneyRequest) {
        AccountDetails account = accountDetailsRepo.findByAccountNoAndUser_Email(
                sendMoneyRequest.getAccountNo(),
                sendMoneyRequest.getReceiverEmail());

        Users user = userProfileService.getUser();
        AccountDetails accountDetails = user.getAccount();


        if (account == null)
        {
            return "Invalid Account";
        }
        else if(accountDetails.getAccountNo().equals(account.getAccountNo()))
        {
            return "Cannot Self Transfer";
        }
        else if(accountDetails.getCash() < sendMoneyRequest.getCash())
        {
            return "Insufficient money";
        }

        accountDetails.setCash(accountDetails.getCash() - sendMoneyRequest.getCash());
        account.setCash(account.getCash() + sendMoneyRequest.getCash());

        accountDetailsRepo.save(account);
        accountDetailsRepo.save(accountDetails);

        historyService.generateHistory(accountDetails.getAccountNo(), account.getAccountNo(), "SUCCESS", sendMoneyRequest.getCash());
        return "Successful";

    }
}
