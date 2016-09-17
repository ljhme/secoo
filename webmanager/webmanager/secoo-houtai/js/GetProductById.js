/**
 * Created by Administrator on 2016/9/5.
 */
$(document).ready(function () {
    $("#select").click(function () {
        //ajax;
        var ajaxUrl = "../product/GetProductById_get";
        var ajaxId = $("#productId").val();

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
                //console.log(datas);  //Object {id: "100", name: "100", price: "100", imgsrc: "100.jpg"}
                //console.log(datas.id);  //100
                //console.log(datas.name);  //100
                //console.log(datas.price); //100
                var Opro = document.getElementById("productInfo");
                createLIst();
                function createLIst() {
                    for(var i=0;i<6;i++){
                        var p = document.createElement("p");
                        if(i==0){
                            p.innerHTML = datas.id;
                            Opro.appendChild(p);
                        }else if(i==1){
                            p.innerHTML = datas.name;
                            Opro.appendChild(p);
                        }else if(i==2){
                            p.innerHTML = datas.price;
                            Opro.appendChild(p);
                        }else if(i==3){
                            p.innerHTML = datas.imgsrc;
                            Opro.appendChild(p);
                        }else if(i==4){
                            p.innerHTML = datas.describe;
                            Opro.appendChild(p);
                        }else{
                            p.className = "caozuo"
                            p.innerHTML = "";
                            Opro.appendChild(p);

                            var span1 = document.createElement("span");
                            span1.innerHTML = "修改  ";
                            span1.style.cursor="pointer";
                            span1.style.color="#8A2BE2";
                            span1.onclick = function () {
                                window.location.href="updateProducts.html?id="+datas.id;
                            }
                            var span2 = document.createElement("span");
                            span2.innerHTML = "删除";
                            span2.style.cursor="pointer";
                            span2.style.color="red";
                            span2.onclick = function () {
                                window.location.href="updateProducts.html?id="+datas.id;
                            }
                            $(".caozuo").append(span1);
                            $(".caozuo").append(span2);


                        }
                    }

                }







            }
        });
    })
});