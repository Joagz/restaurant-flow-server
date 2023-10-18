package com.joaco.restaurantflowserver.model;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "menus")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MenuItem {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
  @GenericGenerator(name = "native", strategy = "native")
  @Column(name = "menu_id")
  private int id;
  private String name;
  private String price;
  private String description;
  private boolean available;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(referencedColumnName = "id", name = "image", nullable = true)
  @Nullable
  @JsonIgnore
  private Image image;

}
