import { RiDeleteBin6Line, RiEditLine, RiFileCopyLine } from "@remixicon/react";
import styles from "./assistantsList.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssistantsList = () => {
    const [assistants, setAssistants] = useState([
        {
            id: 1,
            title: "Документация по продукту ProductOne",
        },
        {
            id: 2,
            title: "Документация по продукту ProductOne",
        },
        {
            id: 3,
            title: "Документация по продукту ProductOne",
        },
        {
            id: 4,
            title: "Документация по продукту ProductOne",
        },
    ]);

    const navigate = useNavigate();
    const user = window.sessionStorage.getItem('user');

    const handleCopy = (assistant: any) => {
        const newAssistant = {
            ...assistant,
            id: assistants.length + 1, 
            title: `${assistant.title} (Копия)`,
        };
        setAssistants([...assistants, newAssistant]);
    };

    const handleDelete = (id: number) => {
    };

    return (
        <div className={styles.assistantsList}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.title}>Ассистенты</h1>
                </div>
            </header>

            <div className={styles.list}>
                {assistants.map((assistant) => (
                    <div key={assistant.id} className={styles.card}>
                        <div className={styles.content}>
                            <h2 className={styles.cardTitle}>{assistant.title}</h2>
                        </div>
                        <div className={styles.actions}>
                            <button
                                className={`${styles.iconButton} primary-button`}
                                onClick={() => navigate(`/createAssistant/${assistant.id}`)}
                            >
                                <RiEditLine />
                            </button>
                            <button
                                className={`${styles.iconButton} primary-button`}
                                onClick={() => handleCopy(assistant)}
                            >
                                <RiFileCopyLine />
                            </button>
                            <button
                                className={`${styles.iconButton} primary-button`}
                                onClick={() => handleDelete(assistant.id)}
                            >
                                <RiDeleteBin6Line />
                            </button>
                            <button
                                className={`${styles.testButton} primary-button`}
                                onClick={() => navigate(`/assistantPreview/${assistant.id}`)}
                            >
                                Тестировать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssistantsList;
