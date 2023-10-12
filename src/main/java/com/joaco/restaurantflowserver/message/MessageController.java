package com.joaco.restaurantflowserver.message;

import java.util.Date;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.MenuItem;
import com.joaco.restaurantflowserver.model.Order;
import com.joaco.restaurantflowserver.model.dto.OrderDto;
import com.joaco.restaurantflowserver.repos.MenuItemRepository;
import com.joaco.restaurantflowserver.repos.OrderRepository;

@RestController
public class MessageController {

  @Autowired
  private OrderRepository repository;

  @Autowired
  private MenuItemRepository menuRepository;

  @MessageMapping("/order")
  @SendTo("/topic/order")
  public ResponseEntity<?> setOrder(OrderDto order) {

    // LinkedList<MenuItem> items = new LinkedList<>();
    // order.items().stream().forEach(item ->
    // items.add(menuRepository.findById(item.id()).get()));

    // Order toSave = new Order(
    // 0,
    // order.name(),
    // new Date(),
    // false,
    // items);

    // repository.save(toSave);

    return new ResponseEntity<>(order, HttpStatusCode.valueOf(200));

  }

}
