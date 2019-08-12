const today = new Date();
const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+'_'+today.getHours()+':'+today.getMinutes()

const vidEl = document.getElementById('vid');
const vid_textEl = document.getElementById('vid_text');
const attentionbarEl = document.getElementById('attentionbar');

const bar_num1El = document.getElementById('bar_num1');
const bar_num2El = document.getElementById('bar_num2');
const bar_num3El = document.getElementById('bar_num3');
const bar_num4El = document.getElementById('bar_num4');
const volumeEl = document.getElementById('volume');

let key_id = [];
let key_times = [];

let attention_on = 0;
let attention_right_times = [];
let attention_wrong_times = [];

vidEl.addEventListener('click', start_vid);

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//create random times for attentionbar to be illuminated
let x_times = [];

for (var k = 0; k <= 9; k++) {
	let newtime = 67000*Math.random()+3+73000*k;
	x_times.push(newtime);
}

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



let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		videoId: 'njgt-hlEvfg',		
		events: { 'onStateChange':onPlayerStateChange },
		playerVars: { 'controls':0,
			'disablekb':1,
			'enablejsapi':1,
			'rel':0,
			'showinfo':0,
			'modestbranding':1,	
			},
	});

	;
}

/*
const Player = document.createElement('video');

Player.setAttribute('id','player');
Player.controls = true;
Player.innerHTML = '<source src="http://dppclbo3umrxy.cloudfront.net/cannabisv2_wrfs.mp4.mov" type="video/mp4">'
Player.style.height = '100%';
Player.style.maxHeight = '100%';
Player.style.maxWidth = '100%';
Player.style.position = 'relative';
Player.style.display = 'block';
Player.style.margin = 'auto';
*/

let timestart = 0;

//start timer
let tempDate = new Date;
timestart = tempDate.getTime();

//count time to illuminate attentionbar from here
for (var k = 0; k <= 9; k++) {
	setTimeout(illuminate,x_times[k]);
}


function start_vid() {
	//Player.autoplay = true;
	vid_textEl.remove();	
	//vidEl.appendChild(Player);
	player.playVideo();
	
}

function changeVolume() {
	//Player.volume = volumeEl.value;
	player.setVolume(Math.floor(100*volumeEl.value));
}

document.addEventListener('keypress',logKey);

function logKey(event) {
	switch (event.key) {
		case "1":
			bar_num1El.style.border = '3px solid yellow';
			bar_num2El.style.border = 'none';
      bar_num3El.style.border = 'none';
      bar_num4El.style.border = 'none';
			key_id.push("key:1");
			key_times.push(player.getCurrentTime());
			break;
    case "2":
      bar_num1El.style.border = 'none';
      bar_num2El.style.border = '3px solid yellow';
      bar_num3El.style.border = 'none';
      bar_num4El.style.border = 'none';
      key_id.push('key:2');
      key_times.push(player.getCurrentTime());
      break;
    case "3":
      bar_num1El.style.border = 'none';
      bar_num2El.style.border = 'none';
      bar_num3El.style.border = '3px solid yellow';
      bar_num4El.style.border = 'none';
      key_id.push('key:3');
      key_times.push(player.getCurrentTime());
      break;
    case "4":
      bar_num1El.style.border = 'none';
      bar_num2El.style.border = 'none';
      bar_num3El.style.border = 'none';
      bar_num4El.style.border = '3px solid yellow';
      key_id.push('key:4');
      key_times.push(player.getCurrentTime());
      break;

		case " ":
			if (attention_on == 1) {
				rightilluminate();
				let timenow = new Date;
				timenow = timenow.getTime();
				console.log(timenow);
				attention_right_times.push(timenow-timestart);
			}
			else if (attention_on == 0) {
				wrongilluminate();
				let timenow = new Date;
				timenow = timenow.getTime();
				console.log(timenow);
				attention_wrong_times.push(timenow-timestart);
			};
			break;

		default:
			break;
		}
}

//Player.addEventListener("ended", save_data);



const rawData = localStorage.getItem('globalData');
let data = JSON.parse(rawData);

/*
data['date'] = date;

const name = data['name'];
const age = data['age'];
const outfile = 'data/S_' + name + '_' + age + '_' + date;
*/

function onPlayerStateChange(event) {
		if (event.data === 0) {save_data()}
}

function save_data() {
	data['date'] = date;
	data['key_id'] = key_id;
	data['key_times'] = key_times;
	data['x_times'] = x_times;	
	data['attention_right_times'] = attention_right_times;
	data['attention_wrong_times'] = attention_wrong_times;
	
	localStorage.setItem('globalData',JSON.stringify(data));

	window.location.replace('formafter1.html');

	//send_data();
	//const data_json = JSON.stringify(data);
	//const xhr = new XMLHttpRequest();
	
	
}

/*
function send_data() {
	
	const data_json = JSON.stringify(data);
	const xhr = new XMLHttpRequest();
	const url = 'https://testpilotm.s3.us-east-2.amazonaws.com/';
	const destination = url + outfile + ".json";
	xhr.open('PUT',destination);
	
	xhr.send(data_json);
	
	//const url = ''; //server url		
	//xhr.open('POST',url);
	//xhr.send(data_json);
}
*/
