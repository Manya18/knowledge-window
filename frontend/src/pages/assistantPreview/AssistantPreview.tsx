import { TextField, Button } from "@mui/material";
import styles from "./assistantPreview.module.css";
import { useEffect, useState } from "react";
import { CustomizationType } from "../../types/customatizationType";
import { AssistantInfoType } from "../../types/assistantType";
import { RiCloseLine } from "@remixicon/react";

interface Message {
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}

const TestPage = ({
  open,
  assistantName,
  setOpen,
  isLoad,
}: {
  open?: boolean;
  assistantName: string;
  setOpen?: (open: boolean) => void;
  isLoad?: boolean;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [assistant, setAssistant] = useState<AssistantInfoType>();
  const [customization, setCustomization] = useState<CustomizationType>();

  useEffect(() => {
    if (assistant?.message) {
      const welcomeMessage: Message = {
        text: assistant.message,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
    }
  }, [assistant?.message]);

  useEffect(() => {
    console.log("assistantName", assistantName)
    const token = window.sessionStorage.getItem("token");
    if (isLoad) {
      const response = fetch(
        `http://localhost:8090/api/assistant/${assistantName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data: AssistantInfoType) => {
          setAssistant(data);
          setCustomization(JSON.parse(data.customize));
        })
        .catch((error) => {
          console.error("Не удалось загрузить ассистентов:", error);
        });
    }
    console.log("assista", assistant)

  }, [isLoad]);
  const handleSend = () => {
    if (input.trim()) {
      const userMessage: Message = {
        text: input,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prevMessages) => [...prevMessages, assistantReply]);
          setInput("");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={styles.testWindow}>
      {setOpen && <button className={styles.closeButton} onClick={() => setOpen(false)}>
        <RiCloseLine></RiCloseLine>
      </button>}
      <div className={styles.header} style={{ backgroundColor: customization?.header.bgColor }}>
        {customization?.header.logo && (
          <img
            src={customization.header.logo}
            alt="Логотип"
            className={styles.logo}
            style={{ width: `${customization.header.logoSize}px`, height: `${customization.header.logoSize}px` }}
          />
        )}
        <h2
          className={styles.title}
          style={{
            color: customization?.header.textColor,
            fontSize: `${customization?.header.fontSize}px`,
            fontFamily: customization?.header.fontFamily,
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
            <div className={styles.message} style={{ backgroundColor: `${customization?.dialog.bgColor}`, border: `1px solid ${customization?.dialog.borderColor}` }}>
              <strong style={{ fontSize: `${customization?.dialog.fontSize}px`, color: `${customization?.dialog.textColor}` }}>
                {msg.sender === "user" ? "Вы" : "Ассистент"}
              </strong>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: '15px' }}>
                <span style={{ fontSize: `${customization?.dialog.fontSize}px`, color: `${customization?.dialog.textColor}`, wordBreak: 'break-all' }}>
                  {msg.text}
                </span>
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
        <Button onClick={handleSend} style={{ fontSize: `${customization?.dialog.fontSize}px`, backgroundColor: `${customization?.header.bgColor}`, color: `${customization?.header.textColor}` }}>
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default TestPage;
