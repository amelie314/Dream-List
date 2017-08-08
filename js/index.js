//新增一個商品清單的物件
var items = [
  {name: " Surfboard ",price: 3000,number: 0},
  {name: " Island ",price: 90000,number: 0},
  {name: " iMac  ",price: 54555,number: 0},
  {name: " Juicebar",price: 32000,number: 0},
  {name: " Health ",price: 5000,number: 0},
  {name:" Airplane",price: 4000,number: 0}
];

//定義元素用的html模板，{{名稱}}代表要套入的地方
var htmlList = "<li>{{name}}<div class='price'>${{price}}</div><button class='minus' id='{{minusID}}'>－</button><div class='num'>{{number}}</div><button class='pulse' id='{{pulseID}}'>＋</button><button class='del' id='{{delID}}'>✖</button></li>"

var htmlTotal = "<li class='total'><span class=total-title>TOTAL</span><div class='price'><span class=total-title>${{totalPrice}}</span></div><button id='order'>Order it!</button></li>"

var htmlList = "<li>{{name}}<div class='price'>${{price}}</div><button class='minus' id='{{minusID}}'>－</button><div class='num'>{{number}}</div><button class='pulse' id='{{pulseID}}'>＋</button><button class='del' id='{{delID}}'>✖</button></li>"

var htmlTotal = "<li class='total'><span class=total-title>TOTAL</span><div class='price'><span class=total-title>${{totalPrice}}</span></div><button id='order'>Order it!</button></li>"

var totalPrice = 0;

function showlist() {

  //clean out
  $("#list").html("");
  var totalPrice = 0;

  for (i = 0; i < items.length; i++) {
    var replaceHtmlList = htmlList
      .replace("{{price}}", items[i].price)
      .replace("{{name}}", items[i].name)
      .replace("{{number}}", items[i].number)
      .replace("{{delID}}", "del" + i)
      .replace("{{pulseID}}", "pulse" + i)
      .replace("{{minusID}}", "minus" + i);
    
    if (items[i].number > 0) {
      $("#list").append(replaceHtmlList);
    }
    


    totalPrice += parseInt(items[i].price) * parseInt(items[i].number);
    var replaceHtmlTotal = htmlTotal
      .replace("{{totalPrice}}", totalPrice);
  }
  
  if(totalPrice>1000){
    $("#message").css("opacity","1");
    showlist();
  }

  $("#list").append(replaceHtmlTotal);
  
  $("#order").click(
      function(){
        $(".tks").fadeIn();
        //random order number
        var orderNumber=Math.floor((Math.random() * 100) + 1);
        $(".number-area").text(orderNumber);
      }
    );
  

  
  
  //minus
  for(m=0;m<6;m++){
    var tempMinus=function(tempM){
      $("#minus"+tempM).click(
        function(){
          //items[0]=items[0]-1
          items[tempM].number--;
          showlist();
        }
      );
    }
    tempMinus(m);
  }
  
  //pulse
  for(p=0;p<6;p++){
    var tempPulse = function(tempP){
      $("#pulse"+tempP).click(
        function(){
          items[tempP].number++;
          showlist();
        }
      );
    }
    tempPulse(p);
  }
  
  //delete
  
  for(d=0;d<6;d++){
    var tempDelete=function(tempD){
      $("#del"+tempD).click(
        function(){
          items[tempD].number=0;
          showlist();
        }
      );
    }
    tempDelete(d);
  }

}

showlist();

//get the menu
for (j = 0; j < 6; j++) {
  //因為for迴圈跑完之後，i這個變數會消失，所以items[i]會抓不到東西，解法: 使用一個臨時的函數，把參數丟進去執行就可以了(參數會複製保存下來)
  var tempFunction = function(tempVar) {
    $("#" + tempVar).click(
      function() {
        items[tempVar].number++;
        showlist();
      }
    )
  }
  tempFunction(j);
}

 //tks pop up