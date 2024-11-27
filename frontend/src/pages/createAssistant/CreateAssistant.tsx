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
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import TestPage from "../assistantPreview/AssistantPreview";
import CustomizationSettings from "../../components/customizationSettings";

interface Сustomization {
    bgColor: string;
    setBgColor: (value: string) => void;
    textColor: string;
    setTextColor: (value: string) => void;
    fontFamily: string;
    setFontFamily: (value: string) => void;
    fontSize: number;
    setFontSize: (value: number) => void;
}

const CreateAssistant = () => {

    // const [customization, setСustomization] = useState<Сustomization>({
    //     bgColor: "",
    //     textColor: "",    
    //     fontFamily: "",
    //     fontSize: 0
    //   });

    const [name, setName] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [helloMessage, setHelloMessage] = useState("");
    const [logo, setLogo] = useState<string | null>(null);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [textColor, setTextColor] = useState("#000000");
    const [fontFamily, setFontFamily] = useState("Arial");
    const [fontSize, setFontSize] = useState(16);
    const [logoSize, setLogoSize] = useState(100);

    const [link, setLink] = useState("");

    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    const onLogoDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result as string);
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
        formData.append("customize", " 1");

        try {
            const response = await fetch('http://localhost:8080/api/file/upload', {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };


    return (
        <div className={styles.createAssistant}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.title}>Заголовок</h1>
                    <button className={`${styles.editTitleButton}`}>
                        <RiEditLine></RiEditLine>
                    </button>
                </div>
                <div className={styles.actionButtons}>
                    <button className={`${styles.iconButton} primary-button`}>
                        <RiFileCopyLine size={24}></RiFileCopyLine>
                    </button>
                    <button className={`${styles.iconButton} primary-button`}>
                        <RiDeleteBin6Line size={24}></RiDeleteBin6Line>
                    </button>
                    <button
                        className={`${styles.saveButton} primary-button`}
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
                    <CustomizationSettings
                        bgColor={bgColor}
                        setBgColor={setBgColor}
                        textColor={textColor}
                        setTextColor={setTextColor}
                        fontFamily={fontFamily}
                        setFontFamily={setFontFamily}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                    />

                </div>
    
                <TextField
                    className={styles.logoSizeInput}
                    id="logo-size"
                    label="Размер логотипа"
                    type="number"
                    value={logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                />

                <div {...getLogoProps()} className={styles.logoUpload}>
                    <input {...getLogoInputProps()} />
                    <p>Перетащите логотип сюда или нажмите, чтобы выбрать файл</p>
                    {logo && (
                        <img
                            src={logo}
                            alt="Логотип"
                            className={styles.logoPreview}
                        />
                    )}

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
                        helloMessage={helloMessage}
                        bgColor={bgColor}
                        textColor={textColor}
                        logo={logo}
                        fontFamily={fontFamily}
                        fontSize={fontSize}
                        logoSize={logoSize}
                    ></TestPage>
                )}
            </div>
        </div>
    );
};

export default CreateAssistant;
