import { Input, TextField } from "@mui/material";
import styles from "./registrationPage.module.css";
import { useState } from "react";

interface registrationInfo {
  firstName: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

const RegistrationPage = () => {
  const [userInfo, setUserInfo] = useState<registrationInfo>({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const registration = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/registration", {
          method: "POST",
          body: JSON.stringify(userInfo),
        });
        if(response.ok) window.location.href = '/';
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
      }
  };

  return (
    <div className={styles.registrationPage}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Создать учетную запись</h1>
        <TextField
          className={styles.input}
          onChange={handleChange}
          value={userInfo.firstName}
          name="firstName"
          label="Имя"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <TextField
          className={styles.input}
          onChange={handleChange}
          value={userInfo.surname}
          name="surname"
          label="Фамилия"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <TextField
          className={styles.input}
          onChange={handleChange}
          value={userInfo.email}
          name="email"
          label="Email"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <TextField
          className={styles.input}
          onChange={handleChange}
          value={userInfo.username}
          name="username"
          label="Логин"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <TextField
          className={styles.input}
          onChange={handleChange}
          value={userInfo.password}
          name="password"
          label="Пароль"
          variant="outlined"
          type="password"
          required
          fullWidth
        ></TextField>
        {/* <TextField
          className={styles.input}
          onChange={handleChange}
          value={userInfo.password}
          label="Повторите пароль"
          variant="outlined"
          type="password"
          required
          fullWidth
        ></TextField> */}
        <button onClick={registration} className={`${styles.button} primary-button`}>
          Зарегистрироваться
        </button>
        <div className={styles.linkWrapper}>
          Уже есть учетная запись? <a href="/auth">Войти</a>
        </div>
      </div>
    </div>
  );
};
export default RegistrationPage;
