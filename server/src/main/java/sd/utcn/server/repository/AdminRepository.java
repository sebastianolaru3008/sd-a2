package sd.utcn.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sd.utcn.server.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
}
