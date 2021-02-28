package com.home.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.home.models.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("select s from Schedule s")
    public List<Schedule> getAll();

    @Query("select s from Schedule s where s.startTime between :startDate and :endDate")
    public List<Schedule> getWeekSchedule(Date startDate, Date endDate);

    @Query("select s from Schedule s where s.employeeId = :id and s.startTime between cast(:startDate as timestamp) and cast(:endDate as timestamp)")
    public List<Schedule> getWeekScheduleByEmployee(String startDate, String endDate, long id);
}