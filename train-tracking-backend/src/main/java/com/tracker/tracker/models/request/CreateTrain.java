package com.tracker.tracker.models.request;

import com.tracker.tracker.models.entities.Class;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

@Data
public class CreateTrain {
    private UUID id;
    @NotBlank
    @NotNull
    @NotEmpty
    private String name;
    @NotBlank @NotNull @NotEmpty
    private Class train_class;
    @NotBlank @NotNull @NotEmpty
    private Set<UUID> station;

}
