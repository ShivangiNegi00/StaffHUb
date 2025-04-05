package org.shivangi.staffhub.repository;

import org.shivangi.staffhub.entities.User;
import org.springframework.data.repository.CrudRepository; 
import org.springframework.stereotype.Repository; //repository is used to store data in database

import java.util.Optional; //optional is used for null check
@Repository

public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findByEmail(String email) ;
    Optional<User> findByUsername(String username) ;
    boolean existsByUsername(String username) ; 
    
}
