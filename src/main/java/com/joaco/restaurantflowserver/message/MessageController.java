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
  @SendTo("/topic/orders")
  public ResponseEntity<?> setOrder(OrderDto order) {
    if (order != null) {
      Order toSave = new Order(
          (Integer) null,
          order.name(),
          new Date(),
          false,
          order.items());

      repository.save(toSave);

      return new ResponseEntity<Order>(toSave, HttpStatusCode.valueOf(200));
    }
    return new ResponseEntity<String>("An unexpected error occured ", HttpStatusCode.valueOf(400));

  }

}
