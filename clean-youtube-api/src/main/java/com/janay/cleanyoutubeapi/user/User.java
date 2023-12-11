package com.janay.cleanyoutubeapi.user;

import com.janay.cleanyoutubeapi.utils.DateFormatter;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @SequenceGenerator(name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "user_sequence")
    private Long id;
    @Column(length = 15)
    @Length(max = 15, message = "First name cannot have more than 15 characters")
    private String firstName;
    @Column(length = 15)
    @Length(max = 15, message = "Last name cannot have more than 15 characters")
    private String lastName;
    @Column(unique = true, nullable = false, length = 150)
    @NotNull(message = "Email cannot be null")
    @Email(message = "The field must be a email format")
    @Length(min = 5, max = 150, message = "Email must contain more than 5 and less than 150 characters")
    private String email;
    @Column(nullable = false)
    @NotNull(message = "Password cannot be null")
    @Length(min = 6, message = "Password cannot have less than 6 characters")
    private String password;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    public User() {}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public User(Long id, String firstName, String lastName, String email, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUpdatedAt() {
        return new DateFormatter().apply(this.updatedAt);
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatedAt() {
        return new DateFormatter().apply(this.createdAt);
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "User {" +
                "id=" + this.id +
                ", fistName='" + this.firstName + '\'' +
                ", lastName='" + this.lastName + '\'' +
                ", email='" + this.email + '\'' +
                ", updatedAt=" + this.updatedAt +
                ", createdAt=" + this.createdAt +
                '}';
    }

}
