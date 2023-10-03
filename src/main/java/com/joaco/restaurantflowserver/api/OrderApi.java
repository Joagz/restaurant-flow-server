package com.joaco.restaurantflowserver.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.MenuItem;
import com.joaco.restaurantflowserver.model.Order;
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

  @GetMapping("test")
  public String testData() {
    repository.save(new Order(0, "test1", new Date(), false, new LinkedList<>()));
    repository.save(new Order(0, "test2", new Date(), false, new LinkedList<>()));
    repository.save(new Order(0, "test3", new Date(), false, new LinkedList<>()));
    repository.save(new Order(0, "test4", new Date(), false, new LinkedList<>()));
    repository.save(new Order(0, "test5", new Date(), false, new LinkedList<>()));
    return "created";
  }

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

  @GetMapping("/ignore")
  public ResponseEntity<List<Order>> getAllOrdersIgnoreList(@RequestBody IgnoreList ids) {

    List<Order> orders = new ArrayList<Order>();
    List<Order> oldOrders = repository.findAll();

    oldOrders.forEach(order -> {
      if (!ids.getIds().contains(order.getId()))
        orders.add(order);
    });

    return new ResponseEntity<List<Order>>(orders, HttpStatusCode.valueOf(200));

  }

}
