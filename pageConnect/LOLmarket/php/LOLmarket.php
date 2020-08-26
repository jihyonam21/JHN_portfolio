<?
    // isset($_POST['name']) || exit;
    // isset($_POST['color']) || exit;
    // isset($_POST['opction']) || exit;
    // isset($_POST['Value']) || exit;
    $name = $_POST['name'];
    $color = $_POST['color'];
    $opction = $_POST['opction'];
    $Value = $_POST['Value'];

    $str = $name ."/". $color ."/". $opction ."/". $Value ."개";

    echo json_encode(array("string" => $str, "imgSrc"=>$_POST['src']));
    
?>