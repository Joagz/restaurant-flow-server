package com.joaco.restaurantflowserver.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaco.restaurantflowserver.model.Admin;
import java.util.List;


public interface AdminRepository extends JpaRepository<Admin, String> {

  List<Admin> findByName(String name);

}
