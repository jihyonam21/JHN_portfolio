<?
	session_start();

	//페이저로 넘어갈때 경로 잘 바꾸어줄껏
	//                 localhost(주소)    st23(유저)    c9st23(유저pw)    st23(DB)
	$conn = mysqli_connect("localhost", "jihyonam21", "j!2hyonam", "jihyonam21");
	// $conn = mysqli_connect("localhost", "root", "autoset", "library");

	/*콘넥트가 이루지지 않을경우*/
	if(!$conn) 
	{
		/*mysqli_error이라는 함수가 있음*/
		// 데이터베이스를 연결할 수 없습니다. ERROR_1
        echo "ERROR1!" . mysqli_error($conn);

        /* DB 핸들러 닫기 */
        mysqli_close($conn);
        exit;
    }

	/* USE 어떤 DB를 사용하겠다 */
	//st23 (선생님 서버일경우)  // jihyonam21  (내 도메인)
	if(!mysqli_select_db($conn, "jihyonam21"))
	{
		//데이터베이스를 찾을 수 없습니다. ERROR_2
        echo "ERROR2!" . mysqli_error($conn);

        mysqli_close($conn);
        exit;
    }

    /* bookList DB 꺼내오기 */
    $sql = "SELECT * FROM `BOOKLIST`;";
    
    /* 실행시켜라 (핸들러, 실행문자열) */
    $result = mysqli_query($conn, $sql);

	/*다만 SQLquery가 안될경우*/
	if(!$result) 
	{
		//해당 데이터베이스의 결과 값을 가져올 수 없습니다. ERROR_3
        echo "ERROR3!" . mysqli_error($conn);

        /* DB 닫기 */
        mysqli_free_result($result);

        /* DB핸들러 닫기 */
        mysqli_close($conn);
    }

    if(mysqli_num_rows($result) == 0) {
        echo "데이터가 아무것도 없습니다.";

        mysqli_free_result($result);
        mysqli_close($conn);
	}

