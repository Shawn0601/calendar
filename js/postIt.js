var postIts = []; //記事陣列，用來放置月曆中的記事物件資料
  //current 目前點擊的日期
let currentPostItID = 0; //目前的記事ID
let newCurrentPostIt = false; //目前的記事是否為新？也就是：目前點選的日期尚未有任何的記事資料
let currentPostItIndex = 0; //目前的記事在postIts陣列中的位置索引

//打開記事的對話方塊
function openMakeNote() {
    let modal = document.getElementById("modal");
    modal.open = true; //為modal元素加上一個沒有值的屬性
    let template = document.getElementById("make-note");
    template.hidden = false;
    if(!newCurrentPostIt){
        document.getElementById("edit-post-it").value = postIts[currentPostItIndex].note;
    }
    document.getElementById("edit-post-it").focus(); //游標跳至文字輸入方塊中
  }
  
  //關閉
  function closeMakeNote() {
    let modal = document.getElementById("modal");
    modal.open = false;
    let template = document.getElementById("make-note");
    template.hidden = true;
  }

  function currentDayHasNote(uid){ //測試特定UID是否已經有記事
    for(var i = 0; i < postIts.length; i++){
        if(postIts[i].id == uid){  //找到物件中符合UID
            newCurrentPostIt = false;  //不是新記事
            currentPostItIndex = i;  //指向找到的記事資料物件
            return;  //找到記事資料,比對程式終止
        }
    }
    newCurrentPostIt = true; 
    //前面的比對程序都沒找到既有的記事資料
    //newCurrentPostIt設為真,
}
  
  function dayClicked(elm) {
    // console.log(elm.dataset.uid);
    currentPostItID = elm.dataset.uid; //目前的記事ID為所點擊的日期表格上的uid
    currentDayHasNote(currentPostItID);//判斷目前點蠕擊的日期是否有記事資料
    openMakeNote();
  }

  function getRandom(min, max) { //min <= 亂數值 < max
    return Math.floor(Math.random() * (max - min) ) + min;
}

  function submitPostIt(){ //按了PostIt按鍵後，所要執行的方法
    const value = document.getElementById("edit-post-it").value;
    document.getElementById("edit-post-it").value = "";
    let num = getRandom(1, 6); //取得1~5的亂數，用來標示便利貼顏色的檔案代號
    let postIt = {
        id: currentPostItID,
        note_num: num,
        note: value
    }
    if(newCurrentPostIt){ //如果是新記事的話
        postIts.push(postIt); //將新記事postIT物件推入postIts陣列
        //加入新增記事資料的ajax呼叫
        ajax({new_note_uid: postIt.id, 
          new_note_color: postIt.note_num, 
          new_note_text: postIt.note}); 
    } else {
        postIts[currentPostItIndex].note = postIt.note; //更新現有記事物件的記事資料
        //更新現有記事物件的記事資料
        postIts[currentPostItIndex].note = postIt.note; 
        //加入更新記事資料的ajax呼叫
        ajax({update_note_uid: postIts[currentPostItIndex].id, 
            update_note_text: postIt.note});
    }
    console.log(postIts)
    fillInMonth(thisYear,thisMonth);
    closeMakeNote();
  }

  function deleteNote(){//刪除點擊日期的記事資料
    if(!newCurrentPostIt) { //如果點擊的日期是有記事資料話
        //加入刪除記事資料的ajax呼叫
        ajax({delete_note_uid: postIts[currentPostItIndex].id}); 
        //使用splice刪除掉點擊日期的記事資料    
        postIts.splice(currentPostItIndex, 1);
        console.log(postIts);
        document.getElementById("edit-post-it").value = "";
        //因為記事資料變動了
        //呼叫fiilInMonth方法重新繪製一次月曆表格          

    fillInMonth(thisYear, thisMonth);
    }
    closeMakeNote();
    }