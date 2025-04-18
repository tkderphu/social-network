package viosmash.converter;

import jakarta.persistence.AttributeConverter;

public class JsonObjectConverter implements AttributeConverter<Object, String> {
    @Override
    public String convertToDatabaseColumn(Object attribute) {
        return "";
    }

    @Override
    public Object convertToEntityAttribute(String dbData) {
        return null;
    }
}
