package com.joaco.restaurantflowserver.model.dto;

import java.util.List;

public record MenuItemDto(
    String name, String description,
    String price, List<String> items) {

}
