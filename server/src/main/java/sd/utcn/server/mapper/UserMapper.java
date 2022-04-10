package sd.utcn.server.mapper;

import sd.utcn.server.dto.UserDto;
import sd.utcn.server.model.Admin;
import sd.utcn.server.model.Customer;
import sd.utcn.server.model.User;

public class UserMapper {
    public static UserDto toDto(User user){
        if(user instanceof Customer) return CustomerMapper.toDto((Customer) user);
        return AdminMapper.toDto((Admin) user);
    }
}
