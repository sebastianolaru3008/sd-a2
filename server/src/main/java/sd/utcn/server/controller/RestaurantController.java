package sd.utcn.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sd.utcn.server.dto.NewRestaurantDto;
import sd.utcn.server.dto.RestaurantDto;
import sd.utcn.server.service.RestaurantService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    private final RestaurantService restaurantService;
    private Logger logger = LoggerFactory.getLogger(RestaurantController.class);

    @Autowired
    public RestaurantController(RestaurantService service) {
        this.restaurantService = service;
    }



    @GetMapping(path = "{id}")
    public ResponseEntity<RestaurantDto> get(@PathVariable("id") String id) {
        try{
            var dto = restaurantService.getById(id);
            logger.info("Getting a restaurant.");
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }catch(Exception e){
            logger.error("Error getting a restaurant!");
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<RestaurantDto>> getAll() {
        logger.info("Getting all restaurants.");
        return new ResponseEntity<>(restaurantService.getAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RestaurantDto> add(@RequestBody NewRestaurantDto newRestaurantDto){
        try {
            var res = restaurantService.add(newRestaurantDto);
            logger.info("Adding a restaurant.");
            return new ResponseEntity<>(res, HttpStatus.OK);
        }catch(Exception e){
            logger.error("Error adding a restaurant!");
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}