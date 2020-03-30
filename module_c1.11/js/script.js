const $ = (e)=>new jQuery(e);

let timeinterval;
let countSec = 0;
let countMin = 0;

const init = () =>{
  $('.stop').hide();
}
init();

const updateText = () =>{	
  $('.minutes input').val((0 + String(countMin)).slice(-2));
  $('.seconds input').val((0 + String(countSec)).slice(-2));
}
updateText();

const countDown = () => {	
	let total = countSec + countMin * 60;
  timeinterval = setTimeout(countDown, 1000);
  if (total <= 0) {
    clearTimeout(timeinterval);
    countSec = 0;
    countMin = 0;
    $('.stop').hide();
    $('.start').show();
    $('.message').html('<p>Time is over</p>');
  } else {
    if(countSec > 0) countSec--;
    else{
    	countSec = 59;
      countMin--;
    } 
  }
  updateText();
}

$('.plus-sec').click(() =>{
  if(countSec < 59) ++countSec;
  else{
  	countSec = 0;
  }
  updateText()
});

$('.minus-sec').click(() =>{
  if(countSec > 0) --countSec;
  else{
  	countSec = 59;
  }
  updateText();
});

$('.plus-min').click(() =>{
  if(countMin < 59) ++countMin;
  else{
    countMin = 0;
  }
  updateText()
});

$('.minus-min').click(() =>{
  if(countMin > 0) --countMin;
  else{
    countMin = 59;
  }
  updateText();
});

$('.start').click(() => {
	  countDown();  
    $('.stop').show();
    $('.start').hide();
    $('.message').html('');
});

$('.stop').click(() => {
    clearTimeout(timeinterval);
    $('.stop').hide();
    $('.start').show();
});

$('.minutes input').keyUp(()=>{
    countMin=$('.minutes input').val();
    if (countMin===undefined || countMin==''|| Number(countMin)<0)
      countMin=0;
    else if(Number(countMin)>59){
      countMin=59
    }
    updateText();
    
});

$('.seconds input').keyUp(()=>{
    countSec=$('.seconds input').val();
    if (countSec===undefined || countSec==''|| Number(countSec)<0)
      countMin=0;
    else if(Number(countSec)>59){
      countSec=59
    }
    updateText();
    
});