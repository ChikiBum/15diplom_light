const clearForm = (calcIsEmpty) => {
	const forms = document.querySelectorAll('form'),
		calcResult = document.getElementById('calc-result'),
		myonoffswitch = document.getElementById('myonoffswitch'),
		myonoffswitchTwo = document.getElementById('myonoffswitch-two'),
		calcSelescts = document.querySelectorAll('select'),
		distance = document.getElementById('distance');;

	forms.forEach(elem => {
		const inputs = elem.querySelectorAll('input');

		inputs.forEach( el => el.value = '');
	});
	if (!calcIsEmpty){
		calcResult.value = '';
		myonoffswitch.checked = true;
		myonoffswitchTwo.checked = true;
		calcSelescts.forEach(elem => elem.selectedIndex  = 0);
		distance.value = '';
	}
};

export default clearForm;