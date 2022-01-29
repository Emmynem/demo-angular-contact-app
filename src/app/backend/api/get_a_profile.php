<?php

class responseClass{
  public $engineMessage = 0;
  public $notFound = 0;
  public $re_data;
}

  require 'connect.php';

  $data = json_decode(file_get_contents("php://input"),true);

  if ($connected) {
    // http_response_code(200);

    $active = 1;

    $sql = "SELECT * FROM profiles WHERE id=:id AND status=:status";
    $query = $conn->prepare($sql);
    $query->bindParam(":id", $data['id']);
    $query->bindParam(":status", $active);
    $query->execute();

    if ($query->rowCount() > 0){
        $returnvalue = new responseClass();
        $returnvalue->engineMessage = 1;
        $returnvalue->re_data = $query->fetchAll();
    }
    else {
        $returnvalue = new responseClass();
        $returnvalue->notFound = 2;
    }

    echo json_encode($returnvalue);

  }
  else {
    http_response_code(500);
  }
