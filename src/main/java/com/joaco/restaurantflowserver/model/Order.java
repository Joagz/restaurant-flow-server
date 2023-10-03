package com.joaco.restaurantflowserver.model;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  @Column(name = "order_id")
  private int id;
  private String name;

  @Column(name = "create_time")
  private Date createTime;
  private boolean completed;

  @OneToMany
  @JoinTable(name = "order_menus", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "menu_id"))
  private List<MenuItem> items;

}
