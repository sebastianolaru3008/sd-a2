package sd.utcn.server.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sd.utcn.server.dto.FoodDto;
import sd.utcn.server.dto.NewFoodDto;
import sd.utcn.server.service.FoodService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/food")
public class FoodController {

    private final FoodService foodService;
    private Logger logger = LoggerFactory.getLogger(FoodController.class);

    @Autowired
    public FoodController(FoodService service) {
        this.foodService = service;
    }

    @PostMapping
    public ResponseEntity<FoodDto> addFoodToRestaurant(@RequestBody NewFoodDto newFood){
        try{
            var dto = foodService.addFoodToRestaurant(newFood);
            logger.info("A new food was added to restaurant.");
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }catch(Exception e){
            logger.error("Error adding a food!");
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

