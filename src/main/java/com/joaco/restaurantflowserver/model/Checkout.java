package com.joaco.restaurantflowserver.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "checkouts")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Checkout {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private int id;

  private String price;

  @ManyToOne
  @JoinColumn(referencedColumnName = "id", name = "payment_method_id")
  private PaymentMethod paymentMethod;

  @OneToOne
  @JoinColumn(referencedColumnName = "order_id", name = "order_id")
  private Order order;

}
