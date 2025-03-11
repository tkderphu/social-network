package viosmash.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import viosmash.nodes.User;

public interface UserRepository extends Neo4jRepository<User, Long> {
}
