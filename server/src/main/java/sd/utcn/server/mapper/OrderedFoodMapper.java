package sd.utcn.server.mapper;

import sd.utcn.server.dto.NewOrderedFoodDto;
import sd.utcn.server.dto.OrderedFoodDto;
import sd.utcn.server.model.OrderedFood;

public class OrderedFoodMapper {
    public static OrderedFood toEntity(NewOrderedFoodDto newOrderedFoodDto){
        var o = new OrderedFood();
        o.setQuantity(newOrderedFoodDto.getQuantity());
        return o;
    }

    public static OrderedFoodDto toDto(OrderedFood orderedFood){
        var o = new OrderedFoodDto();
        o.setFood(FoodMapper.toDto(orderedFood.getFood()));
        o.setQuantity(orderedFood.getQuantity());
        o.setId(orderedFood.getId());
        return o;
    }
}
