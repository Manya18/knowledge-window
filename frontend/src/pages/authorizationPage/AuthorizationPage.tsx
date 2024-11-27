import { TextField } from "@mui/material";
import styles from "./authorizationPage.module.css";
import { useState } from "react";

const AuthorizationPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const auth = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: login, password: password }),
      });
      if (response.ok) {
        window.sessionStorage.setItem('user', login);
        window.location.href = "/assistantsList";
      }
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
    }
  };

  return (
    <div className={styles.authorizationPage}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Вход в систему</h1>
        <TextField
          className={styles.input}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          label="Логин"
          variant="outlined"
          fullWidth
        ></TextField>
        <TextField
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Пароль"
          variant="outlined"
          fullWidth
        ></TextField>
        <button className={`${styles.button} primary-button`} onClick={auth}>
          Авторизоваться
        </button>
        <div className={styles.linkWrapper}>
          У вас нет учетной записи?{" "}
          <a href="/registration">Зарегистрироваться</a>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationPage;
