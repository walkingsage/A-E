<?php

// Переменные, которые отправляет пользователь
// $name = $_POST['fio'];
// $visit = $_POST['can_you_visit'];
// $child_content = $_POST['child_with_you'];
// $child_information = $_POST['child_info'];
// $you_are_allergy = $_POST['you_are_allergy'];
// $allergy_list = $_POST['allergy_list'];
// $alco_select = implode('<br>-', $_POST['alco_select']);

$link = new mysqli($db_host, $db_user, $db_password, $db_base);

if ($link == false) {
    print ("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());

} else {
    print ("Соединение установлено успешно");
}

$sql = "INSERT INTO answers_questions (guests, visit, children, childreninfo, allergy, allergylist, drink) VALUES 
    (`$name`, `$visit`, `$child_content`, `$child_information`, `$you_are_allergy`, `$allergy_list`, `$alco_select`)";
if ($link->query($sql)) {
    echo "Данные успешно добавлены";
} else {
    echo "Ошибка: " . $link->error;
}

$link->close();

// $query = "insert into $db_table (guests, visit, children, childreninfo, allergy, allergylist, drink) values ('name', 'visit', 'child_content', 'child_information', 'you_are_allergy', 'allergy_list', 'alco_select')";

// $result = mysql_query($query);

// if ($result == true)
//     print ("Данные занесены"); //Печать сообщения
// else
//     print ("Данные не занесены");
mysql_close();

?>