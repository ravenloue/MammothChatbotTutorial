var questionNumber = 0;

const response = document.getElementById("response");
const answerForm = document.getElementById("answerForm");
const birthdayForm = document.getElementById("birthdayForm");
const holidayForm = document.getElementById("holidayForm");
const restartButton = document.getElementById("restartButton");

/** 
 * Returns the difference between the user's birthday and the current date
 * by converting milliseconds to days using the following formula
 * 
 * 86,400,000 = 1000ms * 60sec * 60min * 24hrs
 */
function calculateDifferenceInDays(date) {

  return Math.ceil((date - new Date()) / 86400000 );  

  };

/** 
 * CalculateNextBirthday takes the current year along with the information submitted
 * by the user to determine the date of the user's next birthday in order to determine 
 * how many days until the user's next birthday.
 */
function calculateNextBirthday(){
  
  let birthdayYear = new Date().getFullYear();
  const selectedBirthdayMonthElement = document.getElementById("months");
  const birthdayMonth = selectedBirthdayMonthElement.selectedIndex + 1;
  const birthdayDay = document.getElementById("birthdayAnswer").value;
  let birthdayDate = new Date(birthdayYear+"-"+birthdayMonth+"-"+birthdayDay);
  const birthdayAnswer = document.getElementById("months").value + " " + document.getElementById("birthdayAnswer").value;

  // If the birthday has already passed, add one to the current year
  if ( new Date()> birthdayDate){
    birthdayYear = birthdayYear + 1;
    birthdayDate = new Date(birthdayYear + "-" + birthdayMonth + "-" + birthdayDay);
  }

  response.innerText = "You said your birthday is on "+birthdayAnswer+". Your next birthday is in "
                       +calculateDifferenceInDays(birthdayDate)+" days.";
  };

/**
 * CalculateNextHoliday takes the current year along with the information
 * selected by the user to determine the date of the user's favorite holiday
 * in order to determine how many days there are until the next occurance
 */
function calculateNextHoliday(){
  const holidays = document.getElementById("holidays");
  const favorityHoliday = holidays.options[holidays.selectedIndex].value;
  let month = 1;
  let day = 1; 

  switch(favorityHoliday){
    case "Chinese New Year":
      month = 1;
      day   = 22;
      break;
    case "Christmas":
      month = 12;
      day   = 25;
      break;
    case "Halloween":
      month = 10;
      day   = 31;
      break;
    case "Hannukah":
      month = 12;
      day   = 7;
      break;
    case "Kwanza":
      month = 12;
      day   = 26;
      break;
    case "New Year":
      month = 1;
      day   = 1;
      break;
    case "Ramadan":
      month = 3;
      day   = 26;
      break;
    default:
      month = 1;
      day   = 1;
  }
  let year = new Date().getFullYear();
  let holidayDate = new Date(year+"-"+month+"-"+day);

  // If the holiday has already passed, add one to the current year
  if( new Date() > holidayDate){
    year = year+1;
    holidayDate = new Date(year + "-" + month + "-" + day);
  }

  response.innerText = "Your favorite holiday, "+favorityHoliday+", is only "
                       +calculateDifferenceInDays(holidayDate)+" days away.";
  };
/**
 * runChatbot() is the main function which controls the order of execution for
 * the browser chatbot through the use of a series of if/else statements
 */
function runChatbot(){

  event.preventDefault();

  const answer = document.getElementById("answer");
  const question = document.getElementById("question");
  
  // The questionNumber determines which stage the chatbot program runs next
  if(questionNumber === -1){
    question.innerText = "What is your name?";
    response.innerText = "";
    answer.value="";
    answerForm.style.display="block";
  }else if(questionNumber === 0){
    response.innerText = "You said your name is "+answer.value+".";
    question.innerText = "Hello "+answer.value+". When is your birthday?";

    birthdayForm.style.display="block";
    answerForm.style.display="none";

  }else if(questionNumber === 1){
    calculateNextBirthday();
    question.innerText = "What is your favorite holiday?";

    birthdayForm.style.display = "none";
    holidayForm.style.display = "block";

  }else if(questionNumber === 2){
    calculateNextHoliday();    
    question.innerText = "How old are you?";
    
    holidayForm.style.display = "none";
    answerForm.style.display = "block";
    answer.value="";
  }else if(questionNumber === 3){
    
    const birthYear = new Date().getFullYear() - answer.value;
        
    response.innerText = "Based on your age, you were born in "+birthYear+".";
    question.innerText = "Thanks for playing!";
    answerForm.style.display = "none";
    restartButton.style.display = "block";
  }

  // Enables the chatbot to move onto the next function in the if/else clause
  questionNumber++;

};



answerForm.addEventListener("submit", function(event){
  runChatbot();
});

birthdayForm.addEventListener("submit", function(event){
  runChatbot();
});

holidayForm.addEventListener("submit", function(event){
  runChatbot();
});
restartButton.addEventListener("click", function(event){
  questionNumber = -1;
  runChatbot();
  restartButton.style.display = "none";
});