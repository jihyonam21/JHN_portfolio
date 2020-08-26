<?
    //값받아옴
    $MEM_USERID = $_POST["MEM_USERID"];
    $MEM_PASSWORD = (@crypt($_POST["MEM_PASSWORD"]));
    
    //DB연결
    $conn = mysqli_connect("localhost", "jihyonam21", "j!2hyonam", "jihyonam21");
    // $conn = mysqli_connect("localhost", "root", "autoset", "library");
    if(!$conn)
    {
        echo "데이터베이스를 연결할 수 없습니다.".mysqli_error($conn);
        mysqli_close($conn);
        exit;
    }
    if(!mysqli_select_db($conn,"jihyonam21")){
        echo "데이터베이스를 찾을 수 없습니다.".mysqli_error($conn);
        mysqli_close($conn);
        exit;
    }

    //DB jihyonam21 안에 있는 user DB를 사용하기 위함
    $myUseDB = mysqli_select_db($conn, "MEMBER");

    
    // dBErrorCheck($myUseDB, "SELECT jihyonam21-DB");
    
    $idSelect = "SELECT * FROM `MEMBER` WHERE `MEM_USERID` = '".$MEM_USERID."'";

    $myResult = mysqli_query($conn, $idSelect);

    //db에 아이디가 없다면 텍스트 알림
    // dBErrorCheck($myResult, "ID-CHECK");
    
    if($_POST['MEM_USERID']=="" || $_POST['MEM_PASSWORD']=="" )
    {
        echo "<script>alert('아이디 또는 패스워드를 입력하지 않으셨습니다.'); history.back();</script>";
        exit;
    }
    
    if(mysqli_num_rows($myResult) == 0)
    {
       echo "<script>alert('아이디와 비밀번호가 맞지 않습니다.'); history.back();</script>";
    }
    else
    {
        while($members = mysqli_fetch_assoc($myResult))
        {
            $MEM_NICKNAME = $members['MEM_NICKNAME'];
            /*쿠키 발행 연습*/
            // setcookie('USERID_COOKIE',$members['MEM_NICKNAME'],time()+(86400*30),'/');
            // if(isset($_COOKIE['USERID_COOKIE']))
            // {
            //     // echo "<script>alert('쿠키발행.');</script>";
            //     echo "<script>alert('정상적으로 로그인되었습니다.');</script>";
            // }
            session_start();
            $_SESSION['MEM_USERID'] = $MEM_USERID;
            $_SESSION['MEM_NICKNAME'] = $MEM_NICKNAME;
        }
    }
    mysqli_free_result($myResult);
    
?>
<meta http-equiv="refresh" content="0; url=../index.php" charset="utf-8">