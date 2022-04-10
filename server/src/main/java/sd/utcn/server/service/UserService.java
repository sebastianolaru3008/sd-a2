package sd.utcn.server.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd.utcn.server.dto.LoginUserDto;
import sd.utcn.server.dto.UserDto;
import sd.utcn.server.mapper.UserMapper;
import sd.utcn.server.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto login(LoginUserDto customerDto) throws Exception {
        var optional = userRepository.findUserByEmail(customerDto.getEmail());
        if(optional.isEmpty()) throw new Exception("Customer doesn't exist");
        var user = optional.get();
        if(!BCrypt.checkpw(customerDto.getPassword(), user.getPasswordHash())) throw new Exception("Incorrect password");
        return UserMapper.toDto(user);
    }
}
