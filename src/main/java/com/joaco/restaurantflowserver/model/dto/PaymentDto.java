package com.joaco.restaurantflowserver.model.dto;

public record PaymentDto(String fullName, String expirationDate, String cardType, String company, String cardNumber,
    String securityCode) {

}
