package sd.utcn.server.service;

import org.apache.catalina.realm.AuthenticatedUserRealm;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sd.utcn.server.dto.LoginResponseDto;
import sd.utcn.server.dto.LoginUserDto;
import sd.utcn.server.dto.UserDto;
import sd.utcn.server.mapper.UserMapper;
import sd.utcn.server.model.Admin;
import sd.utcn.server.model.AuthenticatedUser;
import sd.utcn.server.model.Customer;
import sd.utcn.server.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Gets a given user by checking the id.
     * @param id
     * @return
     * @throws Exception
     */
    public UserDto getById(String id) throws Exception {
        var optional = userRepository.findById(id);
        if (optional.isEmpty()) {
            throw new Exception("User doesn't exist");
        }
        var user = optional.get();
        return UserMapper.toDto(user);
    }


    /**
     * Loads a given user by checking the username.
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var optional = userRepository.findUserByEmail(username);
        if (optional.isEmpty()) {
            throw new UsernameNotFoundException("User doesn't exist");
        }
        var user = optional.get();
        Collection<SimpleGrantedAuthority> permissions = new ArrayList<>();
        if (user instanceof Admin)
            permissions.add(new SimpleGrantedAuthority("admin"));
        else {
            permissions.add(new SimpleGrantedAuthority("customer"));
        }
        return new AuthenticatedUser(user.getEmail(), user.getPassword(), permissions, user.getId());
    }
}
