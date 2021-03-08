package com.home.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.home.models.Employees;

@Repository
public interface EmployeesRepository  extends JpaRepository<Employees, Long> {

    @Query("select e from Employees e ORDER BY UPPER(e.name) ASC")
    public List<Employees> getAll();
    
    @Query("select e from Employees e where e.id = :id ORDER BY UPPER(e.name) ASC")
    public Employees getEmployeeById(long id);

    @Query("select e from Employees e where inactive = 'N' ORDER BY UPPER(e.name) ASC")
    public List<Employees> getAllEmployeed();

    @Query("select e from Employees e where inactive = 'Y' ORDER BY UPPER(e.name) ASC")
    public List<Employees> getAllUnemployeed();
}