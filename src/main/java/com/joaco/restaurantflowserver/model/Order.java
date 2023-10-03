package com.joaco.restaurantflowserver.model;

import java.util.Date;
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
import lombok.Setter;

@Entity
@Table(name = "orders")
@Setter
@Getter
@AllArgsConstructor
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private String id;
  private String name;

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int priority;
  private Date created;
  private boolean completed;

  @OneToMany
  private List<MenuItem> items;

}
