package tech.apulog.employeemanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="employee")
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="email")
    private String email;

    @Column(name="job_title")
    private String jobTitle;

    @Column(name="phone_no")
    private String phone;

    @Column(name="image_url")
    private String imageURL;

    @Column(name="employee_code",nullable = false,updatable = false)
    private String employeeCode;


}
