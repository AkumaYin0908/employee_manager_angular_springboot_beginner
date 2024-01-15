package tech.apulog.employeemanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.apulog.employeemanager.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    //void deleteEmployeeById(Long id); //this is a query method, in which JPA is able to understand the method name and create a query from it.

}
