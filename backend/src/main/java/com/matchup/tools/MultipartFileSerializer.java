package com.matchup.tools;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

public class MultipartFileSerializer extends JsonSerializer<MultipartFile> {

    @Override
    public void serialize(MultipartFile file, JsonGenerator gen, SerializerProvider serializers)
            throws IOException {
        gen.writeStartObject();
        gen.writeStringField("fileName", file.getOriginalFilename());
        gen.writeStringField("contentType", file.getContentType());
        gen.writeStringField("content", Base64.getEncoder().encodeToString(file.getBytes()));
        gen.writeEndObject();
    }
}

