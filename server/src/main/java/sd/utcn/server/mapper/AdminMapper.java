package sd.utcn.server.mapper;

import sd.utcn.server.dto.AdminDto;
import sd.utcn.server.model.Admin;

public class AdminMapper {
    public static AdminDto toDto(Admin admin){
        var a = new AdminDto();
        a.setId(admin.getId());
        a.setEmail(admin.getEmail());
        a.setRestaurants(admin.getRestaurants().stream().map(AdminRestaurantMapper::toDto).toList());
        return a;
    }
}
