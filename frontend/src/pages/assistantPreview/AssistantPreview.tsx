import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import styles from "./assistantPreview.module.css";
import { useState } from "react";

interface Message {
  text: string;
  sender: "user" | "assistant";
}

const TestPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      })
        .then((response) => response.json())
        .then((data) => 
        {
            const assistantReply: Message = {
                text: data,
                sender: "assistant",
              };
              setMessages((prevMessages) => [...prevMessages, assistantReply]);
        
              setInput("");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={styles.testWindow}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ассистент 1</h2>
      </div>
      <div className={styles.chatBody}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
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
        <Button onClick={handleSend}>Отправить</Button>
      </div>
    </div>
  );
};

export default TestPage;
