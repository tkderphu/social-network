package viosmash.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.core.convert.converter.ConverterFactory;

import java.util.List;
@Converter
public class JsonListConverter implements AttributeConverter<List<Object>, String> {
    @Override
    public String convertToDatabaseColumn(List<Object> attribute) {
        return "";
    }

    @Override
    public List<Object> convertToEntityAttribute(String dbData) {
        return List.of();
    }
}
