import { RiDeleteBin6Line, RiEditLine, RiFileCopyLine } from '@remixicon/react';
import styles from './createAssistant.module.css'
import { FormControl, InputLabel, Select, MenuItem, Input, TextField } from '@mui/material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import TestPage from '../assistantPreview/AssistantPreview';

const CreateAssistant = () => {
    const [name, setName] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [openPreview, setOpenPreview] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        console.log(files)
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
    });

    return(
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
                    <button className={`${styles.saveButton} primary-button`}>Сохранить</button>
                </div>
            </header>
            <div className={styles.body}>
                <TextField id="outlined-basic" label="Название ассистента" variant="outlined" />
                <TextField id="outlined-basic" label="Дополнительные инструкции для ассистента" variant="outlined" />
                <div className={styles.inputGroup} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Перетащите файлы сюда или нажмите, чтобы выбрать файлы</p>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={() => setOpenPreview(true)} className={`${styles.testButton} primary-button`}>Тестировать</button>
                {openPreview && <TestPage open={openPreview} setOpen={setOpenPreview}></TestPage>}
            </div>
        </div>
    )
}
export default CreateAssistant;