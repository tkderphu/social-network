package viosmash.dal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import viosmash.dal.dataobject.NotifyTemplate;

import java.util.Optional;

public interface NotifyTemplateRepository extends JpaRepository<NotifyTemplate, String> {

}
