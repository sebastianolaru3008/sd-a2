package sd.utcn.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd.utcn.server.dto.FoodDto;
import sd.utcn.server.dto.NewFoodDto;
import sd.utcn.server.mapper.FoodMapper;
import sd.utcn.server.repository.FoodRepository;
import sd.utcn.server.repository.RestaurantRepository;

import javax.transaction.Transactional;

@Service
public class FoodService {
    private final FoodRepository foodRepository;
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository, RestaurantRepository restaurantRepository) {
        this.foodRepository = foodRepository;
        this.restaurantRepository = restaurantRepository;
    }

    /**
     * Adds a food item to the given restaurant.
     * @param newFood
     * @return
     * @throws Exception
     */
    @Transactional
    public FoodDto addFoodToRestaurant(NewFoodDto newFood) throws Exception {
        var restaurant = restaurantRepository.findById(newFood.getRestaurantId());
        if(restaurant.isEmpty()) throw  new Exception("Restaurant doesn't exist!");
        if(newFood.getPrice() <= 0) throw  new Exception("Invalid price");

        var entity = FoodMapper.toEntity(newFood);
        entity.setRestaurant(restaurant.get());
        var added = foodRepository.save(entity);
        restaurant.get().addFood(added);
        return FoodMapper.toDto(added);
    }
}
