<?php

  class responseClass{
    public $engineMessage = 0;
    public $notFound = 0;
    public $re_data;
    public $totalCount = 0;
    public $totalActiveCount = 0;
    public $totalDeletedCount = 0;
  }

  require 'connect.php';

  $data = json_decode(file_get_contents("php://input"),true);

  if ($connected) {
    // http_response_code(200);

    $active = 1;

    $start = isset($_GET['start']) ? $_GET['start'] : $data['start'];
    $numLimit = isset($_GET['numLimit']) ? $_GET['numLimit'] : $data['numLimit'];

    $sql = "SELECT * FROM profiles ORDER BY added_date DESC LIMIT " . $start . "," . $numLimit . "";
    $query = $conn->prepare($sql);
    $query->execute();

    if ($query->rowCount() > 0) {

      $sql3 = "SELECT COUNT(*) FROM profiles";
      $query3 = $conn->prepare($sql3);
      $query3->execute();

      $sql4 = "SELECT COUNT(*) FROM profiles WHERE status=1";
      $query4 = $conn->prepare($sql4);
      $query4->execute();

      $sql5 = "SELECT COUNT(*) FROM profiles WHERE status=0";
      $query5 = $conn->prepare($sql5);
      $query5->execute();

      $totalOverallCount = $query3->fetch();
      $totalActiveCount = $query4->fetch();
      $totalDeletedCount = $query5->fetch();

      $returnvalue = new responseClass();
      $returnvalue->engineMessage = 1;
      $returnvalue->re_data = $query->fetchAll();
      $returnvalue->totalCount = $totalOverallCount[0];
      $returnvalue->totalActiveCount = $totalActiveCount[0];
      $returnvalue->totalDeletedCount = $totalDeletedCount[0];
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

 ?>
