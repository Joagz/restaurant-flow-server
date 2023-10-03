package com.joaco.restaurantflowserver.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joaco.restaurantflowserver.model.MenuItem;
import com.joaco.restaurantflowserver.model.dto.MenuItemDto;
import com.joaco.restaurantflowserver.repos.MenuItemRepository;

@RestController
@RequestMapping("/api/menu")
public class MenuItemApi {

  @Autowired
  private MenuItemRepository repository;

  @GetMapping
  public ResponseEntity<List<MenuItem>> getAllMenuItems() {
    return new ResponseEntity<List<MenuItem>>(repository.findAll(), HttpStatusCode.valueOf(200));
  }

  @PostMapping
  public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItemDto menuItem) {

    MenuItem save = new MenuItem(
        null,
        menuItem.name(),
        menuItem.items(),
        menuItem.price(),
        menuItem.description(),
        true);

    repository.save(save);
    return new ResponseEntity<MenuItem>(save, HttpStatusCode.valueOf(201));

  }

}
