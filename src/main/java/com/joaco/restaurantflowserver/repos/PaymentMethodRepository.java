package com.joaco.restaurantflowserver.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaco.restaurantflowserver.model.PaymentMethod;
import java.util.List;


public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {
  List<PaymentMethod> findByCardNumber(String cardNumber);
}
