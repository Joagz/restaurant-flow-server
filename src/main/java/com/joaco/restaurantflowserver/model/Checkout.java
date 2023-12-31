package com.joaco.restaurantflowserver.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "checkouts")
@Getter
@Setter
@NoArgsConstructor
public class Checkout {

  public Checkout(int id, String price, Order order) {
    this.id = id;
    this.price = price;
    this.order = order;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private int id;

  private String price;

  @ManyToOne
  @JoinColumn(referencedColumnName = "id", name = "payment_method", nullable = true)
  @Nullable
  private PaymentMethod paymentMethod;

  @ManyToOne
  @JoinColumn(referencedColumnName = "order_id", name = "order_id")
  private Order order;

}
