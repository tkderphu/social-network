CREATE TABLE galleries (
    id  VARCHAR(255) NOT NULL PRIMARY KEY,
    type VARCHAR(255),
    type_id VARCHAR(255)
);

CREATE TABLE medias (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    url VARCHAR(255),
    gallery_id VARCHAR(255),
    media_type VARCHAR(255),
    created_date TIMESTAMP
);

CREATE TABLE uploadedmedia (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    resource_type VARCHAR(10) NOT NULL,
    url VARCHAR(255) NOT NULL
)
