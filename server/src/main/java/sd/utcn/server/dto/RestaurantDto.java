package sd.utcn.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class RestaurantDto {
    private String id;
    private String name;
    private String location;
    private List<FoodDto> foods;
}
