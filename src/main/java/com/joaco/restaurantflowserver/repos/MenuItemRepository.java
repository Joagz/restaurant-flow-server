package com.joaco.restaurantflowserver.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaco.restaurantflowserver.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, String>{
  
}
