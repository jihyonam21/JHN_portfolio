<?
    isset($_POST['searchType']) || exit;
    isset($_POST['searchText']) || exit;

    $searchType = $_POST['searchType'];
    $searchText = $_POST['searchText'];
    $bookList = array();

    // $conn = mysqli_connect("localhost", "root", "autoset", "library");
    $conn = mysqli_connect("localhost", "jihyonam21", "j!2hyonam", "jihyonam21");

    if(!$conn) 
    {
        /*mysqli_error이라는 함수가 있음*/
        echo "데이터베이스를 연결할 수 없습니다." . mysqli_error($conn);

        /* DB 핸들러 닫기 */
        mysqli_close($conn);
        exit;
    }

	/* USE 어떤 DB를 사용하겠다 */
	//  		      st23  // jihyonam21
    if(!mysqli_select_db($conn, "jihyonam21")) 
    {
        echo "데이터베이스를 찾을 수 없습니다." . mysqli_error($conn);

        mysqli_close($conn);
        exit;
    }

    $sql = "SELECT * FROM `BOOKLIST` WHERE `". $searchType . "` LIKE '%" . $searchText . "%';";

    $result = mysqli_query($conn, $sql);

    if(!$result) 
    {
        echo "해당 데이터베이스의 결과 값을 가져올 수 없습니다." . mysqli_error($conn);

        /* DB 닫기 */
        mysqli_free_result($result);

        /* DB핸들러 닫기 */
        mysqli_close($conn);
    }

    if(mysqli_num_rows($result) == 0) 
    {
        echo "데이터가 아무것도 없습니다.";

        mysqli_free_result($result);
        mysqli_close($conn);
    }
    
    /* DB 결과를 bookList 배열에 담음 */
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) 
    {
        $bookList[$i] = $row;
        $i++;
    }

    /* ajax 값 넘기기 */
    echo json_encode(array('result'=>true, 'BOOKLIST'=>$bookList));
?>