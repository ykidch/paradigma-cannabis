const rawData = localStorage.getItem('globalData');
let data = JSON.parse(rawData);

const date = data['date'];
const name = data['name'];
const age = data['age'];
const outfile = 'data/S_' + name + '_' + age + '_' + date;

function SaveData(){
	
	//append filled out data on clicking submit
	const Form = document.querySelector('form');
	let i;
	for (i = 0; i<Form.length; i++) {
		data[Form[i].name] = Form[i].value;
	};
	
	send_data();

	return false;
}


function send_data() {
	const data_json = JSON.stringify(data);
	const xhr = new XMLHttpRequest();
	const url = 'https://testpilotm.s3.us-east-2.amazonaws.com/';
	const destination = url + outfile + ".json";
	xhr.open('PUT',destination);
	
	xhr.send(data_json);

	//change window *need to declare nextpage for every form page
	window.location.replace('thanks.html');
	
}
