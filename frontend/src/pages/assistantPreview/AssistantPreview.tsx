import {
  TextField,
  Button,
} from "@mui/material";
import styles from "./assistantPreview.module.css";
import { useEffect, useState } from "react";

interface Message {
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}

const TestPage = ({
  open,
  assistantName,
  setOpen,
  helloMessage,
  bgColor,
  textColor,
  logo,
  fontFamily,
  fontSize,
  logoSize
}: {
  open: boolean;
  assistantName: string;
  setOpen: (open: boolean) => void;
  helloMessage: string;
  bgColor: string;
  textColor: string;
  logo: string | null;
  fontFamily: string;
  fontSize: number;
  logoSize: number | null;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (helloMessage) {
      const welcomeMessage: Message = {
        text: helloMessage,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
    }
  }, [helloMessage]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage: Message = {
        text: input,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          assistantName: assistantName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const assistantReply: Message = {
            text: data.response,
            sender: "assistant",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prevMessages) => [...prevMessages, assistantReply]);
          setInput("");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={styles.testWindow}>
      <div className={styles.header} style={{ backgroundColor: bgColor }}>
        {logo && (
          <img
            src={logo}
            alt="Логотип"
            className={styles.logo}
            style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
          />
        )}
        <h2
          className={styles.title}
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
          }}
        >
          {assistantName}
        </h2>
      </div>

      <div className={styles.chatBody}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? styles.user : styles.assistant}
          >
            <div className={styles.message}>
              <strong style={{ fontSize: `${fontSize}px` }}>
                {msg.sender === "user" ? "Вы" : "Ассистент"}
              </strong>
              <div style={{ display: "flex" }}>
                <div style={{ fontSize: `${fontSize}px` }}>{msg.text}</div>
                <div className={styles.timestamp}>{msg.timestamp}</div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className={styles.chatInput}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          label="Ваше сообщение"
          fullWidth
        />
        <Button onClick={handleSend} variant="contained" color="primary">
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default TestPage;
