package com.home.controller;

import java.util.List;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.home.models.Schedule;
import com.home.repositories.EmployeesRepository;
import com.home.repositories.ScheduleRepository;

@RestController
@RepositoryRestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/Schedule")
public class ScheduleController {

	@Autowired
	private ScheduleRepository repo;

	@Autowired
	private EmployeesRepository employeeRepo;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	ResponseEntity<List<Schedule>> getAllInfo() {
		List<Schedule> Info = repo.getAll();
		return ResponseEntity.ok(Info);
	};

	@RequestMapping(value = "/createSchedule", method = RequestMethod.POST)
	ResponseEntity<String> createSchedule(@RequestBody Schedule schedule) {
		if (employeeRepo.getEmployeeById(schedule.getEmployeeId()) != null) {
			repo.save(schedule);
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.ok("Employee does not exist");
		}
	};

	// @RequestMapping(value = "/uploadItem", method = RequestMethod.POST)
	// ResponseEntity<Item> uploadItem(@RequestBody Item item) {
	// 	repo.save(item);
	// 	return ResponseEntity.ok(item);
	// }

	@RequestMapping(value = "/updateSchedule", method = RequestMethod.POST)
	ResponseEntity<Schedule> updateSchedule(@RequestBody Schedule schedule) {
		repo.save(schedule);
		return ResponseEntity.ok(schedule);
	};

	@RequestMapping(value = "/removeFromSchedule", method = RequestMethod.DELETE)
	ResponseEntity<String> removeFromSchedule(@RequestParam("id") long id) {
		repo.deleteById(id);
		return ResponseEntity.ok("");
	};

	@RequestMapping(value = "/getByWeek", method = RequestMethod.GET)
	ResponseEntity<List<Schedule>> getByWeek(@RequestParam("startDate") Date startDate,
			@RequestParam("endDate") Date endDate) {
		List<Schedule> scheduleWeek = repo.getWeekSchedule(startDate, endDate);
		return ResponseEntity.ok(scheduleWeek);
	};

	@RequestMapping(value = "/getByWeekByEmployee", method = RequestMethod.GET)
	ResponseEntity<List<Schedule>> getByWeekByEmployee(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate, @RequestParam("id") long id) {
		List<Schedule> scheduleWeek = repo.getWeekScheduleByEmployee(startDate, endDate, id);
		return ResponseEntity.ok(scheduleWeek);
	};
}