package sd.utcn.server.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table
@Entity(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@ToString
@NoArgsConstructor
@Getter
@Setter
public abstract class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(
            name = "id"
    )

    private String id;
    private String email;
    private String password;

    public User(String email, String passwordHash) {
        this.email = email;
        this.password = passwordHash;
    }

    public User(String id) {
        this.id = id;
    }

}
