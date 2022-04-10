package sd.utcn.server.model;

import lombok.Getter;
import org.mindrot.jbcrypt.BCrypt;
import sd.utcn.server.repository.AdminRepository;

import javax.persistence.*;
import java.util.List;

@Table
@Entity
@Getter
public class Admin extends User{

    @OneToMany
    private List<Restaurant> restaurants;

    public void addRestaurant(Restaurant r){
        restaurants.add(r);
    }

    public static void main(String[] args){
        System.out.println(BCrypt.hashpw("1234",BCrypt.gensalt()));
    }
}
