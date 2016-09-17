/**
 * Created by Administrator on 2016/9/14.
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
    if(loginId!="undefined"){
        $(".indexLogin").text(loginId);
        $(".indexRegist").css("display","none");
        $(".indexExit").css("display","block");
    }else{
        $(".indexRegist").css("display","block");
        $(".indexExit").css("display","none");
    }




    //点击logo的返回首页
    gotoIndex();
    function gotoIndex() {
        $(".logo").click(function () {
            window.location.href = "index.html?id="+loginId;
        });
    }


    //鼠标进入时左边列表栏的隐藏与显示
    leftListChange();
    function leftListChange() {
        //鼠标进入
        $('.listMains').mousemove(function () {
            $('.listDivs').css("display","block");
            $('.changeJ').css("display","none");
            $('.changeJs').css("display","inline-block");
            $(".float-list").css("z-index","91");
        });
        $('.float-lists').mouseleave(function () {
            $('.listDivs').css("display","none");
            $('.changeJs').css("display","none");
            $('.changeJ').css("display","inline-block");
            $(".float-list").css("z-index","0");
            $(".listDiv").css("z-index","0");
        });

        var dlList = $('.lists');

        console.log(dlList[0]);

         dlList.mousemove(function () {
             $(this).css({
                 "background-color":"#fff",
                 "border-left":"2px solid #463b7f",
                 "width":"171px",
             });
             $(this).find("a").css("color","#000");
        })

        for(var i=0;i<dlList.length;i++) {
            dlList[i].index = i;
            $(dlList[i]).mouseleave(function () {
                if(this.index%2==0){
                    $(this).css({
                            "background-color":"#463b7f",
                            "border-left":"none",
                            "width":"173px",
                        });
                    $(this).find("a").css("color","#fff");

                }else{
                    $(this).css({
                        "background-color":"#382f6b",
                        "border-left":"none",
                        "width":"173px",
                    });
                    $(this).find("a").css("color","#fff");
                }
            })
        }
    }


    //地图变换

    mapMove();
    function mapMove() {
        var fanvoffsetObj = $(".fnav").offset().top-494;
        //console.log("--地图的高度---"+fanvoffsetObj);
        $(document).scroll(function () {

            var scroll = $(document).scrollTop();
            //console.log(scroll);
            //console.log("___"+fanvoffsetObj.top);
            if(scroll>=fanvoffsetObj){
                $(".fnav").animate({
                    "background-position-x":"780px",
                },800);
            }else{
                $(".fnav").css({
                    "background-position-x":"0",
                });
            }
        });
    }

    //查看购物车
    lookCart();
    function lookCart() {
        $(".sCart").click(function () {
            window.location.href="cart.html?userId="+loginId;
        })
    }







});