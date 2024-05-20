package net.java.backend.mapper;
import lombok.extern.slf4j.Slf4j;
import net.java.backend.dto.TaskDto;
import net.java.backend.entity.Task;

@Slf4j
public class TaskMapper {

public static TaskDto mapToTaskDto(Task task){
    return new TaskDto(
            task.getId(),
            task.getName(),
            task.getStatus(),
//            task.getPriority(),
            task.getDescription(),
            task.getCreationDate()  ,
            task.getLastUpdated()

    );

}
public static Task mapToTask(TaskDto taskDto){
    log.info("EmployeeDTO {}", taskDto);
    return new Task(

                 taskDto.getId(),
            taskDto.getName(),
            taskDto.getStatus(),
//            taskDto.getPriority(),
            taskDto.getDescription(),
            taskDto.getCreationDate(),
            taskDto.getLastUpdated()

    );
}
}
