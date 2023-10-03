package com.joaco.restaurantflowserver.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaco.restaurantflowserver.model.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {

}