?>
<!DOCTYPE HTML>
<html lang="ko">
	<head>
		<title>도서 관리페이지</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
  		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
		<link href="https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="./style.css">
		<script src="./library.js"></script>
	</head>
	<body>
		<!-- 로그인창 모달 -->
		<div class="modal fade" id="myModal_login">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content border border-0">
					<div class="modal-header bg-dark text-white ">
						<h4 class="modal-title">로그인</h4>
						<button type="button" class="close text-white" data-dismiss="modal">&times;</button>
					</div>
					<form class="needs-validation" action="./php/login.php" method="POST">
						<div class="modal-body bg-dark text-white border border-0">
							<div class="form-row">
								<div class="col-md-12 sm-1">
									<label for="">Id:</label>
									<input type="text" class="form-control" placeholder="아이디" tabindex="1"  name="MEM_USERID" tabindex="1" required>
								</div>
							</div>
								<div class="form-row">
									<div class="col-md-12 sm-1">
										<label for="">Pasword:</label>
										<input type="password" class="form-control" placeholder="비밀번호" tabindex="2" name="MEM_PASSWORD" tabindex="2" required>
									</div>
								</div>
						</div>
						<div class="modal-footer bg-dark">
							<button type="submit" class="btn btn-danger" tabindex="3">로그인</button>
						</div>
					</form>	
				</div>
			</div>
		</div>
		<!-- 회원가입창 모달 -->
		<div class="modal fade" id="myModal_join">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content border border-0">
						<div class="modal-header bg-dark text-white ">
							<h4 class="modal-title">회원가입</h4>
							<button type="button" class="close text-white" data-dismiss="modal">&times;</button>
						</div>
						<form class="needs-validation" action="./php/userSave.php" method="POST" >
							<div class="modal-body bg-dark text-white border border-0">
								<div class="form-row">
									<div class="col-md-12 sm-1">
										<label for="">아이디:</label>
										<input type="text" class="form-control" placeholder="아이디" tabindex="1"  name="MEM_USERID" id="idBox" required>
									</div>
								</div>
								<div class="form-row">
									<div class="col-md-12 sm-1">
										<label for="">비밀번호:</label>
										<input type="password" class="form-control" placeholder="비밀번호" tabindex="2" name="MEM_PASSWORD" id="passWordBox" required>
									</div>
								</div>
								<div class="form-row">
									<div class="col-md-12 sm-1">
										<label for="">이름: </label>
										<input type="text" class="form-control" placeholder="이름" tabindex="3" name="MEM_USERNAME" id="userNameBox" required>
									</div>
								</div>
								<div class="form-row">
									<div class="col-md-12 sm-1">
										<label for="">별명: </label>
										<input type="text" class="form-control" placeholder="별명" tabindex="4" name="MEM_NICKNAME" id="nickNameBox" required>
									</div>
								</div>
								<div class="form-row">
									<div class="col-md-12 sm-1">
										<label for="">핸드폰번호:</label>
										<input type="number" class="form-control" placeholder="핸드폰번호" tabindex="5" name="MEM_MOBILEPHONE" id="mobilePhonBox" required>
									</div>
								</div>
								<div class="form-row">
									<div class="col-md-12 sm-1">
										<label for="">이메일:</label>
										<input type="text" class="form-control" placeholder="이메일" tabindex="6" name="MEM_EMAIL" id="emailBox" required>
									</div>
								</div>
							</div>
							<div class="modal-footer bg-dark">
								<input type="submit" class="btn btn-danger" tabindex="7">
							</div>
						</form>
					</div>
				</div>
		</div>

		<!-- 회원알림 -->
		<div class="container">
			<div class="headerBtnBox">
				<?php
				//어드민이 아닌 멤버의 유저 아이디 세션이 존재하는지 확인
				if(isset($_SESSION['MEM_USERID']))
				{
					//있다면 닉네임을 변수에 담음
					$nickname = $_SESSION['MEM_NICKNAME'];
					echo '<form class="needs-validation headerLogOutBox" action="./php/logout.php" method="POST">';
					//로그인한 아이디의 닉네임 출력
					echo '<input type="hidden" class="userNameBox">안녕하세요 '.$nickname."님".'<button type="submit" class="btn btn-info logoutBox">로그아웃</button>';
					echo "</form>";
					$loginType = 1; //  1 로그인됨
								    // -1 로그아웃됨
				}
				else 
				{
					$loginType = -1;
				}
				if($loginType == -1)
				{
					echo '<button class="btn btn-info loginBox" data-toggle="modal" data-target="#myModal_login">로그인</button>';
					echo '<button class="btn btn-info loginBox" data-toggle="modal" data-target="#myModal_join">회원가입</button>';
				}

				?>
			</div>
		</div>
		<div class="jumbotron text-center jumbotronBox" style="margin-bottom:0">
			<h1>도서 관리페이지</h1>
			<p>도서 정보를 볼수 있으며 간단한 조회가 가능합니다.</p> 	
		</div>
		 
		 <!-- 네비게이션 -->
		<nav>
			<div class="container-fluid containerBox ">
				<nav class="navbar navbar-expand-sm bg-dark navbar-dark navbarBox">
					<a class="navbar-brand" href="./index.php">도서목록</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="collapsibleNavbar">
						<ul class="navbar-nav">
							<li class="nav-item">
								<button type="button" class="nav-link searchBtn"  data-toggle="modal" data-target="#searchModal">도서검색</button>
							</li>
						</ul>
						<ul class="navbar-nav">
							<li class="nav-item">
								<button type="button" class="nav-link addModal"  data-toggle="modal" data-target="#addModal">도서추가</button>
							</li>
						</ul>
					</div> 
				</nav>
			</div>
		</nav>

		<div class="modal fade" id="searchModal">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">도서 찾기</h4>
						<button type="button" class="close" data-dismiss="modal" tabindex="3">&times;</button>
					</div>
					<div class="modal-body">
						<div class="row">
                        	<select tabindex="1" name="searchType" id="searchType" class="searchType form-control">
                        	    <option value="title">제목</option>                                
                        	    <option value="author">저자</option>
                        	</select>
                        	<input type="text" id="searchText" class="form-control userText" name="searchText" placeholder="항목을 고른후 입력하시오" tabindex="2" autofocus>
                        	<button id="searchModalBtn" class="btn btn-primary ModalSearchBtn" type="submit" tabindex="3">조회</button>
						</div>	
					</div>
					<div class="modal-footer">
						<button class="btn btn-danger" data-dismiss="modal">닫기</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="addModal">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">도서 추가</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<form action="./php/addBook.php" enctype="multipart/form-data" method="POST">
						<div class="modal-body">
							<input type="text" id="addTitle" class="form-control userText" name="addTitle" placeholder="도서명을 입력해주세요." tabindex="1" autofocus>
							<input type="text" id="addAuthor" class="form-control userText" name="addAuthor" placeholder="저자를 입력해주세요." tabindex="2">
							<input type="text" id="addSummary" class="form-control userText" name="addSummary" placeholder="줄거리를 입력해주세요." tabindex="3">
							<input type="text" id="addPublicationdate" class="form-control userText" name="addPublicationdate" placeholder="출판일을 입력해주세요.('-'포함)" tabindex="4">
							<input type="text" id="addPrice" class="form-control userText" name="addPrice" placeholder="도서의 가격을 입력해주세요(','제외)" tabindex="5">
							<!-- <input type="hidden" name="MAX_FILE_SIZE" value="10000000"> -->
							<input type="file" id="addImg" class="form-control userText" name="addImg" tabindex="6" value="">

						</div>
						<div class="modal-footer">
							<button id="addModalBtn" class="btn btn-primary ModalAddBtn" type="submit" tabindex="7">추가</button>
							<button class="btn btn-danger" data-dismiss="modal">닫기</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<section>
			<div class="container contentBox" id="contentBox">
				<?
					echo '<div class="row">';
					//DB에서 받아온 값을 row에 담음 @ << 에러 문구를 무시하고 출력해줌
					while($row = @mysqli_fetch_assoc($result))
					{
						$i = 1;
						echo '<div class="col-sm-4">';
							echo '<a class="btnReset" data-toggle="modal" href="#myModal_1">';
							echo '<img src=./files/'.$row["TEMP_IMG_NAME"].' alt="bookImg" '.$i.' class="allbook">';
							echo '<div class="textInfoBox">';
							//DB에서 받아온 값중 타이틀, 저자, 요약글
								echo '<p>'.$row['TITLE'].'</p>';							
								echo '<p>'.$row['AUTHOR'].'</p>';
								echo '<p>'.$row['SUMMARY'].'</p>';
							echo '</div>';
						echo '</div>';
						$i++;
					}
					echo '</div>';
				?> 
			</div>
		</section>
				
		<script>

		</script>
	</body>
</html>
<!-- DB닫아줌 -->
<?
	mysqli_close($conn);
?>


