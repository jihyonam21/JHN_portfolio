<?
    $MEM_USERID = $_POST["MEM_USERID"];
    $MEM_PASSWORD = (@crypt($_POST["MEM_PASSWORD"]));
    $MEM_USERNAME = $_POST["MEM_USERNAME"];
    $MEM_NICKNAME = $_POST["MEM_NICKNAME"];
    $MEM_MOBILEPHONE = $_POST["MEM_MOBILEPHONE"];
    $MEM_EMAIL = $_POST["MEM_EMAIL"];
    //값받아옴
    // var_dump($MEM_USERID);
    $conn = mysqli_connect("localhost", "jihyonam21", "j!2hyonam", "jihyonam21");
    // $conn = mysqli_connect("localhost", "root", "autoset", "library");
    //DB연결

    $myUseDB = mysqli_select_db($conn, "jihyonam21");
    //DB 아이디참조

    
    dBErrorCheck($myUseDB, "SELECT jihyonam21-DB");
    $myResult = mysqli_query($conn, "SELECT * FROM `MEMBER` WHERE `MEM_USERID` = '".$MEM_USERID."'");
    dBErrorCheck($myResult, "ID-CHECK");
    
    if(mysqli_num_rows($myResult)==0)
    {
      mysqli_query($conn, "INSERT INTO `MEMBER`(`MEM_USERID`, `MEM_PASSWORD`, `MEM_USERNAME`,
      `MEM_NICKNAME`, `MEM_MOBILEPHONE`, `MEM_EMAIL`) 
      VALUES ('$MEM_USERID', '$MEM_PASSWORD', '$MEM_USERNAME', '$MEM_NICKNAME', '$MEM_MOBILEPHONE', '$MEM_EMAIL')");
      echo "<script>alert('정상적으로 가입되었습니다.');</script>";
    }
    else
    {                                                                                                                               
        mysqli_close($conn);
        echo "<script>alert('중복id입니다');</script>";
        echo "<script>history.back();</script>";
        exit;
    }
    function dBErrorCheck($dbHandler, $dbMessage)
    {
        if(!$dbHandler)
        {
            echo $dbMessage."ERROR".mysqli_error($conn);
            exit;
        }
    }
    
?>

<meta http-equiv="refresh" content="0; url=../index.php">