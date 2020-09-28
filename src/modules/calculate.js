import {targetPanelGroup} from './listener.js'; 
const totalObj = {};

const calculate = () => {
	const calcResult = document.getElementById('calc-result'),
		myonoffswitch = document.getElementById('myonoffswitch'),
		myonoffswitchTwo = document.getElementById('myonoffswitch-two'),
		calcSelescts = document.querySelectorAll('select'),
		distance = document.getElementById('distance');
	let totalSum = 0;

	myonoffswitch.checked ? totalObj.camersPrice1 = 10000 : (totalObj.camersPrice1 = 10000, totalObj.camersPrice2 = 5000);

	calcSelescts.forEach(elem => {
		if (elem.classList.contains('in')) {
			if (elem.id === 'meters-first') {
				+elem.value === 1.4 ? totalObj.metersFirst = 1 : totalObj.metersFirst = 1.2;
			} else if (elem.id === 'quantity-first') {
				+elem.value === 1 ? totalObj.quantityFirst = 1 : +elem.value === 2 ? totalObj.quantityFirst = 1.3 : totalObj.quantityFirst = 1.5;
			} else 	if (elem.id === 'meters-two') {
				+elem.value === 1.4 ? totalObj.metersTwo = 1 : totalObj.metersTwo = 1.2;
			} else if (elem.id === 'quantity-two') {
				+elem.value === 1 ? totalObj.quantityTwo = 1 : +elem.value === 2 ? totalObj.quantityTwo = 1.2 : totalObj.quantityTwo = 1.4;
			}
		}
	});

	if (myonoffswitchTwo.checked && !myonoffswitch.checked) {
		totalObj.bottom1 = 1.1 ;
		totalObj.bottom2 = 1.2 ;
	} else if (myonoffswitchTwo.checked && myonoffswitch.checked) {
		totalObj.bottom1 = 1.1 ;
	} else if (!myonoffswitchTwo.checked) {
		totalObj.bottom1 = 1 ;
		totalObj.bottom2 = 1 ;
	}

	totalSum = totalObj.camersPrice1 * totalObj.metersFirst * totalObj.quantityFirst ;
	if (myonoffswitch.checked && totalObj.bottom1) {
		totalSum *= totalObj.bottom1;
	}
	if (!myonoffswitch.checked) {
		const totalSum2 =  totalObj.camersPrice2 * totalObj.metersTwo * totalObj.quantityTwo;
		totalSum += totalSum2;
		if (totalObj.bottom2) {
			totalSum *= totalObj.bottom2;
		}
	}
	
	if (distance.value > 0){
		totalObj.distance = +distance.value;
	}

	totalSum = Math.floor(totalSum * 100) / 100;
	totalObj.calcResult = totalSum;

	calcResult.value = totalSum;
};

export default calculate;
export {totalObj};