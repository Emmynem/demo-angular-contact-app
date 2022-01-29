<?php

  require 'connect.php'; // calling connect get_included_files

  // creating class to communicate with angular js script

  class statusClass{
    public $engineMessage = 0;
    public $engineNumberExist = 0;
    public $holduserid = 0;
  }
  //transforming json object to normal php format
  $data = json_decode(file_get_contents("php://input"),true);

  if ($connected){
    // http_response_code(200);

    $date_added = date("Y-m-d H:i:s");
    $active = 1;

    $sql = "SELECT * FROM runners WHERE phone_number=:phone_number AND status=:status";
    $query = $conn->prepare($sql);
    $query->bindParam(':phone_number', $data['phone_number']);
    $query->bindParam(':status', $active);
    $query->execute();

    if($query->rowCount() <= 0 ){

      $sql2 = "INSERT INTO runners (fullname, phone_number, street, city, state, zip_code, added_date, last_modified, status)
      VALUES (:fullname, :phone_number, :street, :city, :state, :zip_code, :added_date, :last_modified, :status)";

      $query2 = $conn->prepare($sql2);
      $query2->bindParam(':fullname',$data['fullname']);
      $query2->bindParam(':phone_number',$data['phone_number']);
      $query2->bindParam(':street',$data['street']);
      $query2->bindParam(':city',$data['city']);
      $query2->bindParam(':state',$data['state']);
      $query2->bindParam(':zip_code',$data['zip_code']);
      $query2->bindParam(':added_date', $date_added);
      $query2->bindParam(':last_modified', $date_added);
      $query2->bindParam(':status', $active);
      $query2->execute();

      $userid = $conn->lastInsertId();

      $returnvalue = new statusClass();
      $returnvalue->engineMessage = 1;
      $returnvalue->holduserid = $userid;

      echo json_encode($returnvalue);

    }
    else{
      $returnvalue = new statusClass();
      $returnvalue->engineNumberExist = 2;

      echo json_encode($returnvalue);
    }

  }
  else {
    http_response_code(500);
  }

 ?>
