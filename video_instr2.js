const bar_num1El = document.getElementById('bar_num1');
const bar_num2El = document.getElementById('bar_num2');
const bar_num3El = document.getElementById('bar_num3');
const bar_num4El = document.getElementById('bar_num4');
const attentionbarEl = document.getElementById('attentionbar');

let attention_on = 0;
//when called, illuminate attentionbar yellow
function illuminate() {
	attentionbarEl.style.backgroundColor = '#FFFF00'
	attention_on = 1;
}

//when called, return attentionbar to gray
function deilluminate() {
	attentionbarEl.style.backgroundColor = '#CCCCCC'
	attention_on = 0;
}

//when called, illuminate attentionbar green for 1 second and return to gray
function rightilluminate() {
	attentionbarEl.style.backgroundColor = '#00FF00'
	setTimeout(deilluminate,1000);
	attention_on = 0;
}
//when called, illuminate attentionbar red for 1 second and return to gray
function wrongilluminate() {
	attentionbarEl.style.backgroundColor = '#FF0000';
	setTimeout(deilluminate,1000);
	attention_on = 0;
}

setInterval(illuminate, 7000);

document.addEventListener('keypress',logKey);

function logKey(event) {
	switch (event.key) {
		case "1":
			bar_num1El.style.border = '3px solid yellow';
			bar_num2El.style.border = 'none';
      bar_num3El.style.border = 'none';
      bar_num4El.style.border = 'none';
			break;
    case "2":
      bar_num1El.style.border = 'none';
      bar_num2El.style.border = '3px solid yellow';
      bar_num3El.style.border = 'none';
      bar_num4El.style.border = 'none';
      break;
    case "3":
      bar_num1El.style.border = 'none';
      bar_num2El.style.border = 'none';
      bar_num3El.style.border = '3px solid yellow';
      bar_num4El.style.border = 'none';
      break;
    case "4":
      bar_num1El.style.border = 'none';
      bar_num2El.style.border = 'none';
      bar_num3El.style.border = 'none';
      bar_num4El.style.border = '3px solid yellow';
      break;
		case " ":
			if (attention_on == 1) {
				rightilluminate();
				let timenow = new Date;
				timenow = timenow.getTime();
				console.log(timenow);	
			}
			else if (attention_on == 0) {
				wrongilluminate();
				let timenow = new Date;
				timenow = timenow.getTime();
				console.log(timenow);
							};
							break;
		default:
			break;
		}
}


