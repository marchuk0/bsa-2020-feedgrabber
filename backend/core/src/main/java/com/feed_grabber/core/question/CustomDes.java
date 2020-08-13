package com.feed_grabber.core.question;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.feed_grabber.core.question.dto.QuestionCreateDto;
import com.feed_grabber.core.question.exceptions.QuestionTypeNotExistsException;

import java.io.IOException;
import java.util.UUID;

public class CustomDes extends StdDeserializer<QuestionCreateDto> {
    public CustomDes() {
        this(null);
    }

    public CustomDes(Class<?> vc) {
        super(vc);
    }

    @Override
    public QuestionCreateDto deserialize(JsonParser jp, DeserializationContext ctxt)
            throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);
        // String id = (node.get("questionnaireId")).asText();
        String payload = node.get("details").toString();
        String category = node.get("categoryTitle").asText();
        String typeName = node.get("type").asText();
        QuestionType type = QuestionType
                .fromString(typeName)
                .orElseThrow(() -> new QuestionTypeNotExistsException("This type of question does not exists " + typeName));
        String text = node.get("name").asText();

        return new QuestionCreateDto(text, category, type, payload);

    }
}
