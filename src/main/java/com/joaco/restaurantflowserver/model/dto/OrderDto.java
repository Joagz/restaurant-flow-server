package com.joaco.restaurantflowserver.model.dto;

import java.util.List;

public record OrderDto(String name, List<MenuItemDto> items, Integer id, Boolean completed) {

}
