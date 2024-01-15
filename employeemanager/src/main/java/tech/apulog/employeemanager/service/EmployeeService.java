package tech.apulog.employeemanager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.apulog.employeemanager.exception.EmployeeNotFoundException;
import tech.apulog.employeemanager.model.Employee;
import tech.apulog.employeemanager.repository.EmployeeRepository;

import java.util.List;


public interface EmployeeService {

    public Employee findById(Long id) throws EmployeeNotFoundException;

    public Employee addEmployee(Employee employee);

    public List<Employee> findAllEmployees();

    public Employee updateEmployee(Employee employee);

    public void deleteEmployee(Long id);

}
