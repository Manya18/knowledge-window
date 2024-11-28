import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    SelectChangeEvent
} from "@mui/material";
import styles from "./headerCustomization.module.css";
import { HeaderCustomizationType } from "../../types/customatizationType";

const HeaderCustomization = ({options, setOptions}: {options: HeaderCustomizationType, setOptions: (options: HeaderCustomizationType) => void}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue: HeaderCustomizationType = {
            ...options,
            [name]: value,
        }
        console.log(newValue)
        setOptions(newValue);
    };

    const handleFontFamilyChange = (e: SelectChangeEvent<string>) => {
        const fontFamily = e.target.value as string;
        const newValue: HeaderCustomizationType = {
            ...options,
            fontFamily: fontFamily,
        }
        setOptions(newValue);
    };

    return (
        <div className={styles.customization}>
            <TextField
                className={styles.customizationColor}
                id="bg-color"
                label="Цвет фона"
                type="color"
                value={options.bgColor}
                name="bgColor"
                onChange={handleChange}
            />
            <TextField
                className={styles.customizationColor}
                id="text-color"
                label="Цвет текста"
                type="color"
                value={options.textColor}
                name="textColor"
                onChange={handleChange}
            />
            <FormControl className={styles.fontControl}>
                <InputLabel id="font-select-label">Шрифт</InputLabel>
                <Select
                    labelId="font-select-label"
                    value={options.fontFamily}
                    onChange={handleFontFamilyChange}
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
                value={options.fontSize}
                name="fontSize"
                onChange={handleChange}
            />
        </div>
    );
};

export default HeaderCustomization;
