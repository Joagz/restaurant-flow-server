package com.joaco.restaurantflowserver.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.Image;
import com.joaco.restaurantflowserver.model.MenuItem;
import com.joaco.restaurantflowserver.repos.ImageRepository;
import com.joaco.restaurantflowserver.repos.MenuItemRepository;

@RestController
@RequestMapping("/api/image")
public class ImageApi {

  @Autowired
  private MenuItemRepository menuItemRepository;
  @Autowired
  private ImageRepository imageRepository;

  @GetMapping("/{menuId}")
  public ResponseEntity<?> getImageByMenu(@PathVariable int menuId) {

    MenuItem menu = menuItemRepository.findById(menuId).get();
    Image image = imageRepository.findById(menu.getImage().getId()).get();

    return ResponseEntity.ok().header("Content-Type", "image/png").body(image.getData());

  }
}
