package com.tracker.tracker.models.entities;
import java.time.OffsetDateTime;
import java.util.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Train {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private UUID id;
  private String name;
  private int firstClassCount;
  private int secondClassCount;
  private int thirdClassCount;
  private Boolean deleted =false;
  @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
  @JoinTable(name = "train_stations",
          joinColumns = @JoinColumn(name = "train_id"),
          inverseJoinColumns = @JoinColumn(name = "stations_id"))
  private Set<Station> stations = new HashSet<>();
  @JsonIgnore
  @ManyToOne(cascade = CascadeType.REFRESH)
  private Users createdBy;
  @JsonIgnore
  @ManyToOne(cascade = CascadeType.REFRESH)
  private Users modifiedBy;
  @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE", insertable = true, updatable = false)
  private OffsetDateTime createdTime = OffsetDateTime.now();
  @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE", insertable = true, updatable = true)
  private OffsetDateTime modifiedTime = OffsetDateTime.now();

}
