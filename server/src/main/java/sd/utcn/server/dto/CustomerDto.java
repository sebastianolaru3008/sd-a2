package sd.utcn.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class CustomerDto extends UserDto {
    private List<OrderDto> orders;
    private boolean isAdmin = false;

    public CustomerDto(String generatedUUID, String email, List<OrderDto> orders) {
        super(generatedUUID,email);
        this.orders = orders;
    }


    public boolean getIsAdmin() {
        return isAdmin;
    }
}
