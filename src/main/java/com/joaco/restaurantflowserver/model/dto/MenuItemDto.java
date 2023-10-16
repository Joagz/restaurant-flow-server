package com.joaco.restaurantflowserver.model.dto;

public record MenuItemDto(
                String name, String description,
                String price, int id, String image) {
}
