package com.janay.cleanyoutubeapi.user;

import com.janay.cleanyoutubeapi.expections.EmailExistsException;
import com.janay.cleanyoutubeapi.expections.UnauthorizedException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping({ "/", "" })
    public List<UserResponseDTO> getUsers() {
        return this.userService.getUser();
    }

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> registerNewUser(@RequestBody @Valid User user) throws Exception {
        try {
            this.userService.addNewUser(user);
            HashMap<String, String> map = new HashMap<>();
            map.put("message", "User registered successfully");
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        }  catch (EmailExistsException e) {
            throw e;
        } catch (Exception e) {
            throw new Exception("Could not create the user");
        }
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, Object> userMap) throws Exception {
        try {
            String email = (String) userMap.get("email");
            String password = (String) userMap.get("password");
            this.userService.validateUser(email, password);
            Map<String, String> map = new HashMap<>();
            map.put("message", "Logged in successfully");
            return ResponseEntity.ok(map);
        } catch (UnauthorizedException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new Exception("Could not login to the account");
        }
    }
}
