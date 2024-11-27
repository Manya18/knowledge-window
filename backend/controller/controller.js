const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

class Controller {
    async uploadFiles(req, res) {
        try {
            const { assistantName, link } = req.body;
            const dir = path.join(__dirname, '../files', assistantName);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    console.log(`Файл загружен: ${file.originalname}`);
                });
            }

            if (link) {
                try {
                    const response = await axios.get(link);
                    const content = response.data;

                    let fileName = new URL(link).pathname.split('/').pop() || 'link-content';
                    fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

                    const uniqueHash = crypto.createHash('md5').update(link).digest('hex').slice(0, 8);
                    fileName = `${fileName}_${uniqueHash}.txt`;

                    const filePath = path.join(dir, fileName);
                    fs.writeFileSync(filePath, content, 'utf-8');
                    console.log(`Данные из ссылки сохранены в файл: ${filePath}`);
                } catch (error) {
                    console.error(`Ошибка при обработке ссылки: ${error.message}`);
                    return res.status(400).json({ message: 'Ошибка при обработке ссылки' });
                }
            }

            res.status(200).json({ message: 'Файлы и данные обработаны успешно' });
        } catch (error) {
            console.error('Ошибка при загрузке файлов:', error);
            res.status(500).json({ message: 'Ошибка при загрузке файлов' });
        }
    }
}

module.exports = new Controller();
