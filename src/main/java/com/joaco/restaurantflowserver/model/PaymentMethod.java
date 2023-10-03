package com.joaco.restaurantflowserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;

@Getter
public class PaymentMethod {

  // todo: implement encoding

  private String fullName;
  @JsonIgnore
  private String cardNumber;
  @JsonIgnore
  private String expirationDate;
  @JsonIgnore
  private String securityCode;

}
