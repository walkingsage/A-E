<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

# проверка, что ошибки нет
if (!error_get_last()) {

    //Данные для входа в бд
    $db_host = "localhost";
    $db_user = "walkingsage"; // Логин БД
    $db_password = "SC6-qiW-FLt-JpN"; // Пароль БД
    $db_base = 'ae_wedding_questions'; // Имя БД
    $db_table = "answers_questions"; // Имя Таблицы БД

    $link = mysqli_connect($db_host, $db_user, $db_password, $db_base);

    $fio = $_REQUEST['fio'];
    $canvisit = $_REQUEST['can_you_visit'];
    $content_child = $_REQUEST['child_with_you'];
    $info_children = $_REQUEST['child_info'];
    $allergy_contain = $_REQUEST['you_are_allergy'];
    $list_of_allergy = $_REQUEST['allergy_list'];
    $drinc_select = implode(', ', $_REQUEST['alco_select']);

    $sql = "INSERT INTO answers_questions (guests, visit, children, childreninfo, allergy, allergylist, drink)" . "VALUES('{$fio}', '{$canvisit}', '{$content_child}', '{$info_children}', '{$allergy_contain}', '{$list_of_allergy}', '{$drinc_select}');";

    mysqli_query($link, $sql);

    mysqli_close($link);


    // Переменные, которые отправляет пользователь
    $name = $_POST['fio'];
    $visit = $_POST['can_you_visit'];
    $child_content = $_POST['child_with_you'];
    $child_information = $_POST['child_info'];
    $you_are_allergy = $_POST['you_are_allergy'];
    $allergy_list = $_POST['allergy_list'];
    $alco_select = implode('<br>-', $_POST['alco_select']);

    // Формирование самого письма
    $title = "Анкета гостя с Сайта AE-Wedding";
    $body = "
    <h2>Ответы на вопросы анкеты:</h2>
    <b>ФИО Гостей: </b> $name<br><br>
    <b>Смогут присутствовать: </b> $visit<br><br>
    <b>Будут ли с гостями дети: </b> $child_content <br><br>
    <b>Имена и возраст детей: </b><br> $child_information <br><br>
    <b>Есть ли у гостя аллергия: </b> $you_are_allergy <br><br>
    <b>На какие продукты аллергия: </b><br> $allergy_list <br><br>
    <b>Предпочтения к напиткам: </b><br> $alco_select <br><br>
    <b>Посмотреть данные в виде таблицы, вы можете по ссылке:</b><a href='https://www.ae-wedding.ru/guest_table.php'>https://www.ae-wedding.ru/guest_table.php</a><br>
    ";

    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) {
        $GLOBALS['data']['debug'][] = $str;
    };

    // Настройки вашей почты
    $mail->Host = 'ae-wedding.ru'; // SMTP сервера вашей почты
    $mail->Username = 'anket@ae-wedding.ru'; // Логин на почте
    $mail->Password = 'Naruto16099821'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('anket@ae-wedding.ru', 'AE Wedding'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('walkingsage@mail.ru');
    $mail->addAddress('19072024@inbox.ru');

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }

} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Отправка результата
header('Content-Type: application/json');
echo json_encode($data);

?>