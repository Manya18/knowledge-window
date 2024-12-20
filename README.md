# knowledge-window

## Описание

Проект позволяет пользователям загружать свою базу знаний в различных форматах, таких как текстовые документы и ссылки. После загрузки базы знаний пользователь может протестировать работу ассистента, обученного на базе знаний. Пользователь может легко интегрировать чат с ассистентом в свой сайт, используя сгенерированный iframe.
Кроме того, проект предлагает широкие возможности кастомизации, что позволяет адаптировать базу знаний под уникальные потребности и предпочтения.

Этот проект состоит из серверной части, клиентского приложения и языковой модели. Следуйте инструкциям ниже, чтобы настроить и запустить все части приложения.

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/Manya18/knowledge-window
cd your-repo-name
2. Установка зависимостей
```

## Клиентская часть (Frontend)

### Инструкции по настройке

1. **Перейдите в папку клиентской части**
   ```bash
   cd frontend
   ```
2. **Установите дополнительные зависимости**
   ```bash
   npm install
   ```
3. **Запустите клиентскую часть**
   ```bash
   npm start
   ```

## Серверная часть (Backend)
Для запуска серверной части в корневой папке проекта выполните команду
```bash
docker-compose up
```
В контейнере Ollama в панели Exec выполнить скрипт
```bash
 ollama run llama3.2
```
## Использование
1. Открыть приложение в браузере
2. Пройти авторизацию или регистрацию
3. Для создания нового чата нажать кнопку **Создать** в боковом меню:
    1. **Параметры ассистента**:
        * **Название ассистента*** - имя, которое будет отображаться в шапке чата (фото)
        * **Приветственное сообщение** - сообщение, которое отображается при первом взаимодействии с чатом (фото)
        * **Ссылка на базу знаний** - использование данных сайта как базы знаний (url)
        * **Загрузка файлов** - позволяет импортировать базы знаний в форматах **txt**, **pdf**, **docx**
    2. **Кастомизация шапки**:
        (фото)
    3. **Кастомизация диалога**:
       (фото)
    4. Окно предпросмотра отображает чат с настроенным стилем
    5. Для сохранения чата с базой знаний нажать кнопку **Сохранить**
    6. Для получения iframe нажать кнопку **Получить iframe**
4. Для просмотра всех созданных пользователем ассистентов нажать **Ассистенты** в боковом меню:
    1. Для повторного тестирования ассистента нажать **Тестировать**
    2. Для удаление ассистента нажать кнопку корзины