package knowledge.window.mapper;

import org.springframework.stereotype.Component;

import knowledge.window.dto.request.RegistrationRequest;
import knowledge.window.dto.response.UserInfoResponse;
import knowledge.window.entity.User;

@Component
public class UserMapper {

    public User toEntity(RegistrationRequest registrationRequest) {
        if (registrationRequest == null) {
            return null;
        }

        User user = new User();
        user.setSurname(registrationRequest.surname());
        user.setFirstName(registrationRequest.firstName());
        user.setUsername(registrationRequest.username());
        user.setPassword(registrationRequest.password());
        user.setEmail(registrationRequest.email());
        return user;
    }

    public UserInfoResponse toDto(User user) {
        if (user == null) {
            return null;
        }

        return UserInfoResponse.builder()
                .firstName(user.getFirstName())
                .surname(user.getSurname())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}
