/**
 * Created by Administrator on 2016/9/17.
 */
$(document).ready(function () {


    var danjiaArr = [];
    var oProtr = $(".protr");
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
    var userIndex=new UrlSearch(); //实例化
    var userId=userIndex.userId;  //用户名
    console.log(userId);


    if(userId!="undefined"){
        $(".nullCart").css("display","none");
        $(".cartHave").css("display","block");
        getProducts(1000,1);
    }else{
        $(".nullCart").css("display","block");
        $(".cartHave").css("display","none");
    }





    //获取数据并渲染


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


                var cartDataArr = [];

                for(var i=0;i<jsonData.length;i++) {
                    //console.log(jsonData[i].Id);
                    var data = jsonData[i].Data;
                    var datas = JSON.parse(data);  //转换为对象

                    if(datas.flag==userId)
                    {
                        cartDataArr.push(datas);
                    }
                }
                console.log(cartDataArr);

                for(var i=0;i<cartDataArr.length;i++){
                    console.log(cartDataArr[i].salemes+"--------"+cartDataArr[i].imgsrc+"-----"+cartDataArr[i].describe+"----"+cartDataArr[i].price+"----"+cartDataArr[i].count+"----"+cartDataArr[i].procolor);
                    var eachpricestr = cartDataArr[i].price;
                    var each01 = eachpricestr.split(",");
                    console.log(each01);
                    var priceStr = each01[0]+each01[1];
                    console.log(priceStr);



                    var eachall = parseInt(cartDataArr[i].count)*parseInt(priceStr);
                    danjiaArr.push(eachall);
                    var tTitle = $('<tr class="otil"> <th><input class="checkBox" value="promotionId1843"  type="checkbox"></th> <th colspan="5" width="762" align="left"> <span class="ctTinp02 ">满额减</span> <b class="padLeft10"><span class="padLeft10 color666">'+
                    cartDataArr[i].salemes+'</span></b> <span class="padLeft10 color666">'+cartDataArr[i].salemes+
                        '</span> </th> <th width="110"><strong class="colore93"><span class="rmb colore93"></span><span class="eachall">'+eachall+'</span>元</strong></th> <th align="left"> </th></tr>');
                    tTitle.appendTo(oProtr);

                    var tMainmes = $('<tr class="omins" name="cartRow"> <td><input class="checkBox" value="15401614_0"  type="checkbox"></td> <td width="97" valign="top"> <div class="cartPic fl padRight15"> <a href="#" target="_blank"><img src="images/cartImg/'
                        +cartDataArr[i].imgsrc+'" alt="【16年秋季新品】ARMANI COLLEZIONI/阿玛尼卡尔兹-男士淡蓝色白色棉质长袖衬衫(两件装）" width="80" height="80"></a> </div> </td> <td valign="top"> <div class="cartNames fl"> <p class="namePro"><a href="#" target="_blank">'
                        +cartDataArr[i].describe+'</a></p></div> <div class="cartNames fl" style="overflow:visible"> <p class="namePro color999 pad45">'
                        +cartDataArr[i].procolor+'</p> </div> </td> <td valign="top">中国大陆</td> <td valign="top"><span class="rmb">¥</span>'
                        +cartDataArr[i].price+'</td> <td valign="top"> <div class="countNum"> <div class="cPlus fl" action="decrease">-</div> <div class="cInput fl"><input class="Num" type="text" name="quantity" value="'+
                        cartDataArr[i].count+'"></div> <div class="cMinus fl">+</div> </div> </td> <td valign="top"> </td> <td valign="top"><a href="###" class="del" name="deleteRow">删除</a></td> </tr>');

                    tMainmes.appendTo(oProtr);

                }
                Change();
            }
        });
    }


    //操作
    function Change() {
        var cPlus = $(".cPlus");
        var cIput = $(".eachall");
        var cMinus = $(".cMinus");
        var Numlist = $(".Num");
        var tTitles = $(".otil");
        var tMains = $(".omins");
        var delList = $(".del");

        console.log(tTitles);
        console.log(oProtr);
        for(var i=0;i<cPlus.length;i++){
            cPlus[i].index = i;
            $(cPlus[i]).click(function () {
                var curPriceAll = parseInt($(cIput[this.index]).text());
                var curNum = Numlist.eq(this.index).val();
                curNum--;
                Numlist.eq(this.index).val(curNum);
                //console.log(curPriceAll);
                curPriceAll-=danjiaArr[this.index];
                //console.log(curPriceAll);
                cIput.eq(this.index).text(curPriceAll);
                console.log(tTitles.eq(this.index));
                console.log(tMains.eq(this.index));


                if(curNum<=0){
                    tTitles.eq(this.index).remove();
                    tMains.eq(this.index).remove();

                   // $(".protr").remove( '.otil:eq('+this.index+')');
                    //$(".protr").remove( '.omins:eq('+this.index+')');
                }

            })
        }
        for(var i=0;i<cMinus.length;i++){
            cMinus[i].index = i;
            $(cMinus[i]).click(function () {
                var curPriceAll = parseInt($(cIput[this.index]).text());
                var curNum = Numlist.eq(this.index).val();
                curNum++;
                Numlist.eq(this.index).val(curNum);
                //console.log(curPriceAll);
                curPriceAll+=danjiaArr[this.index];
                //console.log(curPriceAll);
                cIput.eq(this.index).text(curPriceAll);

            })
        }


        for(var i=0;i<delList.length;i++){
            delList[i].index = i;
            $(delList[i]).click(function () {
                tTitles.eq(this.index).remove();
                tMains.eq(this.index).remove();
            });
        }


        $(".choseAlls").click(function () {
            var flag = true;
            if(flag){
                $(".checkBox").attr("checked","checked");
                $(".haveCount").text(cPlus.length);
                $(".packgeCount").text(cPlus.length);
                $(".kubi").text(cPlus.length*200);
                var total = 0;
                for(var i=0;i<cIput.length;i++){
                    total+=parseInt(cIput.eq(i).text());
                }
                $(".allmoney").text(total);
                $(".a02dis").css("cursor","pointer");
                flag = false;
            }else{
                $(".checkBox").attr("checked","");
                $(".haveCount").text(0);
                $(".packgeCount").text(0);
                $(".kubi").text(0);
                $(".allmoney").text(0);
                $(".a02dis").css("cursor","cursor: not-allowed;");
                flag = true;
            }

        })








    }































});