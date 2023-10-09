package com.joaco.restaurantflowserver.message;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.Order;
import com.joaco.restaurantflowserver.model.dto.OrderDto;
import com.joaco.restaurantflowserver.repos.OrderRepository;

@RestController
public class MessageController {

  @Autowired
  private OrderRepository repository;

  @MessageMapping("/order")
  @SendTo("/topic/order")
  public ResponseEntity<?> setOrder(OrderDto order) {
    // Order toSave = new Order(
    //     (Integer) null,
    //     order.name(),
    //     new Date(),
    //     false,
    //     null);

    // repository.save(toSave);

    return new ResponseEntity<>(order, HttpStatusCode.valueOf(200));

  }

}
