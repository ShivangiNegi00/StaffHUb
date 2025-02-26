package org.shivangi.staffhub.repository;

import java.util.List;

import org.shivangi.staffhub.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TaskRepo extends JpaRepository<Task,Long> {
    List<Task> findByUserId(Integer userId);
    
}
