package com.joaco.restaurantflowserver.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joaco.restaurantflowserver.model.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {

}
