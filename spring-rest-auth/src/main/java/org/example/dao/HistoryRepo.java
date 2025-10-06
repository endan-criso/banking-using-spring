package org.example.dao;

import org.example.model.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepo extends JpaRepository<History, Long> {

    List<History> findBySendAccount(String sendAccount);

}
