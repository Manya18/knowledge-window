import { RiDeleteBin6Line, RiEditLine, RiFileCopyLine } from "@remixicon/react";
import styles from "./createAssistant.module.css";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import TestPage from "../assistantPreview/AssistantPreview";
import Layout from "../../components/layout/Layout";
import CustomizationSettings from "../../components/headerCustomization/HeaderCustomization";
import { CustomizationType, DialogCustomizationType, HeaderCustomizationType } from "../../types/customatizationType";
import DialogCustomization from "../../components/dialogCustomization/DialogCustomization";
import IframeWrapper from "../iframeWrapper/IframeWrapper";

const CreateAssistant = () => {
    const token = window.sessionStorage.getItem('token');

    const [customizationHeader, setCustomizationHeader] = useState<HeaderCustomizationType>({
        bgColor: "#ffffff",
        textColor: "#000000",
        fontFamily: "Arial",
        fontSize: 16,
        logo: null,
        logoSize: null
    });
    const [dialogCustomization, setDialogCustomization] = useState<DialogCustomizationType>({
        bgColor: "#ffffff",
        textColor: "#000000",
        messageBg: '#ffffff',
        borderColor: "#000000",
        fontFamily: "Arial",
        fontSize: 16,
    });
    const [style, setStyle] = useState<CustomizationType>({
        header: customizationHeader,
        dialog: dialogCustomization
    })

    const [name, setName] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [helloMessage, setHelloMessage] = useState("");
    const [iframeUrl, setIframeUrl] = useState<string>('http://localhost:3000/assistantPreview');
    const [link, setLink] = useState("");

    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    useEffect(() => {
        setStyle({
            header: customizationHeader,
            dialog: dialogCustomization
        })
    }, [customizationHeader, dialogCustomization]);

        const onLogoDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setCustomizationHeader({...customizationHeader, logo: reader.result as string});
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps: getLogoProps, getInputProps: getLogoInputProps } =
        useDropzone({
            onDrop: onLogoDrop,
            accept: {
                "image/*": [],
            },
            multiple: false,
        });

    const handleSave = async () => {
        setOpenPreview(true);
        const formData = new FormData();
        formData.append("assistantName", name);
        formData.append("link", link);
        files.forEach(file => formData.append("files", file));
        formData.append("message", helloMessage);
        const styles = {
            header: customizationHeader,
            dialog: dialogCustomization
        }
        formData.append("customize", JSON.stringify(styles));
        try {
            const response = await fetch(`http://localhost:8090/api/file/upload`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                method: 'POST',
                body: formData,
            });
            window.localStorage.setItem('assistant', name);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const handleGetIframeLink = () => {
        console.log('iframe', iframeUrl)
      };

    return (
        <Layout>
            <div className={styles.createAssistant}>
                <header className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Создание</h1>
                    </div>
                    <div className={styles.actionButtons}>
                        <button className={`${styles.iconButton} primary-button`}>
                            <RiDeleteBin6Line size={24}></RiDeleteBin6Line>
                        </button>
                        <button
                            className={`${styles.saveButton} primary-button`}
                            onClick={handleGetIframeLink}
                        >
                            Сохранить
                        </button>
                    </div>
                </header>
                <div className={styles.body}>
                    <TextField
                        id="outlined-basic"
                        label="Название ассистента"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Приветственное сообщение"
                        variant="outlined"
                        value={helloMessage}
                        onChange={(e) => setHelloMessage(e.target.value)}

                    />
                    <TextField
                        id="outlined-link"
                        label="Укажите ссылку на базу знаний"
                        variant="outlined"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <div className={styles.inputGroup} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Перетащите файлы сюда или нажмите, чтобы выбрать файлы</p>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.customization}>
                        <h2 className={styles.customizationTitle}>Кастомизация</h2>
                        <div className={styles.customizationWrapper}>
                            <div className={styles.headerCust}>
                                <h3 className={styles.headerCustTitle}>Кастомизация шапки</h3>
                                <div className={styles.customizationLeft}>
                                    <CustomizationSettings options={customizationHeader} setOptions={setCustomizationHeader} />
                                    <div className={styles.logoActions}>
                                        <TextField
                                            className={styles.logoSizeInput}
                                            id="logo-size"
                                            label="Размер логотипа"
                                            type="number"
                                            value={customizationHeader.logoSize}
                                            onChange={(e) => setCustomizationHeader({...customizationHeader, logoSize: e.target.value})}
                                        />
                                        <div {...getLogoProps()} className={styles.logoUpload}>
                                            <input {...getLogoInputProps()} />
                                            <p>Добавьте логотип</p>
                                            {customizationHeader.logo && (
                                                <img
                                                    src={customizationHeader.logo}
                                                    alt="Логотип"
                                                    className={styles.logoPreview}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.dialogCust}>
                                <h3 className={styles.headerCustTitle}>Кастомизация диалога</h3>
                                <DialogCustomization options={dialogCustomization} setOptions={setDialogCustomization} />
                            </div>
                        </div>
                    </div>
                    <button
                        className={`${styles.testButton} primary-button`}
                        onClick={handleSave}
                    >
                        Сохранить
                    </button>
                    {openPreview && (
                        <TestPage
                            open={openPreview}
                            assistantName={name}
                            setOpen={setOpenPreview}
                        ></TestPage>
                    )}
                </div>
            </div>
            <IframeWrapper src={iframeUrl} title={name} width="100%" height="100%"/>
        </Layout>
    );
};

export default CreateAssistant;
