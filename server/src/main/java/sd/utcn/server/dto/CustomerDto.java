package sd.utcn.server.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CustomerDto extends UserDto {
    private List<OrderDto> orders;
}
