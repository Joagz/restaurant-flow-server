package com.joaco.restaurantflowserver.model.dto;

import java.util.List;

import com.joaco.restaurantflowserver.model.MenuItem;

public record OrderDto(String name, List<MenuItem> items, Integer id, Boolean completed, int finalPrice) {

}
