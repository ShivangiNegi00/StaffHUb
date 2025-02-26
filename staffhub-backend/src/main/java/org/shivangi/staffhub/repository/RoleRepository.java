package org.shivangi.staffhub.repository;

import org.shivangi.staffhub.entities.Role;
import org.shivangi.staffhub.entities.RoleEnum;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role,Integer> {
    Optional<Role> findByName(RoleEnum name);  
    

}
