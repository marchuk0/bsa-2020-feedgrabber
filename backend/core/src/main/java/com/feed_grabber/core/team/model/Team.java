package com.feed_grabber.core.team.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.user.model.User;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Index;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.hibernate.search.annotations.IndexedEmbedded.DEFAULT_NULL_TOKEN;

@Indexed
@Data
@Entity
@Table(name = "teams")
public class Team {
    public Team(String name, Company company) {
        this.name = name;
        this.company = company;
    }
    public Team() {
    }
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Field
    @Analyzer(definition = "autocompleteEdgeAnalyzer")
    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @IndexedEmbedded(depth = 2, includeEmbeddedObjectId = true)
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id")
    private User lead;

    @IndexedEmbedded(depth = 2, includeEmbeddedObjectId = true, indexNullAs = DEFAULT_NULL_TOKEN)
    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(
            name = "users_teams",
            joinColumns = {@JoinColumn(name = "team_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private List<User> users = new ArrayList<>();

}
