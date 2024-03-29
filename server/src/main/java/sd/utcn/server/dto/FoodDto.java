package sd.utcn.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sd.utcn.server.model.state.FoodCategory;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FoodDto {
    private String id;
    private String name;
    private String description;
    private Double price;
    private String category;
}
