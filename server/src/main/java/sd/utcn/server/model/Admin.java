package sd.utcn.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import sd.utcn.server.repository.AdminRepository;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Admin extends User{

    @OneToMany
    private List<Restaurant> restaurants;

    public Admin(String id, List<Restaurant> restaurants){
        super(id);
        this.restaurants = restaurants;
    }

    public void addRestaurant(Restaurant r){
        restaurants.add(r);
    }

    public static void main(String[] args){
        System.out.println(BCrypt.hashpw("1234",BCrypt.gensalt()));
    }
}
