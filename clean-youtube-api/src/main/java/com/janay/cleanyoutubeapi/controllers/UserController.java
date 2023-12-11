package com.janay.cleanyoutubeapi.controllers;

import com.janay.cleanyoutubeapi.entities.User;
import com.janay.cleanyoutubeapi.expections.EtAuthException;
import com.janay.cleanyoutubeapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return this.userService.getUser();
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerNewUser(@RequestBody User user) {
        try {
            User savedUser = this.userService.addNewUser(user);
            HashMap<String, String> map = new HashMap<>();
            map.put("message", "User registered successfully");
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        }  catch (EtAuthException e) {
            throw e;
        } catch (Exception e) {
            throw new EtAuthException("Could not create the user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, Object> userMap) throws Exception {
        try {
            String username = (String) userMap.get("username");
            String password = (String) userMap.get("password");
            User user = this.userService.validateUser(username, password);
            Map<String, String> map = new HashMap<>();
            map.put("message", "Logged in successfully");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (EtAuthException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new Exception("Could not login to the account");
        }
    }
}
