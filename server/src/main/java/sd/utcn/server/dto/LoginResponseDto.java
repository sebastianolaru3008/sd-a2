package sd.utcn.server.dto;

import lombok.Getter;
import lombok.Setter;
import sd.utcn.server.model.User;


@Getter
@Setter
public class LoginResponseDto {
    private String accessToken;
    private UserDto user;
}
