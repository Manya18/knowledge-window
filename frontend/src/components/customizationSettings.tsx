import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import styles from "./customizationSettings.module.css";

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

const CustomizationSettings: React.FC<Сustomization> = ({
    bgColor,
    setBgColor,
    textColor,
    setTextColor,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize
}) => {
    return (
        <div className={styles.customization}>
            <TextField
                className={styles.customizationColor}
                id="bg-color"
                label="Цвет фона"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
            />
            <TextField
                className={styles.customizationColor}
                id="text-color"
                label="Цвет текста"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
            />
            <FormControl className={styles.fontControl}>
                <InputLabel id="font-select-label">Шрифт</InputLabel>
                <Select
                    labelId="font-select-label"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                >
                    <MenuItem value="Arial">Arial</MenuItem>
                    <MenuItem value="Verdana">Verdana</MenuItem>
                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                    <MenuItem value="Georgia">Georgia</MenuItem>
                </Select>
            </FormControl>
            <TextField
                className={styles.fontSizeInput}
                id="font-size"
                label="Размер шрифта"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
            />
        </div>
    );
};

export default CustomizationSettings;
