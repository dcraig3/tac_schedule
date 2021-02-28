package com.home.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.home.models.Employees;

@Repository
public interface EmployeesRepository  extends JpaRepository<Employees, Long> {

    @Query("select d from Employees d")
    public List<Employees> getAll();
    
    @Query("select e from Employees e where e.id = :id")
    public Employees getEmployeeById(long id);

    @Query("select e from Employees e where inactive = 'N'")
    public List<Employees> getAllEmployeed();

    @Query("select e from Employees e where inactive = 'Y'")
    public List<Employees> getAllUnemployeed();
}