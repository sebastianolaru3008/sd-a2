package sd.utcn.server.mapper;

import sd.utcn.server.dto.NewRestaurantDto;
import sd.utcn.server.dto.RestaurantDto;
import sd.utcn.server.model.Restaurant;

public class RestaurantMapper {
    public static RestaurantDto toDto(Restaurant restaurant){
        var r = new RestaurantDto();
        if(restaurant.getFoods()!= null)
            r.setFoods(restaurant.getFoods().stream().map(FoodMapper::toDto).toList());
        r.setId(restaurant.getId());
        r.setName(restaurant.getName());
        r.setLocation(restaurant.getLocation());
        r.setAdminEmail(restaurant.getAdmin().getEmail());
        return r;
    }

    public static Restaurant toEntity(NewRestaurantDto newRestaurantDto){
        var r = new Restaurant();
        r.setName(newRestaurantDto.getName());
        r.setLocation(newRestaurantDto.getLocation());
        return r;
    }
}
