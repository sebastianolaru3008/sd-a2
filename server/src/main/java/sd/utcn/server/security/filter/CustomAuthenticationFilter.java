package sd.utcn.server.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import sd.utcn.server.dto.LoginUserDto;
import sd.utcn.server.model.AuthenticatedUser;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static sd.utcn.server.security.Constants.*;

@Slf4j
@CrossOrigin("*")
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public  CustomAuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }

    @CrossOrigin("*")
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        LoginUserDto applicationUser = new LoginUserDto(request.getParameter("email"), request.getParameter("password"));
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(applicationUser.getEmail(), applicationUser.getPassword());
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        AuthenticatedUser user = (AuthenticatedUser) authResult.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());
        String access_token = JWT.create()
                .withSubject(user.getUserId())
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION_TIME))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("email", user.getUsername())
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        String refresh_token = JWT.create()
                .withSubject(user.getUserId())
                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_TIME))
                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", access_token);
        tokens.put("refreshToken", refresh_token);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}
