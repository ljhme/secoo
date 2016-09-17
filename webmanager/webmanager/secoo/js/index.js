/**
 * Created by Administrator on 2016/9/8.
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
    /*if(loginId){
        $(".indexLogin").text(loginId);
        $(".indexRegist").css("display","none");
        $(".indexExit").css("display","block");
    }*/







    //鼠标进去图片左移动效果实现
    phoLeft();
    function phoLeft() {
        var posiLeftList = $(".posiLeft");
        //console.log(posiLeftList.length);

        $(".posiLeft").mouseenter(function () {
            for(var i=0;i<posiLeftList.length;i++){
                $(this).animate({
                    left:"-80px",
                },50);
            }
        });
        $(".posiLeft").mouseleave(function () {
            $(".posiLeft").animate({
                left:"0",
            },50);
        });
    }

    //猜你喜欢动态
    var timer;
    var copylike = $(".like-pro").clone().appendTo(".like-cen");
    console.log(copylike);
    copylike.css({
        left:"-2070px",
    });
    moveLike($(".like-pro").eq(0));
    moveLike(copylike);

    function moveLike(obj) {
        obj.animate({
            left:"+=230"
        },1000,function () {
            if(obj.offset().left>=2070){
                obj.css("left","-2070px");
            }
            moveLike(obj);
        });
    }


    //点击商品跳转
    gotoRroList();
    function gotoRroList() {
        /*console.log(loginId);
        var listRaList = $(".listRa");
        for(var i=0;i<listRaList.length;i++){
            listRaList[i].index = i;
            listRaList[i].click(function () {
                console.log("进来第二层");
                window.location.href = "proList.html?id=" + loginId;
            })
        }*/
       $(".listRa").click(function () {
           window.location.href = "proList.html?id="+loginId;
       })
    }

});