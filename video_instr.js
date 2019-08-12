const bar_num1El = document.getElementById('bar_num1');
const bar_num2El = document.getElementById('bar_num2');
const bar_num3El = document.getElementById('bar_num3');
const bar_num4El = document.getElementById('bar_num4');

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
		default:
			break;
		}
}


