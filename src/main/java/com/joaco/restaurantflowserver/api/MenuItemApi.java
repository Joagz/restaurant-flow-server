package com.joaco.restaurantflowserver.api;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.Image;
import com.joaco.restaurantflowserver.model.MenuItem;
import com.joaco.restaurantflowserver.model.dto.MenuItemDto;
import com.joaco.restaurantflowserver.repos.ImageRepository;
import com.joaco.restaurantflowserver.repos.MenuItemRepository;

@RestController
@RequestMapping("/api/menu")
public class MenuItemApi {

  @Autowired
  private MenuItemRepository repository;

  @Autowired
  private ImageRepository imageRepository;

  @GetMapping
  @CrossOrigin("*")
  public ResponseEntity<List<MenuItem>> getAllMenuItems() {
    return new ResponseEntity<List<MenuItem>>(repository.findAll(), HttpStatusCode.valueOf(200));
  }

  @GetMapping("/{id}")
  @CrossOrigin("*")
  public ResponseEntity<MenuItem> getById(@PathVariable Integer id) {
    return new ResponseEntity<MenuItem>(repository.findById(id).get(), HttpStatusCode.valueOf(200));
  }

  @PostMapping(consumes = "multipart/form-data")
  @CrossOrigin("*")
  public ResponseEntity<MenuItem> createMenuItem(@ModelAttribute MenuItemDto menuItem) throws IOException {

    Image image = imageRepository.save(new Image(0, menuItem.image().getInputStream().readAllBytes()));

    MenuItem save = new MenuItem(
        0,
        menuItem.name(),
        menuItem.price(),
        menuItem.description(),
        true,
        image);

    repository.save(save);
    return new ResponseEntity<MenuItem>(save, HttpStatusCode.valueOf(201));

  }

  @PostMapping(value = "/many", consumes = "multipart/form-data")
  @CrossOrigin("*")
  public ResponseEntity<String> insertMany(@ModelAttribute List<MenuItemDto> menuItems) throws IOException {

    for (var menuItem : menuItems) {

      Image image = imageRepository.save(new Image(0, menuItem.image().getInputStream().readAllBytes()));

      MenuItem save = new MenuItem(
          0,
          menuItem.name(),
          menuItem.price(),
          menuItem.description(),
          true,
          image);
      repository.save(save);
    }
    return new ResponseEntity<String>("Saved correctly", HttpStatusCode.valueOf(201));

  }

}
