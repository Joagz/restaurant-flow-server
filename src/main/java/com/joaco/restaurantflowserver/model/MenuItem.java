package com.joaco.restaurantflowserver.model;

import java.util.List;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="menu_items")
@Setter
@Getter
@AllArgsConstructor
public class MenuItem {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  private String id;
  private String name;
  private List<String> items;
  private String price;
  private String description;
  private boolean available;

}
