package com.joaco.restaurantflowserver.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.Checkout;
import com.joaco.restaurantflowserver.repos.CheckoutRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutApi {

  @Autowired
  private CheckoutRepository checkoutRepository;

  @GetMapping
  public List<Checkout> getAll() {
    return checkoutRepository.findAll();
  }

  @PostMapping
  public ResponseEntity<String> create(@RequestBody Checkout checkout) {
    try {
      checkoutRepository.save(checkout);
      return new ResponseEntity<String>("Checkout created successfully. ID: " + checkout.getId(),
          HttpStatusCode.valueOf(201));
    } catch (Exception e) {
      return new ResponseEntity<String>("Unexpected error while creating checkout",
          HttpStatusCode.valueOf(500));
    }
  }

}
