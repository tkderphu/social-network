package viosmash.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import viosmash.json.JsonUtils;

import java.util.List;
import java.util.Set;

@Converter
public class JsonSetConverter implements AttributeConverter<Set<Object>, String> {
    @Override
    public String convertToDatabaseColumn(Set<Object> attribute) {
        return JsonUtils.toStringJson(attribute);
    }

    @Override
    public Set<Object> convertToEntityAttribute(String dbData) {
        return JsonUtils.toObject(dbData, Set.class);
    }
}
