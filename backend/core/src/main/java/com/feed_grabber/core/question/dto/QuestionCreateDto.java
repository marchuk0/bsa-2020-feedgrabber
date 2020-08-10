package com.feed_grabber.core.question.dto;

import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Value
public class QuestionCreateDto {
    @NotBlank
    String text;
    @NotNull
    UUID questionnaireId;
    @NotNull
    UUID categoryId;
}