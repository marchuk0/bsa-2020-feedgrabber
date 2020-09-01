package com.feed_grabber.core.question.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.question.QuestionType;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Index;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Indexed
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Field
    @Column(name = "text", nullable = false, unique = true)
    private String text;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @Field
    @Column
    private String payload;

    @ManyToMany(mappedBy = "questions")
    private List<Questionnaire> questionnaires;

    @IndexedEmbedded(depth=1)
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    private QuestionCategory category;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(name = "is_required")
    @ColumnDefault("false")
    private boolean isRequired;
}
