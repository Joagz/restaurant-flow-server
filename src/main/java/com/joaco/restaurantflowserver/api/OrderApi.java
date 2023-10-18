package com.joaco.restaurantflowserver.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.MenuItem;
import com.joaco.restaurantflowserver.model.Order;
import com.joaco.restaurantflowserver.model.dto.OrderDto;
import com.joaco.restaurantflowserver.repos.MenuItemRepository;
import com.joaco.restaurantflowserver.repos.OrderRepository;

import lombok.Getter;

@Getter
class IgnoreList {
  private List<Integer> ids;
}

@RestController
@RequestMapping("/api/order")
public class OrderApi {

  @Autowired
  private OrderRepository repository;
  @Autowired
  private MenuItemRepository menuItemRepository;

  @GetMapping
  @CrossOrigin("*")
  public ResponseEntity<List<Order>> getAllOrders(
      @RequestParam(value = "completed", required = true) int completed) {

    if (completed == 1) {
      return new ResponseEntity<List<Order>>(repository.findByCompleted(true), HttpStatusCode.valueOf(200));
    }

    if (completed == 0) {
      return new ResponseEntity<List<Order>>(repository.findByCompleted(false), HttpStatusCode.valueOf(200));
    }

    return new ResponseEntity<List<Order>>(repository.findAll(), HttpStatusCode.valueOf(200));
  }

  @GetMapping("/ignore")
  @CrossOrigin("*")
  public ResponseEntity<List<Order>> getAllOrdersIgnoreList(@RequestBody IgnoreList ids) {

    List<Order> orders = new ArrayList<Order>();
    List<Order> oldOrders = repository.findAll();

    oldOrders.forEach(order -> {
      if (!ids.getIds().contains(order.getId()))
        orders.add(order);
    });

    return new ResponseEntity<List<Order>>(orders, HttpStatusCode.valueOf(200));

  }

  @PostMapping
  @CrossOrigin("*")
  public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto) {
    try {
      List<MenuItem> items = new ArrayList<MenuItem>();
      orderDto.items().stream().forEach(item -> items.add(menuItemRepository.findById(item.getId()).get()));
      return new ResponseEntity<Order>(
          repository.save(new Order(0, orderDto.name(), new Date(), false, orderDto.finalPrice(), items)),
          HttpStatusCode.valueOf(201));
    } catch (Exception e) {
      return new ResponseEntity<String>(e.toString(), HttpStatusCode.valueOf(500));
    }

  }

  @PutMapping("/complete/{id}")
  @CrossOrigin("*")
  public ResponseEntity<?> editOrder(@PathVariable Integer id
  //, Principal principal
  ) {

    Optional<Order> found = repository.findById(id);

    if (found.isPresent()) {

      var obj = found.get();
      obj.setCompleted(true);

      // simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/order", obj);

      repository.save(obj);

      return ResponseEntity.ok().body(obj);

    } else {
      return ResponseEntity.status(404).body("not found");
    }

  }
}
