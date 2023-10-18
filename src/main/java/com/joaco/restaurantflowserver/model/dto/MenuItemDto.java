package com.joaco.restaurantflowserver.model.dto;

import org.springframework.web.multipart.MultipartFile;

public record MenuItemDto(
                String name, String description,
                String price, int menu_id, MultipartFile image) {
}
