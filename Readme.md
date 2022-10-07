# Личный проект «Что посмотреть»

* Студент: [Евгений Потапов](https://up.htmlacademy.ru/nodejs-api/2/user/1313957).
* Наставник: [Владимир Якушкин](https://htmlacademy.ru/profile/id126208).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

### 5. Запуск проекта

> Перед запуском проекта выполнить сценарий для установки пакетов:
> `npm install`

- Создать в корне проекта файл `.env` и задать в нём переменные окружения:

  - `DB_HOST` — домен подключения к БД
  - `PORT` — порт подключения к БД
  - `DB_NAME` — наименование БД
  - `DB_USER` — имя пользователя БД
  - `DB_PASSWORD` — пароль пользователя БД
  - `SALT`— модификатор для хеширования пароля

- Для запуска проекта сначала необходимо установить БД MongoDB одним из двух способов: 
  - загрузить дистрибутив для своей операционной системы с [официальной страницы.](https://www.mongodb.com/try/download/community2)
  - используя docker воспользоваться файлом docker-compose.yml, который расположен в корневой директории проекта.

- Далее необходимо сгенерировать данные для первичного заполнения базы данных:
  - выполнить сценарий `mock:server` для запуска JSON-сервера.
  - выполнить сценарий `npm run ts ./src/cli.ts -- --generate 100 ./mocks/test-data.tsv http://localhost:3123/api`. 
  - **Параметры сценария**:
    - `./src/cli.ts` - размещение файла со скриптом.  
    - `-- --generate` - параметры запуска
    - `n` - количество генерируемых записей.
    - `filepath` - путь к файлу в формате *.tsv.
    - `url` - адрес запущенного JSON-сервера, с которого необходимо взять данные.

>Убедитесь, что MongoDB корректно установлен и запущен.
Загрузите клиент для просмотра структуры базы данных ([Compass](https://www.mongodb.com/products/compass) или mongo-express).

- выполнить сценарий `npm run ts ./src/cli.ts -- --import ./mocks/test-data.tsv admin test  127.0.0.1 what-to-watch 10`.
  - **Параметры сценария**:
    - `./src/cli.ts` - размещение файла со скриптом.
    - `-- --import` - параметры запуска
    - `filepath` - путь к файлу с данными в формате *.tsv.
    - `user` - пользователь базы данных.
    - `password` - пароль пользователя базы данных.
    - `localhost` - локальный хост, обычно имеет значение '127.0.0.1'.
    - `base` - наименование базы данных.
    - `salt` - значение модификатора для хеширования паролей.
>Значения для параметров нужно взять из файла `.env`

---

### 6. Сценарии
**В файле `package.json` доступны следующие сценарии:**

- `start` - запуск сборки проекта в продуктовом режиме.
- `start:dev` - запуск сборки проекта в режиме разработки, используем пакет 'nodemon'.
- `build` - запуск очистки предыдущей сборки и новая компиляция.
- `lint` - запуск линтера для кода проекта.
- `compile`- компиляция кода.
- `clean`- очистка директории "dist".
- `ts`- запуск пакета `ts-node`.
- `mock:server` - запуск JSON-сервера для получения данных при генерации.

**Приложение также предоставляет Command Line Interface (CLI). Для запуска CLI предусмотрен отдельный сценарий с поддержкой обработки аргументов:**
- `npm run ts ./src/cli.ts -- --version` - выводит номер версии.
- `npm run ts ./src/cli.ts -- --help` - выводит описание работы программы для подготовки данных.
- `npm run ts ./src/cli.ts -- --import <filepath> <user> <password> <localhost> <base> <salt>` - импортирует данные из файла *.tsv.
- `npm run ts ./src/cli.ts -- --generate <n> <filepath> <url>` - генерирует произвольное количество тестовых данных.
>Запуск CLI без аргументов приводит к исполнению команды --help.

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).
