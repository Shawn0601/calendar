function getWeekdayName(weekday){
    let weekdayName;
    if (weekday == 0 ){weekdayName = "Sunday";}
    if (weekday == 1 ){weekdayName = "Monday";}
    if (weekday == 2 ){weekdayName = "Tuesday";}
    if (weekday == 3 ){weekdayName = "Wednesday";}
    if (weekday == 4 ){weekdayName = "Thursday";}
    if (weekday == 5 ){weekdayName = "Friday";}
    if (weekday == 6 ){weekdayName = "Saturday";}
 
     return weekdayName; //從函式返回,並傳回weekdayName值
     }
 
     function getMonthName (month) {
       let monthNames = [
         "January",  "February",  "March",
         "April",     "May",      "June",
         "July",      "August",   "September",
         "October",   "November", "December"
       ];
 
       return monthNames[month];
 
     }
 
     function addDateOrdinal(date) { //加上日期序數
       switch (date) {
         case 1:
         case 21:
         case 31: return date + "<sup>st</sup>";
         case 2:
         case 22: return date + "<sup>nd</sup>";        
         case 3:
         case 23: return date + "<sup>rd</sup>";        
         default: return date + "<sup>th</sup>";      
       }
     }
     
     function updateDates(){
    
        let today = new Date(); //建立一個今日的日期物件
      
        // 年
        document.getElementById("cur-year").innerHTML = today.getFullYear();
        document.getElementById("cal-year").innerHTML = today.getFullYear();
        document.getElementById("back-year").innerHTML = today.getFullYear();
      
        // 月
        document.getElementById("cur-month").innerHTML = getMonthName( today.getMonth() );
        document.getElementById("cal-month").innerHTML = getMonthName( today.getMonth() );
      
         // weekday
        document.getElementById("cur-day").innerHTML = getWeekdayName(today.getDay() );
      
        //date
        document.getElementById("cur-date").innerHTML = addDateOrdinal( today.getDate() );
     }






      