package com.home.controller;

import java.util.List;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.home.models.Employees;
import com.home.repositories.EmployeesRepository;

@RestController
@RepositoryRestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/Employees")
public class EmployeesController {

	@Autowired
	private EmployeesRepository repo;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	ResponseEntity<List<Employees>> getAllInfo() {
		List<Employees> Info = repo.getAll();
		return ResponseEntity.ok(Info);
	};

	@RequestMapping(value = "/createEmployee", method = RequestMethod.POST)
	ResponseEntity<String> createEmployee(@RequestBody Employees employee) {
		repo.save(employee);
		return ResponseEntity.ok("");
	};

	@RequestMapping(value = "/markUnemployeed", method = RequestMethod.GET)
	ResponseEntity<String> markUnemployeed(@RequestParam("id") long id) {
		Employees employee = repo.getEmployeeById(id);
		employee.setInactive("Y");
		repo.save(employee);
		return ResponseEntity.ok("");
	};

	@RequestMapping(value = "/getAllEmployeed", method = RequestMethod.GET)
	ResponseEntity<List<Employees>> getAllEmployeed() {
		List<Employees> employeed = repo.getAllEmployeed();
		return ResponseEntity.ok(employeed);
	};

	@RequestMapping(value = "/getAllUnemployeed", method = RequestMethod.GET)
	ResponseEntity<List<Employees>> getAllUnemployeed() {
		List<Employees> employeed = repo.getAllUnemployeed();
		return ResponseEntity.ok(employeed);
	};
}