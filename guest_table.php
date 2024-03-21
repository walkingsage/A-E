<!DOCTYPE html>
<html lang='ru' charset='utf-8'>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Таблица с ответами на анкету</title>
    <link rel="stylesheet" href="/assets/style/styleguestform.css">
</head>

<body>
    <?php
    //Данные для входа в бд
    $db_host = "localhost";
    $db_user = "walkingsage"; // Логин БД
    $db_password = "SC6-qiW-FLt-JpN"; // Пароль БД
    $db_base = 'ae_wedding_questions'; // Имя БД
    $db_table = "answers_questions"; // Имя Таблицы БД
    
    $link = mysqli_connect($db_host, $db_user, $db_password, $db_base);

    $query = "SELECT * FROM answers_questions";
    $result = mysqli_query($link, $query);

    if (!$result)
        exit ("Ошибка -" . mysqli_error($link));

    $sql = "INSERT INTO answers_questions (guests, visit, children, childreninfo, allergy, allergylist, drink)" . "VALUES('{$fio}', '{$canvisit}', '{$content_child}', '{$info_children}', '{$allergy_contain}', '{$list_of_allergy}', '{$drinc_select}');";

    echo '<table align="left" border="5" cellpadding="5" cellspacing="1">
                    <tr align=center">
                        <th>Имена гостей</th>
                        <th>Смогут ли присутствовать?</th>
                        <th>Будут ли с гостями дети?</th>
                        <th>Имя и возраст детей</th>
                        <th>Есть ли у гостя аллергия?</th>
                        <th>Список аллергенов гостя</th>
                        <th>Что гость будет пить?</th>
                    </tr>
        ';
    while ($row = mysqli_fetch_array($result)) {
        echo '
            <tr align="left">
                <td>' . $row['guests'] . '
                <td>' . $row['visit'] . '
                <td>' . $row['children'] . '
                <td>' . $row['childreninfo'] . '
                <td>' . $row['allergy'] . '
                <td>' . $row['allergylist'] . '
                <td>' . $row['drink'] . '
            </tr>';
    }
    echo '</table>';
    ?>

    <a class="btn btn-info" href="tablegues.php">Сохранить в EXCEL</a>
</body>

</html>