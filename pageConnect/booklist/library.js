window.onload = function()
{
    $("#searchModalBtn").click(function(e)
    {
        $("#contentBox").html("");
        var searchData = {
            searchType : $("#searchType").val(),
            searchText : $("#searchText").val(),
            jsAjax : 1
        }

        $.ajax({
            dataType : 'json',
            type : "POST",
            url : './php/searchBook.php',
            data : searchData,
            success : function(response)
            {
                if(response['result'] == true)
                {
                    console.log(response);

                    let i = 0;
                    while(i < response['BOOKLIST'].length)
                    {
                        let appendText = `
                        <div class="col-sm-4">
                        <a class="btnReset">
                        <img src="./files/${response['BOOKLIST'][i].TEMP_IMG_NAME}" alt="bookImg${i}" class="allbook">
                        <div class="textInfoBox">
                        <p>${response['BOOKLIST'][i].TITLE}</p>
                        <p>${response['BOOKLIST'][i].AUTHOR}</p>
                        <p>${response['BOOKLIST'][i].SUMMARY}</p>
                        </div>
                        </div>
                        `
                        $("#contentBox").append(appendText);

                        i++;
                    }
                }
            }
        })
    });
    $(document).ready(function()
    {
               
    });
}
