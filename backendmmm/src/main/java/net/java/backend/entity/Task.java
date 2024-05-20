package net.java.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")


public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "task_name")
    private String Name;
    @Column(name = "task_option")
    private String Status;
    @Column(name = "Task_priority")
    private String Description;
     @Column(name= "Creation-Date" )
     private LocalDate CreationDate ;
    @Column(name= "Last-Updaete" )
    private LocalDate LastUpdated;
}
