package sd.utcn.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd.utcn.server.dto.NewRestaurantDto;
import sd.utcn.server.dto.RestaurantDto;
import sd.utcn.server.mapper.RestaurantMapper;
import sd.utcn.server.repository.AdminRepository;
import sd.utcn.server.repository.RestaurantRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final AdminRepository adminRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository, AdminRepository adminRepository) {
        this.restaurantRepository = restaurantRepository;
        this.adminRepository = adminRepository;
    }

    public List<RestaurantDto> getAll() {
        return restaurantRepository.findAll().stream().map(RestaurantMapper::toDto).toList();
    }

    public RestaurantDto getById(String id) throws Exception {
        var r = restaurantRepository.findById(id);
        if (r.isEmpty()) throw new Exception("Nonexistent restaurant");
        return RestaurantMapper.toDto(r.get());
    }

    @Transactional
    public RestaurantDto add(NewRestaurantDto newRestaurantDto) throws Exception {
        var admin = adminRepository.findById(newRestaurantDto.getAdminId());
        if(admin.isEmpty()) throw new Exception("Nonexistent admin");

        var entity = RestaurantMapper.toEntity(newRestaurantDto);
        entity.setAdmin(admin.get());
        var r = restaurantRepository.save(entity);
        admin.get().addRestaurant(r);
        return RestaurantMapper.toDto(r);
    }
}
