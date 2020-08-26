window.onload = function()
{

    /*네비게이션 2번박스 라칸이 기본값*/
    //라칸이 첫 스타트 페이지 이므로 바로 담기를 클릭 할 경우를 위해서
    //라칸이 담기도록 라칸 true
    var niko = false;
    var rakan = true;
    var jaya = false;
    var joy = false;
    //

    /*스타트 페이지가 라칸 이므로 기본값 셋팅*/
    var P_Title = "rakan";
    var P_Color = "nomalColor";
    var P_opction = "";
    var P_Value = $("#goodsCount").val();
    var P_Price = 9800;
    //

    /*모달박스를 컨트롤하기 편하게 하기 위해서 변수에 담음*/
    var noticeModal = $("#noticeModalBox");
    //

    /* 전체 선택 */
    var isAllCheck = false;
    //

    //이미지의 URL 이 계속 변경되므로 함수로 처리 바뀌는 URL을 계속 변수로 가져올수 있음
    //백그라운드 이미지로 주었음
    function goodsImgChange (ChangeImgUrl_1, ChangeImgUrl_2, ChangeImgUrl_3)
    {
        $("#goodsImg").css("background-image", "url('./img/"+ ChangeImgUrl_1 +'/'+ ChangeImgUrl_2 + '/'+ ChangeImgUrl_3 + "')");
    }

    //src 자체를 바꾸어 변경함 goodsImgChange와 같은 이유로 이미지 경로를 추출해옴
    function mainGoodsImgChange (folderUrl, fileUrl)
    {
        /* ./img/rakan/rakan_Test.jpg */
        $("#jayaRakanBackImg").attr("src", "./img/"+ folderUrl +'/'+ fileUrl);
    }

    //상품추가
    //script로 처리 가능하지만 ajax가 어떤건지 알고 싶어서 사용해봄
    //타이틀,컬러,옵션 등 php로 값을 보내서 처리한후 값들을 받아옴
    function ProductAdd (P_Title, P_Color, P_opction, P_Value)
    {
        //장바구니에 이미지를 넣기위해서 이미지 경로를 추출함
        var str = "./img/" + P_Title + "/" + P_Title + "_1.jpg";
         
        //만약 값이 없다면 공백일테고 공백이라면 - 로 처리 
        var optionString = P_opction;
        (optionString != "") || (optionString = " - ");

        $.ajax({
            url:"./php/LOLmarket.php",
            dataType: 'json',
            type: 'POST',
            data: {
                name: P_Title,                     
                color: P_Color,
                opction: optionString,
                Value: P_Value,
                src: str
            },
            success: function(result)
            {
                //가격을 변수에 담아 append로 다시 끼워넣을 생각
                var productPrice = $("#sumPrice").html();
                // console.log(result['string']);
                //console.log(productPrice);
                
                //장바구니에 이미지, 선택한 옵션 컬러 가격을 append를 사용해 끼워넣음
                $("#myCartCard").append(`
                    <div class="myProduct">
						<label><input type="checkbox" class="deleteCheck" id="deleteCheck" name="deleteCheck" value="deleteCheck">
						<img class="cartImg" id="cartImg" src="${result['imgSrc']}">
						<p class="cartImgText" id="cartImgText">${result['string']}</p>
						<p class="cartSelectPrice" id="cartSelectPrice">${productPrice}</p></label>										
					</div>
                `);
                // console.log("rottn", $(".cartSelectPrice").length);
                // console.log($($(".cartSelectPrice")[1]).html());
                let i = 0;
                let cartSumPrice = 0;

                while(i < $(".cartSelectPrice").length)
                {
                    cartSumPrice = $(".cartSelectPrice")[i];
                    i++;
                }

                setTotalPrice();
            }  
        });  
    }

    //체크박스의 개수를 구해 전부 체크를 풀어줌
    function resetCheckBox() {
        $("#allDeleteCheck").prop("checked", false);

        var i = 0;
        while(i < $(".deleteCheck").length)
        {
            $($(".deleteCheck")[i]).prop("checked", false);

            i++;
        }
        
        isAllCheck = false;
    }

    //장바구니에 있는 가격을 변수에 담고 
    //가격에 콤마와 원이라는 문자를 공백으로 없앰 
    function setTotalPrice() 
    {
        var resultPrice = 0;
        var resultPriceString = "";

        var i = 0;

        while(i < $(".cartSelectPrice").length) 
        {
            let tempPrice = $($(".cartSelectPrice")[i]).html();
            tempPrice = tempPrice.replace(",", "");
            tempPrice = tempPrice.replace("원", "");

            //콤마와 원을 없앤 가격을 넘버로 정확히 찝어주고 이를 리절트에 누적시킴
            resultPrice += Number(tempPrice);
            i++;
        }
        // 정확히 숫자가 된 resultPrice 를 콤마찍기 정규식으로 콤마를 생성함
        resultPriceString = numberWithComma(resultPrice);
        // html에 출력
        $("#lastPrice").html(resultPriceString + "원");
    }

    //콤마찍기 정규식
    function numberWithComma(Count) {
        return String(Count).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //
    //
    //함수 끝
    //
    //


    //수량카운트
    $("#goodsCount").change(function(e)
    {
        //우선 수량은 0-9의 한자리 혹은 두자리의 숫자만 받을수 있게 정규식을 사용하여
        //변수에 담아주었고 
        var countRegExp =/^[0-9]{1,2}$/;
        //상품개수를 변수에 담았으며
        P_Value = $("#goodsCount").val();
        //한개당 가격이 9800원이며 개수당 증가하는 가격을 변수에 담아주고
        P_Price = P_Value * 9800;
        
        //정규식을 통과하는지 검사한다
        if(countRegExp.test(P_Value))
        {
            //통과했다면 카운트박스에 몇개를 선택했는지를 알리기 위해 개수 + 문자 "개"를 html에 출력
            $("#CountBox").html("개");
            //개수의 총합에 문자열 "원"을 붙여 html에 출력
            $("#sumPrice").html(numberWithComma(P_Price) + "원");

            //다만 개수가 10개 이상이라면
            if(P_Value > 10)
            {
                //10개를 숫자로 확실하게 변경해주고
                P_Value = Number(10);
                //그 숫자당 9800원임을 변수에 담아준다
                P_Price = P_Value * 9800;
                
                $("#goodsCount").val(P_Value);
                $("#CountBox").html("개");
                $("#sumPrice").html(numberWithComma(P_Price) + "원");

                //다만 옵션이 있을경우
                if( P_opction == "nikoPet" || P_opction == "rakanPet" || P_opction == "jayaPet" || P_opction == "joyPet")
                {
                    //개수에 9800원이고 옵션값 1000원을 추가함 이를 변수에 담아줌
                    P_Price = (P_Value * 9800) + 1000;
                    //담은 값에 문자 "원" 을 추가해서 html에 출력
                    $("#sumPrice").html(numberWithComma(P_Price) + "원");
                    //다만 변수에 담긴 값이 99000원이라면
                    //즉 10개 구매하고 9800 * 10 = 98000 에 옵션 추가한 1000 = 99000 이라면
                    if(P_Price == 99000)
                    {
                        //10개에 옵션까지 추가했으니 9000원 할인해줌
                        P_Price = (((P_Value * 9800) + 1000) -9000);
                        $("#sumPrice").html(numberWithComma(P_Price) + "원");
                    }
                }

            }
        }
        //정규식을 통과하지 못한다면
        else
        {
            //기본값인 개수 1개로 만들어주고 
            $("#goodsCount").val('1');
            // console.log($("#goodsCount").val());
            P_Value = Number(1);
            P_Price = 1 * 9800;
            //기본값으로 만들어준 값을 출력
            $("#sumPrice").html(numberWithComma(P_Price) + "원");
        }
        //다만 옵션이 선택되어있다면
        if( P_opction == "nikoPet" || P_opction == "rakanPet" || P_opction == "jayaPet" || P_opction == "joyPet")
        {
            //기본값에 1000원을 추가하고
            P_Price = (P_Value * 9800) + 1000;
            $("#sumPrice").html(numberWithComma(P_Price) + "원");
            //
            if(P_Price == 99000)
            {
                //10개에 옵션 추가했으므로 9000원 할인해줌
                P_Price = (((P_Value * 9800) + 1000) -9000);
                $("#sumPrice").html(numberWithComma(P_Price) + "원");
            }
        }

    });
    
    // 옵션 선택시
    $("#optionGoods").click(function(e)
    {
        P_Value = $("#goodsCount").val();
        P_Price = P_Value * 9800;

        if( P_opction == "nikoPet" || P_opction == "rakanPet" || P_opction == "jayaPet" || P_opction == "joyPet")
        {
            P_Price = (P_Value * 9800) + 1000;
            $("#sumPrice").html(numberWithComma(P_Price) + "원");
            if(P_Price == 99000)
            {
                P_Price = (((P_Value * 9800) + 1000) -9000);
                $("#sumPrice").html(numberWithComma(P_Price) + "원");
            }
        }
        else
        {
            P_Price = (P_Value * 9800);
            $("#sumPrice").html(numberWithComma(P_Price) + "원");
        }
    });

    //네비게이션 2번박스 선택시
    $("#rakanImg").click(function(e)
    {
        //나머지 펄스 , 라칸을 선택했으므로 라칸 트루
        niko = false;
        rakan = true;
        jaya = false;
        joy = false;
        //ajax로 보내는 값 라칸을 보냄
        P_Title = "rakan";
        //장바구니 타이틀 변경
        $("#soppingTitle").text("별수호자 라칸 / 색 선택 가능 / 아이콘 선택 가능");
        //옵션 이미지 초기화
        $("#opctionImg").css("opacity", 0);
        //니코 선택시 컬러가 노말만 있기때문에 none 박스로 가려주었음
        //라칸은 컬러 4개가 모두 있으므로 전부 inline-block으로 출력
        $(".noneBox").css("display", "inline-block");
        //일러스트 박스에 이미지 라칸 이미지로 교체
        $("#illustrationBox").css("background-image","url('./img/rakan/rakan_1.jpg')");
        //장바구니창 애니메이션으로 천천히 없어짐
        $("#shoppingCartBox").animate({opacity: 0},300);
        //클릭했을때 쇼핑카트 리셋
        $("#shoppingCartBox").css("display", "none");

        //라칸의 기본값
        $("#goodsCount").val('1');
        $("#CountBox").html("개");
        $("#sumPrice").html(numberWithComma(9800)+"원");
        P_Title = "rakan";
        P_Color = "nomalColor";
        P_opction = "";
        P_Value = $("#goodsCount").val();
        P_Price = 9800;
        //

        //다만 라칸이 트루라면
        if(rakan == true)
        {
            mainGoodsImgChange("rakan", "rakan_Test.jpg");
            $("#goodsImg").css("background-image", "url('./img/rakan/rakan_Croma/rakan_nomal.jpg')");
            $("#illustrationBox").css("background-image","url('./img/rakan/rakan_1.jpg')");
            $(".noneBox").css("display", "inline-block");
            $(".noneBox").css("cursor", "pointer");
            $(".noneBox").css("opacity", 1);
            // console.log("if in");
        }
    });

    $("#nicoImg").click(function(e)
    {
        niko = true;
        rakan = false;
        jaya = false;
        joy = false;
        P_Title = "niko";
        P_Color = "nomalColor";
        P_opction = "";
        P_Value = $("#goodsCount").val();
        P_Price = 9800;

        $("#soppingTitle").text("별수호자 니코 / 색 선택 가능 / 아이콘 선택 가능");
        $("#opctionImg").css("opacity", 0);
        $("#shoppingCartBox").animate({opacity: 0},300);
        $("#shoppingCartBox").css("display", "none");

        $("#goodsCount").val('1');
        $("#CountBox").html('1' + "개");
        $("#sumPrice").html(numberWithComma(9800)+"원");

        if(niko == true)
        {
            mainGoodsImgChange("niko", "nikoimg.jpg");
            $("#illustrationBox").css("background-image", "url('./img/niko/niko_1.jpg')");
            $("#goodsImg").css("background-image", "url('./img/niko/niko_in1.jpg')");
            $(".noneBox").css("opacity", 0.3);
        }

    });

    $("#jayaImg").click(function(e)
    {
        niko = false;
        rakan = false;
        jaya = true;
        joy = false;
        P_Title = "jaya";
        P_Color = "nomalColor";
        P_opction = "";
        P_Value = $("#goodsCount").val();
        P_Price = 9800;

        $("#soppingTitle").text("별수호자 자야 / 색 선택 가능 / 아이콘 선택 가능");
        $("#opctionImg").css("opacity", 0);
        $("#shoppingCartBox").animate({opacity: 0},300);
        $("#shoppingCartBox").css("display", "none");

        $("#goodsCount").val('1');
        $("#CountBox").html('1' + "개");
        $("#sumPrice").html(numberWithComma(9800)+"원");

        if(jaya == true);
        {
            mainGoodsImgChange("jaya", "jayaimg.jpg");
            $("#illustrationBox").css("background-image", "url('./img/jaya/jaya_1.jpg')");
            $("#goodsImg").css("background-image", "url('./img/jaya/jaya_in1.jpg')");
            $(".noneBox").css("display", "inline-block");
            $(".noneBox").css("cursor", "pointer");
            $(".noneBox").css("opacity", 1);
        }
    });

    $("#joyImg").click(function(e)
    {
        niko = false;
        rakan = false;
        jaya = false;
        joy = true;
        P_Title = "joy";
        P_Color = "nomalColor";
        P_opction = "";
        P_Value = $("#goodsCount").val();
        P_Price = 9800;

        $("#soppingTitle").text("별수호자 조이 / 색 선택 가능 / 아이콘 선택 가능");
        $("#opctionImg").css("opacity", 0);
        $("#shoppingCartBox").animate({opacity: 0},300);
        $("#shoppingCartBox").css("display", "none");

        $("#goodsCount").val('1');
        $("#CountBox").html('1' + "개");
        $("#sumPrice").html(numberWithComma(9800)+"원");

        if(joy == true)
        {
            mainGoodsImgChange("joy", "joyimg.jpg");
            $("#illustrationBox").css("background-image", "url('./img/joy/joy_1.jpg')");
            $("#goodsImg").css("background-image", "url('./img/joy/joy_in1.jpg')");
            $(".noneBox").css("display", "inline-block");
            $(".noneBox").css("cursor", "pointer");
            $(".noneBox").css("opacity", 1);
        }
    });

    //니코 펫박스 선택시 
    $("#nikoPetBox").click(function(e)
    {
        //옵션이미지의 오파시티를 기준으로 잡고
        switch ($("#opctionImg").css("opacity")) 
        {
            //오파시티 0일경우
            case "0":
                //옵션이미지 오파시티 1로 바꾸어 주며
                $("#opctionImg").css("opacity", 1);
                //옵션이미지 니코펫의 이미지로 교체
                $("#opctionImg").css("background-image", "url('./img/opction/niko_pet.jpg')");
                //ajax로 보내기 위한 값을 변수에 담음
                P_opction = "nikoPet";
            break;
            //오파시티 1일경우
            case "1":
                //다만 옵션에 니코펫 옵션이 선택되어있다면 즉 다시 클릭했을때
                if(P_opction == "nikoPet") 
                {
                    //오파시티를 0으로 돌려주고
                    $("#opctionImg").css("opacity", 0);
                    $("#opctionImg").css("background-image", "url('./img/opction/niko_pet.jpg')");
                    //값은 공백으로 만들어줌
                    P_opction = "";
                }
                else 
                {
                    //또 다시 클릭되면 다시 옵션을 변수에 담아줌
                    $("#opctionImg").css("background-image", "url('./img/opction/niko_pet.jpg')");
                    P_opction = "nikoPet";
                }
            break;
        }
    });
    
    // 라칸 펫 박스 선택시
    $("#rakanPetBox").click(function(e)
    {
        switch ($("#opctionImg").css("opacity")) 
        {
            case "0":
                $("#opctionImg").css("opacity", 1);
                $("#opctionImg").css("background-image", "url('./img/opction/rakan_pet.jpg')");
                P_opction = "rakanPet";
            break;
            
            case "1":
                if(P_opction == "rakanPet") 
                {
                    $("#opctionImg").css("opacity", 0);
                    $("#opctionImg").css("background-image", "url('./img/opction/rakan_pet.jpg')");
                    P_opction = "";
                }
                else 
                {
                    $("#opctionImg").css("background-image", "url('./img/opction/rakan_pet.jpg')");
                    P_opction = "rakanPet";
                }
            break;
        }
    });
    //자야 펫 박스 선택시
    $("#jayaPetBox").click(function(e)
    {
        switch ($("#opctionImg").css("opacity")) 
        {
            case "0":
                $("#opctionImg").css("opacity", 1);
                $("#opctionImg").css("background-image", "url('./img/opction/jaya_pet.jpg')");
                P_opction = "jayaPet";
            break;
            
            case "1":
                if(P_opction == "jayaPet") 
                {
                    $("#opctionImg").css("opacity", 0);
                    $("#opctionImg").css("background-image", "url('./img/opction/jaya_pet.jpg')");
                    P_opction = "";
                }
                else 
                {
                    $("#opctionImg").css("background-image", "url('./img/opction/jaya_pet.jpg')");
                    P_opction = "jayaPet";
                }
            break;
        }
    });
    //조이 펫 박스 선택시
    $("#joyPetBox").click(function(e)
    {
        switch ($("#opctionImg").css("opacity")) 
        {
            case "0":
                $("#opctionImg").css("opacity", 1);
                $("#opctionImg").css("background-image", "url('./img/opction/joy_pet.jpg')");
                P_opction = "joyPet";
            break;
            
            case "1":
                if(P_opction == "joyPet") 
                {
                    $("#opctionImg").css("opacity", 0);
                    $("#opctionImg").css("background-image", "url('./img/opction/joy_pet.jpg')");
                    P_opction = "";
                }
                else 
                {
                    $("#opctionImg").css("background-image", "url('./img/opction/joy_pet.jpg')");
                    P_opction = "joyPet";
                }
            break;
        }
    });
            
    //노말 컬러 선택시 
    $("#nomalColor").click(function(e)
    {
        P_Color = "nomalColor";

        //노말 컬러를 선택했으며 니코를 선택해서 니코가 트루라면
        if(niko == true)
        {
            //상품 이미지를 니코 노말 컬러로 바꿈 (니코를 노말컬러밖에 없음)
            $("#goodsImg").css("background-image", "url('./img/niko/niko_in1.jpg')");
        }
        //노말컬러이며 라칸을 선택했다면
        if(rakan == true)
        {
            //매개변수로 보낸 값에 따라 이미지를 찾아주는 함수를 사용 하여 이미지 변경
            goodsImgChange("rakan", "rakan_Croma", "rakan_nomal.jpg");
        }
        if(jaya == true)
        {
            goodsImgChange("jaya", "jaya_Croma", "jaya_nomal.jpg");
        }
        if(joy == true)
        {
            goodsImgChange("joy","joy_Croma", "joy_nomal.jpg");
        }
    });

    //색상선택에서 레드컬러를 선택했을경우
    $("#redColor").click(function(e)
    {
        P_Color = "redColor";
        if(niko == true)
        {
            $("#goodsImg").css("background-image", "url('./img/niko/niko_in1.jpg')");
        }
        if(rakan == true)
        {
            goodsImgChange("rakan", "rakan_Croma", "rakan_ruby.jpg");
        }
        if(jaya == true)
        {
            goodsImgChange("jaya", "jaya_Croma", "jaya_ruby.jpg");
        }
        if(joy == true)
        {
            goodsImgChange("joy","joy_Croma", "joy_ruby.jpg");
        }
    });

    //색상선택에서 블루컬러를 선택했을경우
    $("#blueColor").click(function(e)
    {
        P_Color = "blueColor";
        if(niko == true)
        {
            $("#goodsImg").css("background-image", "url('./img/niko/niko_in1.jpg')");
        }
        if(rakan == true)
        {
            goodsImgChange("rakan", "rakan_Croma", "rakan_sapa.jpg");
        }
        if(jaya == true)
        {
            goodsImgChange("jaya", "jaya_Croma", "jaya_sapa.jpg");
        }
        if(joy == true)
        {
            goodsImgChange("joy","joy_Croma", "joy_sapa.jpg");
        }
    });

    $("#purpleColor").click(function(e)
    {
        P_Color = "purpleColor";
        if(niko == true)
        {
            $("#goodsImg").css("background-image", "url('./img/niko/niko_in1.jpg')");
        }
        if(rakan == true)
        {
            goodsImgChange("rakan", "rakan_Croma", "rakan_tuki.jpg");
        }
        if(jaya == true)
        {
            goodsImgChange("jaya", "jaya_Croma", "jaya_tuki.jpg");
        }
        if(joy == true)
        {
            goodsImgChange("joy","joy_Croma", "joy_tuki.jpg");
        }
    });   
    
    //장바구니 x버튼 장바구니 오른쪽 하단에 있음
    $("#closeMove").click(function(e)
    { 
        //클릭하면 장바구니가 천천히 사라짐
        $("#shoppingCartBox").animate({opacity: 0},300);
        //공간을 없애줌
        $("#shoppingCartBox").css("display", "none");
        //체크박스를 초기화시킴
        resetCheckBox();
    });

    //장바구니 담기버튼을 클릭했을때
    $("#addGoodsBox").click(function(e)
    {
        //장바구니 다음 나오는 쇼핑카트를 없던 구역을 다시 만들어주고
        $("#shoppingCartBox").css("display", "block");
        //쇼핑카트가 천천히 나옴
        $("#shoppingCartBox").animate({ opacity: 1 },500);
        //다만 쇼핑카트가 나와있는 상황에서 장바구니 담기 버튼을 클릭했다면
        //토글버튼을 만들어줌
        if($("#shoppingCartBox").css("opacity") == 1 )
        {
            //다시 공간을 없애주고 
            $("#shoppingCartBox").css("display", "none");
            //천천히 사라지게함
            $("#shoppingCartBox").animate({opacity: 0},300);
        }
        // console.log(P_Title, P_Color, P_opction, P_Value, P_Price);

        //담기버튼을 눌렀을때 현재 담겨있는 값을들 변수에 담아줌
        //ajax에 보내기 위함
        ProductAdd(P_Title, P_Color, P_opction, P_Value);
    });

    //장바구니 열기버튼
    $("#openCartBox").click(function(e)
    {
        $("#shoppingCartBox").css("display", "block");
        $("#shoppingCartBox").animate({ opacity: 1 },500);
        if($("#shoppingCartBox").css("opacity") == 1 )
        {
            $("#shoppingCartBox").css("display", "none");
            $("#shoppingCartBox").animate({opacity: 0},300);
        }

        // console.log(P_Title, P_Color, P_opction, P_Value, P_Price);
        setTotalPrice();

    });

    //체크박스 전체선택하기에 반응이 온다면
    $("#allDeleteCheck").change(function(e) 
    {
        //isAllCheck가 트루라면
        if(isAllCheck == true) 
        {
            var i = 0;
            //체크박스의 개수만큼
            while(i < $(".deleteCheck").length)
            {
                //체크박스를 전부 펄스로 바꿈
                $($(".deleteCheck")[i]).prop("checked", false);
                i++;
            }
            isAllCheck = false;
        }    
        //펄스라면   
        else 
        {
            var i = 0;
            //체크박스의 개수만큼
            while(i < $(".deleteCheck").length)
            {
                //체크박스를 전부 트루로 바꿈
                $($(".deleteCheck")[i]).prop("checked", true);
                i++;
            }
            isAllCheck = true;
        }
    });

    //아이디값이 잡히지 않아서 윈도우로 대체함
    $(window).click(function(e) 
    {
        //클릭한 대상의 클래스
        switch ($(e.target).attr("class")) 
        {
            case "deleteCheck":
                var isProductChecked = true;

                //트루라면
                if(isAllCheck == true) 
                {
                    $("#allDeleteCheck").prop("checked", false);
                    isAllCheck = false;
                }
                
                if(isAllCheck == false) 
                {
                    var i = 0;
                    while(i < $(".deleteCheck").length)
                    {
                        //i번째의 체크박스가 체크가 안되어 있을 때
                        if($($(".deleteCheck")[i]).prop("checked") == false) 
                        {
                            isProductChecked = false;
                            break;
                        }
                    
                        i++;
                    }
                    //트루라면
                    if(isProductChecked === true)  
                    {
                        isAllCheck = true;
                        $("#allDeleteCheck").prop("checked", true);
                    }                
                }

                break;
        
            default:
            break;
        }
    })

    //개별 체크박스가 클릭된다면
    $("#selectDelete").click(function(e) 
    {
        
        var i = 0;
        var deleteArr = $(".deleteCheck");
        //체크박스의 갯수만큼 반복
        while(i < $(".deleteCheck").length)
        {
            if($(deleteArr[i]).prop("checked") == true) 
            {
                $($(".deleteCheck")[i]).attr("checked", "checked");
            }
            
            i++;
        }
        //체크박스가 체크라면 태그의 부모의 부모값을 삭제합니다.
        $(".deleteCheck[checked='checked']").parent().parent().remove();
        setTotalPrice();
        resetCheckBox();
    });

    $("#shoppingContinue").click(function(e) 
    {
        console.log("aaaaa");
        $("#shoppingCartBox").animate({opacity: 0},300);
        $("#shoppingCartBox").css("display", "none");

        resetCheckBox();
    });

    $("#selectBuy").click(function(e)
    {
        noticeModal.css("display", "block");
    });
    $("#noticeClose").click(function(e)
    {
        noticeModal.css("display", "none");
    });

    $(".noticeModalBox").click(function(e)
    {
        noticeModal.css("display", "none");
    });

}