<!DOCTYPE HTML>
<html lang="ko">
	<head>
        <meta charset="UTF-8">
    </head>
<body>
<html>
<?
// 이미지 파일 업로드 
function uploadImgFile($formFile) {
    // $formFile : input으로 넘어온 $_FILES['name']

    $uploaddir = '../files/';   // 저장할 파일 디렉토리 경로
    
    $uploadfile = NULL;         // 저장하는 파일 전체 경로
    $imageFileType = NULL;      // 저장하는 파일 타입
    
    $uploadOk = true;           // 업로드 가능한 파일인지

    // 한글 파일, 영어 파일 가능케
    $uploadfile = $uploaddir . preg_replace('/^.+[\\\\\\/]/', '', $formFile['name']);   // c:/a/b/d.png => d.png or d
    $uploadfile_temp = $uploaddir . pathinfo(preg_replace('/^.+[\\\\\\/]/', '', $formFile['tmp_name']), PATHINFO_FILENAME) . '.' . pathinfo($formFile['name'], PATHINFO_EXTENSION); // c:/a/b/d.png => abckljdlajfe.tmp or abckljdlajfe
    $imageFileType =  pathinfo($uploadfile, PATHINFO_EXTENSION);
    
    // 이미지 파일인지 검사
    $check = getimagesize($formFile['tmp_name']);
    
    if($check !== false) {
        echo '이미지 관련 파일입니다.' . $check['mime'];
        $uploadOk = true;
    }
    else {
        echo '이미지 관련 파일이 아닙니다.';
        $uploadOk = false;
    }
    
    // 파일 상태 검사
    if(file_exists($uploadfile_temp)) {
        echo "파일이 이미 존재합니다.";
        $uploadOk = false;
    }
    // if($formFile['size'] > 500000) {
    //     echo '파일의 크기가 너무 큽니다.';
    //     $uploadOk = false;

    // }
    if($imageFileType != 'jpg' && $imageFileType != 'png' && $imageFileType != 'jpeg') {
        echo 'jpg, jpeg, png 파일만 허용됩니다.';
        $uploadOk = false;
    }
    
    if($uploadOk == false) {
        echo '파일 업로드에 실패하였습니다.';
    }
    else {
        if(move_uploaded_file($formFile['tmp_name'], $uploadfile_temp)) {
            $size = @getimagesize($uploadfile);
            echo 'inputFile' . '파일이 유효하고, 성공적으로 업로드 되었습니다.<br>';
        }
        else {
            echo 'inputFile'. '파일 업로드 공격의 가능성이 있습니다.<br>';
        }
    }

    return array('tempFileName'=>pathinfo($uploadfile_temp, PATHINFO_BASENAME), 'originFileName'=>pathinfo($uploadfile, PATHINFO_BASENAME));
}


$conn = mysqli_connect("localhost", "jihyonam21", "j!2hyonam", "jihyonam21");

// 2019-12-03 12:02 추가함 
mysqli_query($conn, "set session character_set_connection=utf8;");

mysqli_query($conn, "set session character_set_results=utf8;");

mysqli_query($conn, "set session character_set_client=utf8;");

// $conn = mysqli_connect("localhost", "root", "autoset", "library");
if(!$conn) 
{
    /*mysqli_error이라는 함수가 있음*/
    echo "ERROR1!" . mysqli_error($conn);
    /* DB 핸들러 닫기 */
    mysqli_close($conn);
    exit;
}

/* USE 어떤 DB를 사용하겠다 */
if(!mysqli_select_db($conn, "jihyonam21")) 
{
    echo "ERROR2!" . mysqli_error($conn);
    mysqli_close($conn);
    exit;
}


//책 추가의 값을 받아옴
$title = $_POST['addTitle'];
$author = $_POST['addAuthor'];
$summary = $_POST['addSummary'];
$publication = $_POST['addPublicationdate'];
$price = $_POST['addPrice'];
$img = $_FILES['addImg'];
$imgInfo = uploadImgFile($img);
// //?????12???? 이런 물음표가 나옴 utf-8로 변경이 필요함
mysqli_query($conn, "SET NAMES utf8");

//DB에 추가할 값을 적은뒤 변수에 담아줌
$addsql = "INSERT INTO `BOOKLIST`(`TITLE`, `AUTHOR`, `SUMMARY`, `PUBLICATIONDATE`, `PRICE`, `TEMP_IMG_NAME`, `ORIGIN_IMG_NAME`) VALUES('{$title}', '{$author}', '{$summary}', '{$publication}', {$price}, '{$imgInfo['tempFileName']}', '{$imgInfo['originFileName']}');";
//DB에 추가할 값을 담은 변수를 핸들러 사용으로 DB에 추가 
$result = mysqli_query($conn, $addsql);

if(!$result) {
    echo "ERROR3!" . mysqli_error($conn);
    /* DB 닫기 */
    @mysqli_free_result($result);
    /* DB핸들러 닫기 */
    mysqli_close($conn);
}

// //쿼리 결과 메모리에서 해제
@mysqli_free_result($result);
//DB종료
@mysqli_close($conn);
?>
</body>
</html>
<!-- <meta http-equiv="refresh" content="0; url=../index.php"> -->