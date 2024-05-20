package net.java.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString


public class TaskDto {
private Long id ;
private String Name;
private String Status;
//private String Priority;
private String Description;
private LocalDate CreationDate ;
private LocalDate LastUpdated;

//    public TaskDto(Long id, String name, String status, String description, LocalDate creationDate, LocalDate lastUpdated) {
//    }
}
