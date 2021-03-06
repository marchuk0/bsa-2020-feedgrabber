package com.feed_grabber.core.question;

import com.feed_grabber.core.question.dto.*;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public abstract class QuestionMapper {
    public static QuestionMapper MAPPER = Mappers.getMapper(QuestionMapper.class);

    @Mapping(source = "category.title", target = "categoryTitle")
    @Mapping(source = "text", target = "name")
    @Mapping(source = "payload", target = "details")
    @Mapping(target = "index", ignore = true)
    public abstract QuestionDto questionToQuestionDto(Question question);

    @Mapping(source = "question.category.title", target = "categoryTitle")
    @Mapping(source = "question.text", target = "name")
    @Mapping(source = "question.payload", target = "details")
    public abstract QuestionDto questionToQuestionDtoIndexed(Question question, Integer index);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "category", target = "category")
    @Mapping(source = "createDto.name", target = "text")
    @Mapping(target = "company", source = "questionnaire.company")
    @Mapping(target = "payload", source = "createDto.details")
    @Mapping(target = "sections", ignore = true)
    public abstract Question questionCreateDtoToModel(
            QuestionCreateDto createDto,
            Questionnaire questionnaire,
            QuestionCategory category
    );

    @Mapping(target = "questionnaireId", ignore = true)
    @Mapping(target = "sectionId", ignore = true)
    public abstract QuestionCreateDto upsertDtoToCreateDto(QuestionUpsertDto dto);

    public abstract QuestionUpdateDto upsertDtoToUpdateDto(QuestionUpsertDto dto);
}
