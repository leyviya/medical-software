package yconsoft.repository;

import org.springframework.data.repository.CrudRepository;
import yconsoft.entities.LoginSessionEntity;

public interface LoginSessionRepository extends CrudRepository<LoginSessionEntity, Integer> {
    LoginSessionEntity findBySessionToken(String sessionToken);
    LoginSessionEntity findByUserId(Integer userId);
}
