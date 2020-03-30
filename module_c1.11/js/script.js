const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const minus_sec = document.querySelector('.minus-sec');
const plus_sec = document.querySelector('.plus-sec');

const minus_min = document.querySelector('.minus-min');
const plus_min = document.querySelector('.plus-min');

const start = document.querySelector('.start');
const stop = document.querySelector('.stop');

let timeinterval;

let countSec = 0;
let countMin = 0;

const init = () =>{
  stop.style.display = 'none';
}
init();

const updateText = () =>{	
  minutes.innerHTML = (0 + String(countMin)).slice(-2);
  seconds.innerHTML = (0 + String(countSec)).slice(-2);
}
updateText();

const countDown = () => {	
	let total = countSec + countMin * 60;
  timeinterval = setTimeout(countDown, 1000);
  if (total <= 0) {
    clearTimeout(timeinterval);
    countSec = 0;
    countMin = 0;
    stop.style.display = 'none';
    start.style.display = 'inline-block';
    message.innerHTML = '<p>Time is over</p>'
  } else {
    if(countSec > 0) countSec--;
    else{
    	countSec = 59;
      countMin--;
    } 
  }
  updateText();
}

plus_sec.onclick = () =>{
  if(countSec < 59) ++countSec;
  else{
  	countSec = 0;
  }
  updateText()
}

minus_sec.onclick = () =>{
  if(countSec > 0) --countSec;
  else{
  	countSec = 59;
  }
  updateText();
}

plus_min.onclick = () =>{
  if(countMin < 59) ++countMin;
  else{
    countMin = 0;
  }
  updateText()
}

minus_min.onclick = () =>{
  if(countMin > 0) --countMin;
  else{
    countMin = 59;
  }
  updateText();
}

start.onclick = () => {
	  countDown();  
    stop.style.display = 'inline-block';
    start.style.display = 'none';
    message.innerHTML = '';
}

stop.onclick = () => {
    clearTimeout(timeinterval);
    stop.style.display = 'none';
    start.style.display = 'inline-block';
}