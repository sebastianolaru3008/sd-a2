package sd.utcn.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sd.utcn.server.dto.LoginUserDto;
import sd.utcn.server.dto.UserDto;
import sd.utcn.server.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<UserDto> loginCustomer(@RequestBody LoginUserDto customer) {
        try {
            UserDto dto = userService.login(customer);
            System.out.println(dto.getEmail());
            return new ResponseEntity<UserDto>(dto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
