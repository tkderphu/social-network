package viosmash.config;

import org.neo4j.driver.Config;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.harness.Neo4j;
import org.neo4j.harness.Neo4jBuilders;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class EmbeddedNeo4jConfig {

    @Bean(destroyMethod = "close")
    public Neo4j embeddedDriver() {
        return Neo4jBuilders.newInProcessBuilder()
                .withDisabledServer() // we don’t need Bolt server
                .build();
    }
    @Bean
    public org.neo4j.driver.Driver driver(Neo4j embeddedDatabaseServer) {
        return GraphDatabase.driver(
                embeddedDatabaseServer.boltURI(),
                Config.builder().withoutEncryption().build()
        );
    }
}
