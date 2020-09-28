const clearForm = (calcIsEmpty) => {
	const forms = document.querySelectorAll('form'),
		calcResult = document.getElementById('calc-result'),
		myonoffswitch = document.getElementById('myonoffswitch'),
		myonoffswitchTwo = document.getElementById('myonoffswitch-two'),
		calcSelescts = document.querySelectorAll('select'),
		distance = document.getElementById('distance'),
		selectBoxWrapper = document.querySelector('.select-box__wrapper'),
		collapseOne = document.querySelector('div#collapseOne'),
		panelCollapse = document.querySelectorAll('.panel-collapse');

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
		selectBoxWrapper.classList.remove('in');
		collapseOne.classList.remove('in');
		panelCollapse.forEach(elem => elem.classList.remove('in'));
		calcIsEmpty = true;
	}
};

export default clearForm;