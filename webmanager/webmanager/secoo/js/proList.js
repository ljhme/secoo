/**
 * Created by Administrator on 2016/9/15.
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
    var loginIndex=new UrlSearch(); //实例化
    var loginId=loginIndex.id;  //用户名
    console.log(loginId);
   /* if(loginId){
        $(".indexLogin").text(loginId);
        $(".indexRegist").css("display","none");
        $(".indexExit").css("display","block");
    }*/


    //动态添加数据并渲染到页面上
    var liArr = [];
    getProducts(80,1);
    function getProducts(ajaxPageSize,ajaxPageIndex) {   //获取商品
        //ajax;
        var ajaxUrl = "../product/GetProductsByPage_get";
        $.ajax({
            url: ajaxUrl,
            data: {
                pagesize:ajaxPageSize,
                pageindex:ajaxPageIndex
            },
            success:function (returnData) {   //jQuery关于ajax返回获取值的回调函数
                //console.log(returnData);
                //console.log(typeof(returnData));  //string,需要转换成对象
                //参数returnData的值：
                // /[{"Id":"11","Data":"{\"id\":\"11\",\"name\":\"gao\",\"price\":\"12\",\"imgSrc\":\"1.jpg\"}"},
                // {"Id":"1","Data":"1231312123"},
                // {"Id":"100","Data":"{\"id\":\"100\",\"name\":\"100\",\"price\":\"100\",\"imgsrc\":\"100.jpg\"}"}]

                var jsonData = JSON.parse(returnData);  //转换为json对象
                //console.log(jsonData);   //[Object, Object, Object]


                var shirtArr = [];
                var knitwearArr = [];
                var coatArr = [];
                var useDataArr = [];

                for(var i=0;i<jsonData.length;i++) {
                    //console.log(jsonData[i].Id);
                    var data = jsonData[i].Data;
                    var datas = JSON.parse(data);  //转换为对象
                    if(datas.flag=="男士秋季")
                    {
                        useDataArr.push(datas);
                    }
                }
                console.log(useDataArr);
                for(var i=0;i<useDataArr.length;i++){
                    if (useDataArr[i].name == "衬衫") {
                        shirtArr.push(useDataArr[i].name);
                    }else if(useDataArr[i].name == "针织衫"){
                        knitwearArr.push(useDataArr[i].name);
                    }else if(useDataArr[i].name == "外套"){
                        coatArr.push(useDataArr[i].name);
                    }

                }
                console.log(shirtArr.length);
                console.log(knitwearArr.length);
                console.log(coatArr.length);
                var shirtCount = shirtArr.length;
                var knitwearCount = knitwearArr.length;
                var coatCount = coatArr.length;


                for(var i=0;i<useDataArr.length;i++){
                    console.log(useDataArr[i].name+"--------"+useDataArr[i].imgsrc+"-----"+useDataArr[i].describe+"----"+useDataArr[i].price);
                    var oUlS = $(".proListS_ul");
                    var oUlK = $(".proListK_ul");
                    var oUlC = $(".proListC_ul");
                    var oLi = $("<li></li>");
                    liArr.push(useDataArr[i].id);
                    if(i<shirtCount){
                        oLi.appendTo(oUlS);
                    }else if(i>=(shirtCount)&&i<(shirtCount+knitwearCount)){
                        oLi.appendTo(oUlK);
                    }else if(i>=(knitwearCount)&&i<(shirtCount+knitwearCount+coatCount)){
                        oLi.appendTo(oUlC);
                    }
                    var imgBox = $("<div></div>").appendTo(oLi).addClass("img-box");
                    var oa = $("<a></a>").appendTo(imgBox);
                    var imgshade = $("<div></div>").appendTo(oa).addClass("img-shade");
                    var oImg = $("<img>").appendTo(oa).attr("src","images/proListImg/"+useDataArr[i].imgsrc);
                    var op1 =$("<p></p>").appendTo(oLi).addClass("name-box");
                    var op1a = $("<a></a>").appendTo(op1).text(useDataArr[i].describe).mouseover(function () {
                        $(this).css({
                            "color":"#DC143C",
                            "cursor":"pointer"
                        }).mouseleave(function () {
                            $(this).css("color","#666");
                        });
                    });

                    var op2 = $("<p></p>").appendTo(oLi).addClass("price-box");
                    var ospan = $("<span></span>").appendTo(op2).addClass("price").text("￥");
                    var ospan = $("<span></span>").appendTo(op2).addClass("price").text(useDataArr[i].price);

                }
                clickLi();
                stairs();
            }
        });
    }




    //右下角楼梯
    function stairs() {
        var oPro_ShirtTop = $(".pro_Shirt").offset().top;   //衬衫层的高度203
        //console.log(oPro_ShirtTop);
        var oPro_KnitwearTop = $(".pro_Knitewar").offset().top;  //针织衫层的高度
        //console.log(oPro_KnitwearTop);
        var oPro_CoatTop = $(".pro_Coat").offset().top;  //外套层层的高度
        //console.log(oPro_CoatTop);
        var firstTop = 0;
        $(document).scroll(function () {
            var scrollTop = $(document).scrollTop();   //滚动条的高度
            //console.log(scrollTop);
            if(scrollTop<=oPro_ShirtTop){
                $(".listStairs").stop().animate({
                    top:"1200px",
                    opacity: "0.1",
                    display:"none"
                },1000);
            } else if(scrollTop>oPro_ShirtTop){
                $(".listStairs").css("display","block").stop().animate({
                    top:"600px",
                    opacity: "0.9"
                },1000);
            }
        });

        var stairsList = $(".steps");
        function gogoStairs(stairsHeight) {
            $("html,body").animate({
                "scrollTop":stairsHeight,
            },300);
        }
        for(var i=0;i<stairsList.length;i++){
            stairsList[i].index = i;
            $(stairsList[i]).mouseover(function () {
                $(this).css({
                    color:"red",
                    opacity:"1"
                })
            }).mouseleave(function () {
                $(this).css({
                    color:"#666",
                    opacity:"0.9"
                })
            }).click(function () {
                switch (this.index){
                    case 0:
                        gogoStairs(oPro_ShirtTop);
                        break;
                    case 1:
                        gogoStairs(oPro_KnitwearTop);
                        break;
                    case 2:
                        gogoStairs(oPro_CoatTop);
                        break;
                    case 4:
                        gogoStairs(firstTop);
                        break;
                    default :
                        break;
                }
            });
        }
    }



    function clickLi() {
        var oLilist = $("li");
        console.log(oLilist);
        console.log(liArr);

        for(var i=0;i<oLilist.length;i++){
            oLilist[i].index = i;
            console.log(oLilist[i]);

            oLilist.mouseover(function () {
                $(this).css({
                    "background":"#F0F8FF",
                    "cursor":"pointer"
                });
                $(this).find(".img-shade").animate({
                    left:"300px",
                    opacity:"0"
                },500);
            }).mouseout(function () {
                $(this).css({
                    "background":"#FFF"
                });
                $(this).find(".img-shade").stop().css({
                    left:"-280px",
                    opacity:"0.4"
                });
            }).click(function () {
                console.log(liArr[this.index]);
                window.location.href="detail.html?proId="+liArr[this.index]+"&userId="+loginId;
            });

        }
    }


});