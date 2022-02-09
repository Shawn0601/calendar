//儲存目前的主題色彩名稱、主色碼、副色碼
let currentColor = { 
  name : "blue", 
  color : "#1B19CD", 
  off_color : "#7c7EFB" 
};
let color_data = [
  {
      name: 'blue',
      color_code: '#1B19CD',
      off_color_code: '#7C7EFB'
  }, {
      name: 'red',
      color_code: '#D01212',
      off_color_code: '#EEA19B'
  }, {
      name: 'purple',
      color_code: '#721D89',
      off_color_code: '#EBADFB'
  }, {
      name: 'green',
      color_code: '#158348',
      off_color_code: '#57C664'
  }, {
      name: 'orange',
      color_code: '#EE742D',
      off_color_code: '#F7A77A'
  }, {
      name: 'deep-orange',
      color_code: '#F13C26',
      off_color_code: '#F77D59'
  }, {
      name: 'baby-blue',
      color_code: '#31B2FC',
      off_color_code: '#3D8DD9'
  }, {
      name: 'cerise',
      color_code: '#EA3D69',
      off_color_code: '#FCBECC'
  }, {
      name: 'lime',
      color_code: '#2ACC32',
      off_color_code: '#4FFA4F'
  }, {
      name: 'teal',
      color_code: '#2FCCB9',
      off_color_code: '#7FE7E3'
  }, {
      name: 'pink',
      color_code: '#F50D7A',
      off_color_code: '#FFB9EA'
  }, {
      name: 'black',
      color_code: '#212524',
      off_color_code: '#687E7B'
  }
];

function changeColor(){
  //將currentColor.name更新到資料庫
  ajax( 
    {
      color:currentColor.name
    }
  );
  
  for (let i = 0; i < color_data.length; i++){ //循序搜尋
    if( currentColor.name == color_data[i].name) { //Bingo 找到選中的色彩！
      currentColor.color = color_data[i].color_code ;
      currentColor.off_color = color_data[i].off_color_code ;
      break; //中斷循序搜尋迴圈
    }
  }

  //開始找出元素中有設置color跟off_color的類別屬性

  let elements;
  elements = document.getElementsByTagName("td");
  for(let i=0; i < elements.length; i++) {
        // elements[i].style = null;
        elements[i].removeAttribute('style');
  }

  elements = document.getElementsByClassName('color');
  for (let i = 0; i < elements.length;i++){
    elements[i].style.backgroundColor = currentColor.color;
  }

  elements = document.getElementsByClassName('off-color');
  for (let i = 0; i < elements.length;i++){
    elements[i].style.color = currentColor.off_color;
  }

  elements = document.getElementsByClassName('border-color');
  for (let i = 0; i < elements.length;i++){
    elements[i].style.borderColor = currentColor.color;
  }


  closeFavColor();
}

function addCheckMark(color_name){
  currentColor.name = color_name; //將目前選中的色彩名稱儲存在currentColor這個物件中的name
  var colorPreviews = document.getElementsByClassName("color-preview");
  for (let i = 0; i < colorPreviews.length; i++){
    colorPreviews[i].innerHTML = "";
  }
  for (let i = 0; i < colorPreviews.length; i++){
    if (colorPreviews[i].id == color_name) {        
      colorPreviews[i].innerHTML = "<i class='fas fa-check checkmark'></i>";
      break;//如果一個元素找到了，就不用再做後面的元素，直接中斷迴圈…
    }
  }
}

function getUID(year, month, day){
if (month == -1) { //上個月減1，進到去年份
  month = 11;
  year--;
}
if (month == 12) { //下個月加1，進到下年份
  month = 0;
  year++;
}
// console.log(month.toString() + year.toString() + day.toString())
//Year放中間的目的是Year是固定4位數，月份跟天是1~2位數不定，若採Y+M+D有可能不同的日子會有相同的uid產生，例：
//uid:2021123可能解讀為1月23日或12月3日
return month.toString() + year.toString() + day.toString();
}  

//記事圖示與ToolTip處理
function appendSpriteToCellAndTooltip(uid, elem){
for(let i = 0; i < postIts.length; i++){
    if(uid == postIts[i].id){
        elem.innerHTML += `<img src='images/note${postIts[i].note_num}.png' alt='A post-it note'>`;
        elem.classList.add("tooltip");
        elem.innerHTML += `<span>${postIts[i].note}</span>`;
        return;
    }
}
}
//求這年這月1日是禮拜幾，作法：
//第一步：先用new Date()建立這日的日期物件，透過這個日期物件算出這年這月。
//第二步：再用new Date(這年,這月,1)建立這年這月1日的日期物件
//第三步：再用第二步建立的日期物件算出該日期是禮拜幾

