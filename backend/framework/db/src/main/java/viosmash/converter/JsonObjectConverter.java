package viosmash.converter;

import jakarta.persistence.AttributeConverter;
import viosmash.json.JsonUtils;
import viosmash.string.StringUtils;

public class JsonObjectConverter implements AttributeConverter<Object, String> {
    @Override
    public String convertToDatabaseColumn(Object attribute) {
        if(attribute == null) return "";
        return JsonUtils.toStringJson(attribute);
    }

    @Override
    public Object convertToEntityAttribute(String dbData) {
        if(StringUtils.isEmpty(dbData)) return null;
        return JsonUtils.toObject(dbData, Object.class);
    }
}
