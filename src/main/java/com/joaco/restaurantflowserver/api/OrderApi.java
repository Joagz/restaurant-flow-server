package com.joaco.restaurantflowserver.api;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.Order;
import com.joaco.restaurantflowserver.model.dto.OrderDto;
import com.joaco.restaurantflowserver.repos.OrderRepository;

@RestController
@RequestMapping("/api/order")
public class OrderApi {

  @Autowired
  private OrderRepository repository;

  @GetMapping
  public ResponseEntity<List<Order>> getAllOrders(
      @RequestParam(value = "filter", required = false) boolean completed) {

    if (completed) {
      return new ResponseEntity<List<Order>>(repository.findByCompleted(completed), HttpStatusCode.valueOf(200));
    }

    if (completed == false) {
      return new ResponseEntity<List<Order>>(repository.findByCompleted(completed), HttpStatusCode.valueOf(200));
    }

    return new ResponseEntity<List<Order>>(repository.findAll(), HttpStatusCode.valueOf(200));

  }

  @PostMapping
  public ResponseEntity<Order> createOrder(@RequestBody OrderDto order) {
    Order save = new Order(
        null,
        order.name(),
        0, new Date(),
        false,
        order.items());
        
    repository.save(save);

    return new ResponseEntity<Order>(save,
        HttpStatusCode.valueOf(201));
  }

}
