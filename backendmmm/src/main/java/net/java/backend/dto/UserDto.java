package net.java.backend.dto;

import java.util.List;

public class UserDto {
    private String email;
    private String password;
    private List<TaskDto> employees;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<TaskDto> getEmployees() {
        return employees;
    }

    public void setEmployees(List<TaskDto> employees) {
        this.employees = employees;
    }
}