<?php

//Данные для входа в бд
$db_host = "localhost";
$db_user = "walkingsage"; // Логин БД
$db_password = "SC6-qiW-FLt-JpN"; // Пароль БД
$db_base = 'ae_wedding_questions'; // Имя БД

$link = mysqli_connect($db_host, $db_user, $db_password, $db_base);

if (!$link) {
    die ("Ошибка: не удалось подключиться к базе данных!");
}

?>