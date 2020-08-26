window.onload = function () {
  //html 백그라운드 슬라이드에 사용함
  var nowImg;
  var nextImg;
  //

  //아코디언메뉴에 사용함
  var downBox = $(".aboutTheme");
  var j = 0;
  //

  // 2020-08-20 모바일용 추가
  var mobileScreen = window.matchMedia("all and (max-width: 480px)");

  var M_slideText = [
    [
      "LOL Market(개인)",
      "제작기간: 10일",
      `게임 리그오브레전드의 아이템을 사용하여, 쇼핑몰 장바구니만을 구현했습니다.<br>
        수량은 최소 1개 ~ 10개까지 구매 가능하며 1개당 가격은 9,800원입니다.<br>
        10개와 옵션을 추가하면 9000원 할인됩니다.<br>
        <br>
        --사용된 언어 및 라이브러리--<br>
        Html, Css, Sass, Jquery, Bootstrap, JavaScript, Ajax, Php`,
      `<button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/LOLmarket/LOLmarket.html')" id="pageMove1">페이지 이동</button>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/LOLmarket/LOLmarket.pdf')" id="documentMove1">문서 보기</button>`,
    ],
    [
      "GlenBliss(팀)",
      "제작기간: 20일",
      `팀원 4명이서 펜션 예약이 가능한 홈페이지를 만들었습니다.<br>
        예약, 리뷰작성, 회원가입, 로그인, 쿠폰함 예약확인 등의 기능이 있습니다.<br>
        기획과 디자인을 맡았으며 50%정도 담당했습니다. <br>
        푸터에 관리자 로그인을 누르고 관리자 페이지에서 로그인버튼을 누르면 로그인됩니다.<br>
        --사용된 언어 및 라이브러리--<br>
        Html, Css, Sass, Jquery, JavaScript, Ajax, Php, Mysql`,
      `<button class="btn documentBtnColor" onclick="window.open('http://pager.kr/~st26/GlenBliss/index.html')" id="pageMove2">페이지 이동</button>
        <button class="btn documentBtnColor"  onclick="window.open('http://hazzi.co.kr/pageConnect/GlenBliss/GlenBliss.pdf')" id="documentMove2" onClick="">문서 보기</button>`,
    ],
    [
      "도서 관리페이지(개인)",
      "제작기간: 28일",
      `회원가입과 로그인이 가능하며, 도서 조회,<br>
        도서 검색, 도서 추가, 도서 삭제가 가능합니다.<br>
        부트스트랩을 주로 사용했습니다.<br>
        <br>
        --사용된 언어 및 라이브러리--<br>
        Html, Css, Jquery, Bootstrap, JavaScript, Ajax, Php, Mysql`,
      `<button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/booklist/index.php')" id="pageMove3">페이지 이동</button>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/booklist/BookList.pdf')" id="documentMove3">문서 보기</button>`,
    ],
    [
      "상품소개 이미지(개인)",
      "제작기간: 2일",
      `포토샵과 일러스트를 사용하여 만든 상품 소개입니다.<br>
        문서 보기 클릭 시 사용된 이미지를 볼 수 있으며<br>
        <br>
        왼쪽은 화장품 상품소개 컷을 디자인했습니다.<br>
        오른쪽은 구두의 상품소개 컷을 디자인했습니다.<br>
        <br>`,
      `<a href="http://hazzi.co.kr/pageConnect/cosmetics/Psd2.zip" download><button class="btn documentBtnColor" id="pageMove4">PSD 다운로드</button></a>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/cosmetics/goodsimgAdd.pdf')" id="documentMove4">문서 보기</button>`,
    ],
    [
      "이미지 합성(개인)",
      "제작기간: 2일",
      `포토샵만으로 제작한 이미지 합성입니다.<br>
        <br>
        왼쪽은 신데렐라를 생각하며 이미지를 합성해서 만들었습니다.<br>
        <br>
        오른쪽은 애니메이션 원령공주를 생각하며 이미지를 합성해서 만들었습니다.<br>`,
      `<a href="http://hazzi.co.kr/pageConnect/practice_Wolf/Psd.zip" download><button class="btn documentBtnColor"  id="pageMove5">PSD 다운로드</button></a>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/practice_Wolf/photoshop_Ed.pdf')" id="documentMove5">문서 보기</button>`,
    ],

  ];
  //

  //포트폴리오 페이지 preView 컨트롤을 위함
  var previewIndex = 0;

  //포토폴리오 페이지에 사용함
  //포토폴리오 페이지 슬라이드 정지 시키기 위한 핸들러e
  var rolling;
  var slideText = [
    [
      "LOL Market(개인)",
      "제작기간: 10일",
      `게임 리그오브레전드의 아이템을 사용하여,<br>
        쇼핑몰 장바구니만을 구현했습니다.<br>
        <br>
        수량은 최소 1개 ~ 10개까지 구매 가능하며<br>
        1개당 가격은 9,800원입니다.<br>
        10개와 옵션을 추가하면 9000원 할인됩니다.<br>
        <br>
        --사용된 언어 및 라이브러리--<br>
        Html, Css, Sass, Jquery, Bootstrap, JavaScript,<br>
        Ajax, Php`,
      `<button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/LOLmarket/LOLmarket.html')" id="pageMove1">페이지 이동</button>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/LOLmarket/LOLmarket.pdf')" id="documentMove1">문서 보기</button>`,
    ],
    [
      "GlenBliss(팀)",
      "제작기간: 20일",
      `팀원 4명이서 펜션 예약이 가능한<br>
        홈페이지를 만들었습니다.<br>
        <br>
        예약, 리뷰작성, 회원가입, 로그인, 쿠폰함 <br>
        예약확인 등의 기능이 있으며<br>
        하단 푸터에 관리자 로그인이 존재합니다.<br>
        관리자 페이지에서 로그인버튼을 누르면 로그인됩니다.<br>
        <br>
        기획과 디자인을 맡았으며 <br>
        Html, Css, Jquery, JavaScript를 담당했습니다.<br>
        <br>
        --사용된 언어 및 라이브러리--<br>
        Html, Css, Sass, Jquery, JavaScript, Ajax, Php, Mysql`,
      `<button class="btn documentBtnColor" onclick="window.open('http://pager.kr/~st26/GlenBliss/index.html')" id="pageMove2">페이지 이동</button>
        <button class="btn documentBtnColor"  onclick="window.open('http://hazzi.co.kr/pageConnect/GlenBliss/GlenBliss.pdf')" id="documentMove2" onClick="">문서 보기</button>`,
    ],
    [
      "도서 관리페이지(개인)",
      "제작기간: 28일",
      `회원가입과 로그인이 가능하며, 도서 조회,<br>
        도서 검색, 도서 추가, 도서 삭제가 가능합니다.<br>
        부트스트랩을 주로 사용했습니다.<br>
        <br>
        --사용된 언어 및 라이브러리--<br>
        Html, Css, Jquery, Bootstrap, JavaScript, Ajax,<br>
        Php, Mysql`,
      `<button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/booklist/index.php')" id="pageMove3">페이지 이동</button>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/booklist/BookList.pdf')" id="documentMove3">문서 보기</button>`,
    ],
    [
      "상품소개 이미지(개인)",
      "제작기간: 2일",
      `포토샵과 일러스트를 사용하여 만든 상품 소개입니다.<br>
        문서 보기 클릭 시 사용된 이미지를 볼 수 있으며<br>
        <br>
        왼쪽은 화장품 상품소개 컷을 디자인했습니다.<br>
        오른쪽은 구두의 상품소개 컷을 디자인했습니다.<br>
        <br>`,
      `<a href="http://hazzi.co.kr/pageConnect/cosmetics/Psd2.zip" download><button class="btn documentBtnColor" id="pageMove4">PSD 다운로드</button></a>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/cosmetics/goodsimgAdd.pdf')" id="documentMove4">문서 보기</button>`,
    ],
    [
      "이미지 합성(개인)",
      "제작기간: 2일",
      `포토샵만으로 제작한 이미지 합성입니다.<br>
        <br>
        왼쪽은 신데렐라를 생각하며<br>
        이미지를 합성해서 만들었습니다.<br>
        <br>
        오른쪽은 애니메이션 원령공주를 생각하며<br>
        이미지를 합성해서 만들었습니다.<br>`,
      `<a href="http://hazzi.co.kr/pageConnect/practice_Wolf/Psd.zip" download><button class="btn documentBtnColor"  id="pageMove5">PSD 다운로드</button></a>
        <button class="btn documentBtnColor" onclick="window.open('http://hazzi.co.kr/pageConnect/practice_Wolf/photoshop_Ed.pdf')" id="documentMove5">문서 보기</button>`,
    ],
  ];
  //

  // 홈 페이지에 들어갔는지 알기위한 값
  $("#backgroundFixing_1").val(1);

  // 컨텐츠 리셋 (빈공간 만들기)
  function resetContents() {
    $("#blogContents_Home").css("display", "none");
    $("#blogContents_About").css("display", "none");
    $("#blogContents_Portfolio").css("display", "none");
    $("#blogContents_Gallery").css("display", "none");
    $("#blogContents_Callme").css("display", "none");
    $("#blogContents_Skill").css("display", "none");

    locationNavText();
  }

  // 메뉴 클릭시 weight 유지 혹은 체인지
  function locationNavText(TextId) {
    $("#" + TextId)
      .css("font-weight", "500")
      .css("color", "#fff");
    $(".userNavGuide")
      .not("#" + TextId)
      .css("font-weight", "400")
      .css("color", "#d6d6d6");
  }

  // 어바웃 컨텐츠 이벤트 초기화
  function AboutBoxStop() {
    $("#blogContents_About").finish().hide();
    $("#aboutBoxLeft").finish().hide();
    $("#aboutBoxMid").finish().hide();
    $("#aboutBoxRight").finish().hide();
  }

  // 포트폴리오 컨텐츠 이벤트 초기화
  function PortfolioBoxStop() {
    $("#slidePreview").finish().hide();
    $("#PortfolioSlideBox").finish().hide();
  }

  // 스킬 컨텐츠 이벤트 초기화
  function SkillBoxStop() {
    $("#skillIconImg").finish().hide();
  }

  // 포트 폴리오 페이지 클릭시 내용 변경
  function ChangePreView(S_Title, S_Day, S_Ment, S_Btn) {
    $(".slideTitle").html(S_Title);
    $(".slideDay").html(S_Day);
    $(".slideMent").html(S_Ment);
    $(".btnBar").html(S_Btn);
  }

  //포트 폴리오 페이지 슬라이드
  function PortfolioSlide(index, num, ChangeImg) {
    rolling = setInterval(function () {
      let ResultImg = "./img/Slide/" + ChangeImg + "_view" + index + ".jpg";
      //이미지와 멘트등 값을 받아서 출력함
      //2020-08-20 모바일용 script 추가
      if (mobileScreen.matches == true) {
        ChangePreView(
          M_slideText[index - 1][0],
          M_slideText[index - 1][1],
          M_slideText[index - 1][2],
          M_slideText[index - 1][3]
        );
        index++;
        console.log("모바일 진입");
      }
      else {
        ChangePreView(
          slideText[index - 1][0],
          slideText[index - 1][1],
          slideText[index - 1][2],
          slideText[index - 1][3]
        );
        index++;
      }
      //

      if (index > num) {
        index = 1;
      }
      //2000s 마다 index 증가 하며 이미지를 바꿔줌
      $("#slideViewImg").attr("src", ResultImg);
    }, 2000);
  }

  // 효과를 주고싶은 박스 갯수(length) 만큼
  while (j < downBox.length) {
    //downBox 클릭시
    downBox[j].addEventListener("click", function () {
      // active 클래스 부여 (토글방식)
      this.classList.toggle("active");
      // 어바웃 멘트에 주석,텍스트 무시하고 반환
      let aboutMent = this.nextElementSibling;

      // 텍스트 만큼의 height값이 있다면
      if (aboutMent.style.maxHeight) {
        //height 값 null
        aboutMent.style.maxHeight = null;
      } else {
        //만약 텍스트 만큼의 height값이 없다면
        //창 사이즈 값 구해서 px 문자 추가해서
        //height길이를 만들어줌
        aboutMent.style.maxHeight = aboutMent.scrollHeight + "px";
      }
    });
    j++;
  }

  // 홈을 제외한 페이지 첫 스타트 시 빈공간을 만들기
  $("#aboutBoxLeft").hide();
  $("#aboutBoxMid").hide();
  $("#aboutBoxRight").hide();
  $("#slidePreview").hide();
  $("#PortfolioSlideBox").hide();
  $("#skillIconImg").hide();

  locationNavText("NavHome");

  //포트폴리오 시작시 첫 슬라이드
  PortfolioSlide(1, 5, "PortFolioImgSlide");

  $("#NavListTop").on("click", function (e) {
    $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.8)");
    resetContents();

    locationNavText("NavHome");
    $("#blogContents_Home").fadeIn(600);
    $("#backgroundFixing_1").val(1);
    AboutBoxStop();
    PortfolioBoxStop();
    SkillBoxStop();
  });

  $("#NavHome").on("click", function (e) {
    $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.8)");
    resetContents();

    locationNavText("NavHome");
    $("#blogContents_Home").fadeIn(600);
    $("#backgroundFixing_1").val(1);
    AboutBoxStop();
    PortfolioBoxStop();
    SkillBoxStop();
  });

  $("#NavAbout").on("click", function (e) {
    // 홈 버튼을 눌렸다면 어바웃페이지 fadeIn효과 아니라면 다른 페이지를
    // 클릭하고 들어왔기때문에 show 효과
    if ($("#backgroundFixing_1").val() == 1) {
      $("#backgroundFixing_1").val("");
      $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.6)");
      resetContents();

      locationNavText("NavAbout");
      $("#blogContents_About").fadeIn(600);
      $("#aboutBoxLeft").delay(400).fadeIn(400);
      $("#aboutBoxMid").delay(800).fadeIn(400);
      $("#aboutBoxRight").delay(1200).fadeIn(400);
    } else {
      $("#backgroundFixing_1").val("");
      $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.6)");
      resetContents();

      locationNavText("NavAbout");
      $("#blogContents_About").show();
      $("#aboutBoxLeft").delay(200).fadeIn(400);
      $("#aboutBoxMid").delay(600).fadeIn(400);
      $("#aboutBoxRight").delay(1000).fadeIn(400);
    }
    PortfolioBoxStop();
    SkillBoxStop();
  });

  $("#NavSkill").on("click", function (e) {
    if ($("#backgroundFixing_1").val() == 1) {
      $("#backgroundFixing_1").val("");
      $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.6)");
      resetContents();

      locationNavText("NavSkill");
      $("#blogContents_Skill").fadeIn(600);
      $("#skillIconImg").delay(700).fadeIn(600);
    } else {
      $("#backgroundFixing_1").val("");
      $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.6)");
      resetContents();

      locationNavText("NavSkill");
      $("#blogContents_Skill").show();
      $("#skillIconImg").delay(700).fadeIn(600);
    }
    PortfolioBoxStop();
    AboutBoxStop();
  });

  $("#NavPortfolio").on("click", function (e) {
    if ($("#backgroundFixing_1").val() == 1) {
      $("#backgroundFixing_1").val("");
      $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.6)");
      resetContents();

      locationNavText("NavPortfolio");
      $("#blogContents_Portfolio").fadeIn(600);
      $("#PortfolioSlideBox").delay(400).fadeIn(400);
      $("#slidePreview").delay(800).fadeIn(400);
    } else {
      $("#backgroundFixing_1").val("");
      $("#BlogNavBox").css("background-color", "rgba(25,30,40, 0.6)");
      resetContents();

      locationNavText("NavPortfolio");
      $("#blogContents_Portfolio").show();
      $("#PortfolioSlideBox").fadeIn(300);
      $("#slidePreview").delay(300).fadeIn(400);
    }
    AboutBoxStop();
    SkillBoxStop();
  });

  $("#slideStop").on("click", function (e) {
    if ($("#slideStop Span").text() == "일시정지 ") {
      if (previewIndex > 0) {
        clearTimeout(rolling);
        $("#slideStop span").text("재생 ");
      }
      clearTimeout(rolling);
      $("#slideStop span").text("재생 ");
    } else if ($("#slideStop Span").text() == "재생 ") {
      if (previewIndex > 0) {
        clearTimeout(rolling);
        $("#slideStop span").text("재생 ");
      } else if (previewIndex == 0) {
        clearTimeout(rolling);
        PortfolioSlide(1, 5, "PortFolioImgSlide");
        $("#slideStop span").text("일시정지 ");
      }
      // console.log("진입");
    }
    previewIndex = 0;
    return false;
  });

  $("#footerBar").css("display", "none");
  $("#NavCallme").click(function (e) {
    if ($("#footerBar").css("display") == "block") $("#footerBar").hide();
    else $("#footerBar").show();
    $("#footerCallmeBar").animate(
      {
        height: "toggle",
      },
      290
    );
  });

  $("#preView_1").on("click", function (e) {
    previewIndex = 1;
    $("#slideStop").trigger("click");
    //2020-08-20 모바일용 추가
    if (mobileScreen.matches == true) {
      ChangePreView(
        M_slideText[0][0],
        M_slideText[0][1],
        M_slideText[0][2],
        M_slideText[0][3]
      );
    }
    else {
      ChangePreView(
        slideText[0][0],
        slideText[0][1],
        slideText[0][2],
        slideText[0][3]
      );
    }
    $("#slideViewImg").attr("src", "./img/Slide/PortFolioImgSlide_view1.jpg");
  });
  $("#preView_2").on("click", function (e) {
    previewIndex = 2;
    $("#slideStop").trigger("click");
    //2020-08-20 모바일용 추가
    if (mobileScreen.matches == true) {
      ChangePreView(
        M_slideText[1][0],
        M_slideText[1][1],
        M_slideText[1][2],
        M_slideText[1][3]
      );
    }
    else {
      ChangePreView(
        slideText[1][0],
        slideText[1][1],
        slideText[1][2],
        slideText[1][3]
      );
    }
    $("#slideViewImg").attr("src", "./img/Slide/PortFolioImgSlide_view2.jpg");
  });
  $("#preView_3").on("click", function (e) {
    previewIndex = 3;
    $("#slideStop").trigger("click");
    //2020-08-20 모바일용 추가
    if (mobileScreen.matches == true) {
      ChangePreView(
        M_slideText[2][0],
        M_slideText[2][1],
        M_slideText[2][2],
        M_slideText[2][3]
      );
    }
    else {
      ChangePreView(
        slideText[2][0],
        slideText[2][1],
        slideText[2][2],
        slideText[2][3]
      );
    }
    $("#slideViewImg").attr("src", "./img/Slide/PortFolioImgSlide_view3.jpg");
  });
  $("#preView_4").on("click", function (e) {
    previewIndex = 4;
    $("#slideStop").trigger("click");
    //2020-08-20 모바일용 추가
    if (mobileScreen.matches == true) {
      ChangePreView(
        M_slideText[3][0],
        M_slideText[3][1],
        M_slideText[3][2],
        M_slideText[3][3]
      );
    }
    else {
      ChangePreView(
        slideText[3][0],
        slideText[3][1],
        slideText[3][2],
        slideText[3][3]
      );
    }
    $("#slideViewImg").attr("src", "./img/Slide/PortFolioImgSlide_view4.jpg");
  });
  $("#preView_5").on("click", function (e) {
    previewIndex = 5;
    $("#slideStop").trigger("click");
    //2020-08-20 모바일용 추가
    if (mobileScreen.matches == true) {
      ChangePreView(
        M_slideText[4][0],
        M_slideText[4][1],
        M_slideText[4][2],
        M_slideText[4][3]
      );
    }
    else {
      ChangePreView(
        slideText[4][0],
        slideText[4][1],
        slideText[4][2],
        slideText[4][3]
      );
    }
    $("#slideViewImg").attr("src", "./img/Slide/PortFolioImgSlide_view5.jpg");
  });
};