// 填某年某月的日期表格函式
function fillInMonth(thisYear, thisMonth){
  //改表格中的年與月標題
  document.getElementById("cal-year").innerHTML = thisYear;
  document.getElementById("cal-month").innerHTML = getMonthName( thisMonth );

  //清除原先表格中的：1．今日的灰色方塊
  let el = document.getElementById("current-day");
  if (el != null) el.removeAttribute("id");

  let firstDate = new Date(thisYear, thisMonth, 1); //第二步
  let firstDay = firstDate.getDay(); //第三步

  //建立月份的天數
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ( thisYear % 400 == 0  || (thisYear % 4 == 0 && thisYear % 100 !=0)) monthDays[1] = 29;

  let days = document.getElementsByTagName("td");

  //清除原先表格中的：2．表格元素class屬性裏的"color", "prev-month-last-day"字串
  for (let i = 0; i < days.length; i++) {
    days[i].classList.remove("color"); 
    days[i].classList.remove("prev-month-last-day"); 
    days[i].classList.remove("tooltip");  
  }

  //對今年今月今日的元素加上id="current-day"
  if (thisYear == today.getFullYear() && thisMonth == today.getMonth()){
    let thisDay = today.getDate();
    days[firstDay + thisDay - 1].setAttribute("id", "current-day");
  }

  //填今月的日期 1~今月的最後一天(今月的天數)
  for(let i = firstDay, d = 1; d <= monthDays[thisMonth]; i++, d++) {    
    days[i].innerHTML = d;
    let uid = getUID(thisYear, thisMonth, d);
    days[i].setAttribute("data-uid", uid);
    appendSpriteToCellAndTooltip(uid, days[i]);
  }

  if(firstDay > 0) { //firstDay如果是0的時候，表示是禮拜日，已到格子的最左邊
    days[firstDay - 1].classList.add("prev-month-last-day");
  }
  //填上月的日期：Days[firstDay-1]開始填(上個月最後一天/天數)，之後遞減，一直到Days[0]
  for (let i = firstDay-1, d=monthDays[ (thisMonth + 11) % 12 ]; i >= 0; i--, d--) {
    days[i].innerHTML = d;
    days[i].classList.add("color");
    let uid = getUID(thisYear, thisMonth-1, d);
    days[i].setAttribute("data-uid", uid);
    appendSpriteToCellAndTooltip(uid, days[i]);
  }  

  //填下月的日期：Days[firstDay+這月的天數]開始填d=1，之後遞增，一直到Days[41]
  for(let i = firstDay + monthDays[thisMonth], d = 1; i <= 41; i++, d++) {
    days[i].innerHTML = d;
    days[i].classList.add("color");
    let uid = getUID(thisYear, thisMonth+1, d);
    days[i].setAttribute("data-uid", uid);
    appendSpriteToCellAndTooltip(uid, days[i]);
  }
  changeColor();
}

function previousMonth(){
  thisMonth--; //對thisMonth減1
  if(thisMonth == -1) { //上年度
    thisYear--;
    thisMonth = 11;
  }
  fillInMonth(thisYear, thisMonth);
  // console.log("你按了上個月的按鈕…");
}
function nextMonth(){
  thisMonth++; //對thisMonth加1
  if(thisMonth == 12) { //下年度
    thisYear++;
    thisMonth = 0;
  }
  fillInMonth(thisYear, thisMonth);    
  // console.log("你按了下個月的按鈕…");
}
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37: previousMonth(); break;
    case 39: nextMonth(); break;
  }
};  

// 打開色彩主題的對話方塊
function openFavColor(){
let modal = document.getElementById("modal");
modal.open = true; //為modal元素加上一個沒有值的open屬性
let template = document.getElementById("fav-color");
// template.removeAttribute("hidden");
template.hidden = false; //為template元素移除掉一個hidden屬性
}

// 關閉色彩主題的對話方塊
function closeFavColor(){
let modal = document.getElementById("modal");
modal.open = false;
let template = document.getElementById("fav-color");
// template.setAttribute("hidden", "");
template.hidden = true;
}
  