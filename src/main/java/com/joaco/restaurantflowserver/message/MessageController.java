package com.joaco.restaurantflowserver.message;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.Order;
import com.joaco.restaurantflowserver.repos.OrderRepository;

@RestController
public class MessageController {

  @Autowired
  private OrderRepository repository;

  @MessageMapping("/order")
  @SendTo("/topic/orders")
  public ResponseEntity<?> setOrder(String orderId) {
    Optional<Order> order = repository.findById(orderId);
    if (order.isPresent())
      return new ResponseEntity<Order>(order.get(), HttpStatusCode.valueOf(200));
    else {
      return new ResponseEntity<String>("Couldn't find order with id " + orderId, HttpStatusCode.valueOf(404));
    }
  }

}
