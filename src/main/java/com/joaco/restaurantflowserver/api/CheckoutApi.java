package com.joaco.restaurantflowserver.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.Checkout;
import com.joaco.restaurantflowserver.model.PaymentMethod;
import com.joaco.restaurantflowserver.model.dto.CheckoutDto;
import com.joaco.restaurantflowserver.model.dto.PaymentDto;
import com.joaco.restaurantflowserver.repos.CheckoutRepository;
import com.joaco.restaurantflowserver.repos.OrderRepository;
import com.joaco.restaurantflowserver.repos.PaymentMethodRepository;

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

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private PaymentMethodRepository paymentMethodRepository;

  @GetMapping
  public List<Checkout> getAll() {
    return checkoutRepository.findAll();
  }

  @PostMapping
  public ResponseEntity<String> create(@RequestBody CheckoutDto checkout) {
    try {
      checkoutRepository.save(new Checkout(0, checkout.price(), orderRepository.findById(checkout.order()).get()));
      return new ResponseEntity<String>("Checkout created successfully. ID: " + checkout.order(),
          HttpStatusCode.valueOf(201));
    } catch (Exception e) {
      return new ResponseEntity<String>("Unexpected error while creating checkout",
          HttpStatusCode.valueOf(500));
    }
  }

  @PostMapping("/payment")
  public ResponseEntity<String> checkPayment(@RequestBody PaymentDto paymentDto, @RequestParam int checkout_id) {
    try {
      Checkout checkout = checkoutRepository.findById(checkout_id).get();

      PaymentMethod paymentMethod = new PaymentMethod(0, paymentDto.fullName(), paymentDto.expirationDate(),
          paymentDto.cardType(), paymentDto.company(), paymentDto.cardNumber(), paymentDto.securityCode());

      checkout.setPaymentMethod(paymentMethod);
      // ? In a real app execute payment method call and extract the payment
      System.out.println(paymentMethod.toString() + " \n\rregistered new payment");
      paymentMethodRepository.save(paymentMethod);
      checkoutRepository.save(checkout); // update checkout
      return new ResponseEntity<String>("Checkout payment set successfully. ID: " + checkout_id,
          HttpStatusCode.valueOf(201));
    } catch (Exception e) {
      return new ResponseEntity<>(e.toString(),
          HttpStatusCode.valueOf(500));
    }

  }

}
