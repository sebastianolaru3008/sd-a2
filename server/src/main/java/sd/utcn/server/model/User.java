package sd.utcn.server.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Table
@Entity(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@ToString
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
    private String passwordHash;

}
