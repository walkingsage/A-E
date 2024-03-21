<?php
header("Content-Type: application/xls");
header("Content-Disposition: attachment; filename=answers.xls");
header("Pragma: no-cache");
header("Expires: 0");

$db_host = "localhost";
$db_user = "walkingsage"; // Логин БД
$db_password = "SC6-qiW-FLt-JpN"; // Пароль БД
$db_base = 'ae_wedding_questions'; // Имя БД

$link = mysqli_connect($db_host, $db_user, $db_password, $db_base);

$output = "";

$output .= "
 <table>
 <thead>
 <tr>
 <th>Имена гостей</th>
<th>Смогут ли присутствовать?</th>
<th>Будут ли с гостями дети?</th>
<th>Имя и возраст детей</th>
<th>Есть ли у гостя аллергия?</th>
<th>Список аллергенов гостя</th>
<th>Что гость будет пить?</th>
 </tr>
 <tbody>
	";

$query = $link->query("SELECT * FROM `answers_questions`") or die (mysqli_errno());
while ($fetch = $query->fetch_array()) {

    $output .= "
				<tr>
 <td>" . $fetch['guests'] . "</td>
 <td>" . $fetch['visit'] . "</td>
 <td>" . $fetch['children'] . "</td>
 <td>" . $fetch['childreninfo'] . "</td>
 <td>" . $fetch['allergy'] . "</td>
 <td>" . $fetch['allergylist'] . "</td>
 <td>" . $fetch['drink'] . "</td>
				</tr>
	";
}

$output .= "
 </tbody>
 
 </table>
	";

echo $output;


?>