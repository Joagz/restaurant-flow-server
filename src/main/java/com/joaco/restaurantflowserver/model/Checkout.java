package com.joaco.restaurantflowserver.model;

import java.util.List;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Entity
@Table(name = "checkouts")
@Getter
@AllArgsConstructor
public class Checkout {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private String id;

  @OneToMany
  private List<Order> orders;

  private String final_bill;

  private PaymentMethod paymentMethod;

}
