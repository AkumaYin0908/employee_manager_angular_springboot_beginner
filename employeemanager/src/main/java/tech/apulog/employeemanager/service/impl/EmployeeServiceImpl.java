package tech.apulog.employeemanager.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.apulog.employeemanager.exception.EmployeeNotFoundException;
import tech.apulog.employeemanager.model.Employee;
import tech.apulog.employeemanager.repository.EmployeeRepository;
import tech.apulog.employeemanager.service.EmployeeService;

import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public Employee findById(Long id) throws EmployeeNotFoundException {
        return employeeRepository.findById(id).orElseThrow(()-> new EmployeeNotFoundException("Employee not found"));
    }

    @Override
    public Employee addEmployee(Employee employee) {
       employee.setEmployeeCode(UUID.randomUUID().toString()); // assigning random employee_code to employee
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
