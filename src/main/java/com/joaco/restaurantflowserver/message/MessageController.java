package com.joaco.restaurantflowserver.message;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.dto.OrderDto;

@RestController
public class MessageController {

  // ? Explicación: esta sirve para enviar mensajes globales, a través de '/topic'
  // @MessageMapping("/order")
  // @SendTo("/topic/order")
  // public ResponseEntity<?> setOrder(OrderDto order) {

  //   return new ResponseEntity<>(order, HttpStatusCode.valueOf(200));

  // }

  @MessageMapping("/order")
  @SendTo("/queue/order")
  public ResponseEntity<?> sendMessage(OrderDto order) {

    return new ResponseEntity<>(order, HttpStatusCode.valueOf(200));

  }

}
