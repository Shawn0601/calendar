<!DOCTYPE html>
<html lang="en">
<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>月曆-對話方塊</title>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/currentday.css">
  <link rel="stylesheet" href="css/calender.css">
  <link rel="icon" href="images/icon1.png" type="image/png" sizes="72×72" />
  <link rel="stylesheet" href="css/modal.css">
  <link rel="stylesheet" href="css/portrait.css">
  <link rel="stylesheet" href="css/calendarborder.css">
  <script src="https://kit.fontawesome.com/e45ac9a14a.js" crossorigin="anonymous"></script>

  <style>

  </style>

</head>

<body>

  <?php
  function getNoteData()
  {
    global $connection;
    $query = "SELECT * FROM notes";
    $result = mysqli_query($connection, $query);
    if (!$result) {
      die("Something went wrong");
    }
    $id = 0;
    $color = 1;
    $text = "";
    while ($row = mysqli_fetch_assoc($result)) {
      $id = $row['note_id'];
      $color = $row['note_color'];
      $text = $row['note_text'];
      //以上為php碼 
  ?>
      <script type="text/javascript">
        postIt = {
          id: <?php echo json_encode($id); ?>,
          note_num: <?php echo json_encode($color); ?>,
          note: <?php echo json_encode($text); ?>
        }
        postIts.push(postIt);
      </script>
  <?php //再接著php碼，這種寫法在混合式的php、html、JavaScript很常見的寫法，要習慣。
    }
  }
  ?>

  <?php
  $connection = mysqli_connect("localhost", "localhost", "shawn820601", "calendar"); //連線資料庫
  if (!$connection) { //如果連線失敗
    die("There was an error connecting to the database."); //網頁宣告到此die，並在網頁輸出…

  }

  function setTheme()
  {
    global $connection;
    $query = "SELECT * FROM theme";
    $result = mysqli_query($connection, $query);
    if (!$result) {
      die("Something went wrong...`");
    }
    while ($row = mysqli_fetch_assoc($result)) {
      return $row['cur_theme'];
    }
  }

  function db_updateTheme($newTheme)
  {
    global $connection;
    $query = "UPDATE theme SET cur_theme = '$newTheme' WHERE id = 1"; //更新theme資料表格中，id欄位值為1的資料列中的cur_theme欄位值為$newTheme
    $result = mysqli_query($connection, $query); //送出SQL查詢
    if (!$result) { //查詢失敗的話…
      die("Query failed: " . mysqli_error($connection));
    }
  }
  if (isset($_POST['color'])) { //透過關聯陣列$_POST['color']取得傳送過來的color資料
    db_updateTheme($_POST['color']); //呼叫db_updateTheme方法
  }


  //底下是記事資料
  function db_insertNote($uid, $color, $text)
  { //新增記事資料函式
    global $connection;
    $text = mysqli_real_escape_string($connection, $text);
    $query = "INSERT INTO notes(note_id, note_color, note_text) VALUES('$uid', '$color', '$text')";
    $result = mysqli_query($connection, $query);
    if (!$result) {
      die("Something went wrong...");
    }
  }
  if (isset($_POST['new_note_uid'])) { //前端傳來新增記事資料
    db_insertNote($_POST['new_note_uid'], $_POST['new_note_color'], $_POST['new_note_text']);
  }

  function db_deleteNote($uid)
  { //刪除記事資料函式
    global $connection;
    $query = "DELETE FROM notes WHERE note_id = '$uid'";
    $result = mysqli_query($connection, $query);
    if (!$result) {
      die("Something went wrong…");
    }
  }
  if (isset($_POST['delete_note_uid'])) { //刪除記事資料
    db_deleteNote($_POST['delete_note_uid']);
  }




  ?>

  <h3 id="back-year" class="background-text off-color">1900</h3>
  <h4 class="background-text off-color">Calendar</h4>
  <div id="current-day-info" class="color">

    <h1 id="app-name-landscape" class="off-color default-cusor center">Shawnn'sCalendar</h1>

    <div>

      <h2 id="cur-year" class="default-cusor center">1900</h2>

    </div>

    <div class="">

      <h1 id="cur-day" class="current-day-heading default-cusor center">Sunday</h1>

      <h1 id="cur-month" class="current-day-heading default-cusor center">January</h1>

      <h1 id="cur-date" class="current-day-heading default-cusor center">14</h1>

    </div>

    <div class="">

      <button id="theme-landscape" class="button font color" onclick="openFavColor();">Change Theme</button>

    </div>

  </div>

  <div id="calendar">

    <h1 id="app-name-portrait" class="center off-color">My Calendar</h1>

    <table>

      <thead class="color">

        <tr>

          <th colspan="7" class="border-color">

            <h4 id="cal-year">1900</h4>

            <div>

              <i class="fas fa-caret-left icon" onclick="previousMonth()"></i>

              <h3 id="cal-month">January</h3>

              <i class="fas fa-caret-right icon" onclick="previousMonth()"></i>


            </div>

          </th>

        </tr>

        <tr>

          <th class="weekday border-color">Sun</th>

          <th class="weekday border-color">Mon</th>

          <th class="weekday border-color">Tue</th>

          <th class="weekday border-color">Wed</th>

          <th class="weekday border-color">Thu</th>

          <th class="weekday border-color">Fri</th>

          <th class="weekday border-color">Sat</th>

        </tr>

      </thead>

      <tbody id="table-body" class="border-color">

        <tr>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

        </tr>

        <tr>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td class="tooltip" onclick="dayClicked(this); ">1 <img src="images/note1.png" alt="記事資料"><span>這是提示！！！</span></td>
          <td onclick="dayClicked(this);">1</td>
          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

        </tr>

        <tr>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>
          <td onclick="dayClicked(this);">1</td>

          <td id="current-day" onclick="dayClicked(this); ">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

        </tr>

        <tr>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>
          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

        </tr>

        <tr>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

        </tr>

        <tr>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

          <td onclick="dayClicked(this);">1</td>

        </tr>

      </tbody>

    </table>

    <button id="theme-portrait" class="button font color" onclick="openFavColor();">Change Theme</button>

  </div>

  <dialog id="modal">
    <div id="fav-color" hidden>
      <div class="popup">
        <h4 class="center">What's your favorite color?</h4>
        <div id="color-options">
          <div class="color-option">
            <div class="color-preview checkmark" id="blue" style="background-color: #1B19CD;" onclick="addCheckMark('blue');"><i class="fas fa-check checkmark"></i></div>
            <h5>Blue</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="red" style="background-color: #D01212;" onclick="addCheckMark('red');"></div>
            <h5>Red</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="purple" style="background-color: #721D89;" onclick="addCheckMark('purple');"></div>
            <h5>Purple</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="green" style="background-color: #158348;" onclick="addCheckMark('green');"></div>
            <h5>Green</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="orange" style="background-color: #EE742D;" onclick="addCheckMark('orange');"></div>
            <h5>Orange</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="deep-orange" style="background-color: #F13C26;" onclick="addCheckMark('deep-orange');"></div>
            <h5>Deep Orange</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="baby-blue" style="background-color: #31B2FC;" onclick="addCheckMark('baby-blue');"></div>
            <h5>Baby Blue</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="cerise" style="background-color: #EA3D69;" onclick="addCheckMark('cerise');"></div>
            <h5>Cerise</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="lime" style="background-color: #36C945;" onclick="addCheckMark('lime');"></div>
            <h5>Lime</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="teal" style="background-color: #2FCCB9;" onclick="addCheckMark('teal');"></div>
            <h5>Teal</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="pink" style="background-color: #F50D7A;" onclick="addCheckMark('pink');"></div>
            <h5>Pink</h5>
          </div>
          <div class="color-option">
            <div class="color-preview" id="black" style="background-color: #252525;" onclick="addCheckMark('black');"></div>
            <h5>Black</h5>
          </div>
        </div>
        <button id="update-theme-button" class="button font" onclick="changeColor();">Update</button>
      </div>
    </div>
    <div id="make-note" hidden>
      <div class="popup">
        <h4>Add a note to the calendar</h4>
        <textarea id="edit-post-it" class="font" name="post-it" autofocus></textarea>
        <div>
          <button class="button font post-it-button" id="add-post-it" onclick="submitPostIt();">Post It</button>
          <button class="button font post-it-button" id="delete-button" onclick="deleteNote();">Delete It</button>
        </div>
      </div>
    </div>
  </dialog>
  <script src="js/updateDates.js"></script>
  <script src="js/fillInMonth.js"></script>
  <script src="js/postIt.js"></script>
  <script src="js/ajax.js"></script>
  <?php getNoteData(); ?>

  <script>
    currentColor.name = "<?php echo (setTheme()); ?>"; //json_encode將回傳的資料包裝成JSON編碼字串，然後指定給currentColor.name    可以用json(encode) 包起來phpecho 

    updateDates(); //上方包完function後這邊要呼叫,時至今日都用 invoke 居多

    let today = new Date(); // 今日的Date物件
    let thisYear = today.getFullYear(); //今年
    let thisMonth = today.getMonth(); //第一步  ,, 今月


    fillInMonth(thisYear, thisMonth); //呼叫fillinMonth寒士將日期表格填滿

    //練習用手動的方式打開對話方塊
  </script>

</body>

</html>