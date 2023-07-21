package com.tracker.tracker.models.response;

import com.tracker.tracker.models.json.IdWithName;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class TrainGetResponse {
    private UUID id;
    private String name;
    private String trainClass;
    private Set<IdWithName> stations;
}
