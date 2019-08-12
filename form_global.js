

function Submit(){
	//if there's no data in localStorage, create it, else retrieve it 
	const rawData = localStorage.getItem('globalData');
	let data = {};
	if (rawData != null) {data = JSON.parse(rawData)};
	
	//append filled out data on clicking submit
	const Form = document.querySelector('form');
	let i;
	for (i = 0; i<Form.length; i++) {

		//if they're radio or checkboxes, return only the one that's checked
		if (Form[i].type == ("radio"||"checkbox")) {
			if (Form[i].checked == true) {
				data[Form[i].name] = Form[i].value;
			}
		}

		else {data[Form[i].name] = Form[i].value;}
	};
	
	//save new data in localStorage
	localStorage.setItem('globalData',JSON.stringify(data));
	
	//change window *need to declare nextpage for every form page
	window.location.replace(nextpage);
	return false;
}
