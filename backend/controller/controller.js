const db = require('../db');

class Controller {
    async uploadFiles(req, res) {
        try {
            res.status(200).json({ message: 'Файлы загружены успешно' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при загрузке файлов' });
        }
    }
}

module.exports = new Controller();