package viosmash.converter;

import jakarta.persistence.AttributeConverter;
import viosmash.json.JsonUtils;
import viosmash.string.StringUtils;

import java.util.Map;

public class JsonMapConverter implements AttributeConverter<Map<Object, Object>, String> {

    @Override
    public String convertToDatabaseColumn(Map<Object, Object> attribute) {
        if(attribute == null) return "";
        return JsonUtils.toStringJson(attribute);
    }

    @Override
    public Map<Object, Object> convertToEntityAttribute(String dbData) {
        if(StringUtils.isEmpty(dbData)) return null;
        return JsonUtils.toObject(dbData, Map.class);
    }

}
