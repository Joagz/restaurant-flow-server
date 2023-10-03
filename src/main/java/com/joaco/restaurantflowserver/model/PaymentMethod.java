package com.joaco.restaurantflowserver.model;

public record PaymentMethod(String fullName,
    String cardNumber,
    String expirationDate,
    String securityCode) {

}
