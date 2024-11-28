import { RiDeleteBin6Line, RiEditLine, RiFileCopyLine } from "@remixicon/react";
import styles from "./assistantsList.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { UUID } from "crypto";

interface Assistant {
    id: UUID;
    name: string;
}

const AssistantsList: React.FC = () => {
    const [assistants, setAssistants] = useState<Assistant[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const user = window.sessionStorage.getItem('user');
    const token = window.sessionStorage.getItem('token');

    useEffect(() => {
        if (user && token) {

            const response = fetch(`http://localhost:8080/api/assistant/all?userName=${user}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Ошибка: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data: Assistant[]) => {
                    setAssistants(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Не удалось загрузить ассистентов:", error);
                    setIsLoading(false);
                });
        } else {
            console.error("ID пользователя не найден в sessionStorage.");
        }
    }, []);

    const handleCopy = (assistant: any) => {
        const newAssistant = {
            ...assistant,
            id: assistants.length + 1,
            title: `${assistant.title} (Копия)`,
        };
        setAssistants([...assistants, newAssistant]);
    };


    const handleDelete = (id: UUID) => {
    };

    return (
        <Layout>
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
                                <h2 className={styles.cardTitle}>{assistant.name}</h2>
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
        </Layout >
    );
};

export default AssistantsList;
