package net.java.backend.service;

import net.java.backend.dto.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto create(TaskDto taskDto);
    TaskDto getTaskById(Long taskId);

    List<TaskDto> getAllTask();


    TaskDto updateTask(Long TaskId,TaskDto updateTask);

    void deleteTask(Long TaskId );


}
