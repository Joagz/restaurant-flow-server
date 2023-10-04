package com.joaco.restaurantflowserver.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaco.restaurantflowserver.model.Order;
import java.util.List;


public interface OrderRepository extends JpaRepository<Order, Integer> {

  List<Order> findByCompleted(boolean completed);

}
