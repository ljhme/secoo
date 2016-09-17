/**
 * Created by Administrator on 2016/9/5.
 */
//如果有该商品，则进行修改，如果没有就添加
$(document).ready(function () {
    $("#updatePBtn").attr({"disabled":"disabled"}).css({"background":"none","border-color":"red","cursor":"none"});
    $("#addPBtn").click(function () {
        //ajax;
        var ajaxurl = "../product/CreateUpdateProduct_get";
        var ajaxId = $("#productId").val();
        var ajaxDataJson = {
            id: ajaxId,
            name: $("#productName").val(),
            price: $("#productPrice").val(),
            imgsrc:$("#productImg").val(),
            describe:$("#productDescribe").val(),
            flag:$("#productFlag").val(),
            largerimg:$("#detLargeImg").val(),
            salemes:$("#saleMes").val(),
            larger01:$("#largeImgDel01").val(),
            larger02:$("#largeImgDel02").val(),
            larger03:$("#largeImgDel03").val(),
            larger04:$("#largeImgDel04").val(),
            larger05:$("#largeImgDel05").val(),
            procolor:$("#proColor").val()

        }

        var dataStr = JSON.stringify(ajaxDataJson); //将对象转换为string类型
        console.log(typeof(dataStr));   //string


        $.ajax({   //启动一个ajax
            url: ajaxurl,
            data: {
                id: ajaxId,
                datajson: dataStr
            },
            success:function (returnData) {
                if(returnData==1){
                    $("#tishi").text("添加成功！");
                }else{
                    $("#tishi").text("添加失败！");
                }
            }
        });
    })
});
