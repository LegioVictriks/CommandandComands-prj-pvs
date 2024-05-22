package net.java.backend.controller;

import lombok.extern.slf4j.Slf4j;
import net.java.backend.dto.TaskDto;
import net.java.backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/useremail/employees")
public class TaskConroller {
    private TaskService taskService;

    public TaskConroller(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        log.info("Controller: {}", taskDto);
        TaskDto savedTask = taskService.create(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId) {
        TaskDto taskDto = taskService.getTaskById(taskId);
        return ResponseEntity.ok(taskDto);
    }

    @GetMapping
    public  ResponseEntity<List<TaskDto>> getAllTask(){

       List<TaskDto>  task =taskService.getAllTask();
    log.info("Get: {}", task);
return ResponseEntity.ok(task);
    }

    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId,
                                              @RequestBody TaskDto updateTask) {
        TaskDto taskDto = taskService.updateTask(taskId, updateTask);
        return ResponseEntity.ok(taskDto);
    }

    @DeleteMapping("{id}")
    public  ResponseEntity <String> deleteTask(@PathVariable("id") Long TaskId ){
taskService.deleteTask(TaskId);
return ResponseEntity.ok("Task delete successfully ");
    };
}
