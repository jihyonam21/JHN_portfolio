 <?php

    // ppt 파일 다운로드
    function downloadPPT($filePath_origin) 
    {

        // 다운로드 파일 정보
        $fileSize = filesize($filePath_origin);
        // 
        $path_parts = pathinfo($filePath_origin);
        //원래 이름
        $fileName = $path_parts['basename'];
        //확장자
        $extension = $path_parts['extension'];

        //볼려고 찍음
        print_r($fileSize);
        print_r($path_parts);
        print_r($fileName);
        print_r($extension);

        header("Pragma: public");
        header("Expires: 0");
        header("Content-Type: application/octet-stream");

        //원래이름을 적어줌
        header("Content-Disposition: attachment; filename=$fileName");
        header("Content-Transfer-Encoding: binary");

        //몇 byte
        header("Content-Length: $fileSize");

        ob_clean();
        flush();
        readfile($filePath_origin);
        unlink($filePath_origin);

    }

?>