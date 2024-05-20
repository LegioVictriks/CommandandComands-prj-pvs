package net.java.backend.service.impl;

import lombok.AllArgsConstructor;
import net.java.backend.dto.TaskDto;
import net.java.backend.entity.Task;
import net.java.backend.expection.ResourceNotFounExeption;
import net.java.backend.mapper.TaskMapper;
import net.java.backend.repository.TaskRepository;
import net.java.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

private TaskRepository taskRepository;
    @Override
    public TaskDto create(TaskDto taskDto) {
        Task employee = TaskMapper.mapToTask(taskDto);
        employee.setCreationDate(LocalDate.now());
       Task savedEmployee = taskRepository.save(employee);

        return TaskMapper.mapToTaskDto(savedEmployee);
    }

    @Override
    public TaskDto getTaskById(Long taskId) {
       Task task = taskRepository.findById(taskId)
              .orElseThrow(()->new ResourceNotFounExeption("Task is not existed with given id : " + taskId ));
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public List<TaskDto> getAllTask() {
        List<Task> task =  taskRepository.findAll();


        return task.stream().map((Task) ->TaskMapper.mapToTaskDto(Task))
                .collect(Collectors.toList());

    }

    @Override
    public TaskDto updateTask(Long TaskId, TaskDto updateTask) {
        Task task =  taskRepository.findById(TaskId).orElseThrow(
                ()-> new ResourceNotFounExeption("Task is not exist with given id " + TaskId)

        );
        task.setName(updateTask.getName());
        task.setStatus(updateTask.getStatus());
        task.setDescription(updateTask.getDescription());
        task.setLastUpdated(LocalDate.now());
        Task updateTaskObj =   taskRepository.save(task);


        return TaskMapper.mapToTaskDto(updateTaskObj);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFounExeption("Task does not exist with given id " + taskId)
        );
        taskRepository.deleteById(taskId);
    }


}
