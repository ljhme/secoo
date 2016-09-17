/**
 * Created by Administrator on 2016/9/13.
 */
$(document).ready(function () {
    //获取地址栏传过来的id
    function UrlSearch()
    {
        var name,value;
        var str=location.href; //取得地址栏的url
        var num=str.indexOf("?");  //？ 的位置
        str=str.substr(num+1); //取得所有参数  获取？后面的url内容。
        var arr=str.split("&"); //各个参数放到数组里  ["pid=1"]
        for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                name=arr[i].substring(0,num);
                value=arr[i].substr(num+1);
                this[name]=value;
            }
        }
    }
    var mesIndex=new UrlSearch(); //实例化
    var proId=mesIndex.proId;  //商品id
    var userId=mesIndex.userId;  //商品id
    console.log("--------"+proId);
    console.log("--------"+userId);
   if(userId!="undefined"){
        $(".indexLogin").text(userId);
        $(".indexRegist").css("display","none");
        $(".indexExit").css("display","block");
    }


    //通过商品id获取所点击的商品信息

    getProMes();
    function getProMes() {

        //ajax;
        var ajaxUrl = "../product/GetProductById_get";
        var ajaxId = proId;
        $.ajax({
            url: ajaxUrl,
            data: {
                id: ajaxId,
            },
            success:function (returnData) {   //jQuery关于ajax返回获取值的回调函数
                //console.log(returnData);   //参数returnData的值(string类型)：{"Id":"100","Data":"{\"id\":\"100\",\"name\":\"100\",\"price\":\"100\",\"imgsrc\":\"100.jpg\"}"}
                var jsonData = JSON.parse(returnData);   //将值转换成json对象
                //console.log(jsonData);    //Object {Id: "100", Data: "{"id":"100","name":"100","price":"100","imgsrc":"100.jpg"}"}
                //console.log(jsonData.Id);  //获取所得值的Id值

                var data = jsonData.Data;   //string类型，需要转换成对象
                //console.log(data); //{"id":"1212","name":"上衣","price":"230","imgsrc":"123.jpg"}   ,字符串
                var datas = JSON.parse(data);  //转换为json对象
                console.log(datas);  //Object {id: "100", name: "100", price: "100", imgsrc: "100.jpg"}
                console.log(datas.id);
                console.log(datas.name);
                console.log(datas.price);
                console.log(datas.describe);

                $(".moveimg").attr("src","images/proListImg/"+datas.imgsrc);
                $(".proDes").text(datas.describe);
                $(".cecooPriceM").text(datas.price);

                addCart();
                function addCart() {
                    console.log($(".cx span").val()+"----dfgd----");
                    $(".addCart").click(function () {

                        //ajax;
                        var ajaxurl = "../product/CreateUpdateProduct_get";
                        var ajaxId = proId+"s";
                        var ajaxDataJson = {
                            id: ajaxId,
                            name: "购物车",
                            price: datas.price,
                            imgsrc:"15401614.jpg",
                            describe:datas.describe,
                            flag:userId,
                            salemes:"衬衫满2000减300",
                            procolor:"淡蓝   尺码：39  ",
                            count:$(".num").text()
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
                                    alert("修改成功！");
                                }else{
                                    alert("修改失败！");
                                }
                            }
                        });
                    });
                }





            }
        });
    }










    var moveLIst = $(".moveDiv"). find("a");
    for(var i=0;i<moveLIst.length;i++) {
        moveLIst[i].index = i;
        //console.log(i);
        $(moveLIst[1]).mousemove(function () {
            console.log(0);
            if(this.index==0){
                console.log(0);
                $(".moveimg").attr("src","images/detImage/large01.jpg");
            }else if(this.index==1){
                $(".moveimg").attr("src","images/detImage/large02.jpg");
            }
        });
    }


    //动态添加详情页的图片展示
    addDetailPho();
    function addDetailPho() {
        var ajaxUrl = "./data/details.txt";
        $.ajax({
            url:ajaxUrl,
            data:{},
            success:function (returnData) {
                console.log(returnData.length); //7
                for(var i=0;i<returnData.length;i++){
                    console.log(returnData[i].imgSrc);
                    var p = $("<p></p>").appendTo(".moudle_pho");
                    $("<img>").appendTo(p).attr("src","img/details/"+returnData[i].imgSrc);
                }
            },
            type:"get",
            dataType:"json"
        });
    }



    /*function gotoCart() {
        $()
        window.location.href="detail.html?proId="+proId+"&"+userId;
    }*/



});