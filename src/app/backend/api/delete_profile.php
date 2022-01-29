<?php

require 'connect.php'; // calling connect get_included_files

// creating class to communicate with angular js script

class statusClass
{
    public $engineMessage = 0;
    public $notFound = 0;
}
//transforming json object to normal php format
$data = json_decode(file_get_contents("php://input"), true);

if ($connected) {
    // http_response_code(200);

    $date_added = date("Y-m-d H:i:s");
    $active = 1;
    $not_active = 0;

    $sql = "SELECT * FROM runners WHERE phone_number=:phone_number AND status=:status";
    $query = $conn->prepare($sql);
    $query->bindParam(':phone_number', $data['phone_number']);
    $query->bindParam(':status', $active);
    $query->execute();

    if ($query->rowCount() >= 0) {

        $sql2 = "UPDATE runners SET status=:status, last_modified=:last_modified WHERE id=:id";
        $query2 = $conn->prepare($sql2);
        $query2->bindParam(':id', $data['id']);
        $query2->bindParam(':last_modified', $date_added);
        $query2->bindParam(':status', $not_active);
        $query2->execute();

        $returnvalue = new statusClass();
        $returnvalue->engineMessage = 1;
        $returnvalue->holduserid = $userid;

        echo json_encode($returnvalue);
    } else {
        $returnvalue = new statusClass();
        $returnvalue->notFound = 2;

        echo json_encode($returnvalue);
    }
} else {
    http_response_code(500);
}
