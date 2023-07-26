package com.tracker.tracker.models.request;

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
    private int firstClassCount;
    @NotBlank @NotNull @NotEmpty
    private int secondClassCount;
    @NotBlank @NotNull @NotEmpty
    private int thirdClassCount;
    @NotBlank @NotNull @NotEmpty
    private Set<UUID> station;

}
