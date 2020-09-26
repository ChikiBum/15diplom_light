/* eslint-disable max-len */
'use strict';


const sendForm = () => {

	const errorMessage = 'Что-то пошло не так....',
		loadMessage = 'Загрузка...',
		successMessage = 'Отправлено!';

	const forms = document.querySelectorAll('form');

	const statusMassage = document.createElement('div');
	statusMassage.style.csstext = 'font-size: 2rem; ';
	statusMassage.classList.add('status-massage');


	forms.forEach((elem) => {
		elem.addEventListener('submit', (event) => {
			event.preventDefault();
			const target = event.target,
				form = target.closest('form');

			const inputs = form.querySelectorAll('input');

			form.appendChild(statusMassage);
			statusMassage.textContent = '';
			statusMassage.textContent = loadMessage;

			const formData = new FormData(form);

			let body = {};

			// for (let val of formData.entries()){
			//     body[val[0]] = val[1];
			// }

			formData.forEach((val, key) => {
				body[key] = val;
			});

			postData(body)
				.then((response) => {
					if (response.status !== 200) {
						throw new Error('status network not 200')
					}
					statusMassage.setAttribute("style","height: auto;");
					statusMassage.textContent = successMessage;
				})
				.catch((error) => {
					statusMassage.setAttribute("style","height: auto;");
					statusMassage.textContent = errorMessage;
					console.error(error);
				});

			inputs.forEach((elem) => {
				elem.value = '';
			});
		});

	});

	// eslint-disable-next-line arrow-body-style
	const postData = (body) => {
		return fetch('./server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
	};
};

sendForm();

const validateForm = () => {
	const phoneUser = document.querySelectorAll('.phone-user'),
		username = document.querySelectorAll('input[name=user_name]'),
		head = document.querySelector('head');

	head.insertAdjacentHTML('beforeend',
		`<style>
            input:focus:invalid {
                border: 3px solid red;
            }
            input:focus:valid {
                border: 3px solid green;
            }
            input{
                border: 3px solid black;
            }
            #input-validate {
                color:  red;
                font-size:  1rem;
                margin: 0
            }
         </style>`
	);

	phoneUser.forEach(elem => {
		elem.pattern = '\\+7\\s?[\\(]{0,1}[0-9]{3}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}';
	});

	username.forEach(elem => {
		elem.pattern = '^[А-Яа-яЁё\s]+$';
	});

	//message for validate form NAME
	username.forEach(element => {
		const div = document.createElement('div'),
			wrongText = 'Допустима ТОЛЬКО кириллица!';
		div.id = 'input-validate';
		element.insertAdjacentElement('beforebegin', div);

		element.addEventListener('input', () =>{
			if (!element.checkValidity()) {
				element.setAttribute('style', 'margin-top: 0')
				div.textContent = wrongText;
			} else {
				element.removeAttribute('style');
				div.textContent = '';
			}
		});
	});

	//message for validate form PHONE
	phoneUser.forEach(element => {
		const div = document.createElement('div'),
			wrongText = 'Телефон в формате: +7(___)___-__-__';
		div.id = 'input-validate';
		element.insertAdjacentElement('beforebegin', div);

		element.addEventListener('input', () =>{
			if (!element.checkValidity()) {
				element.setAttribute('style', 'margin-top: 0')
				div.textContent = wrongText;
			} else {
				element.removeAttribute('style');
				div.textContent = '';
			}
		});
	});

};

validateForm();

// accordion function

const accordion = (target) => {
	const panelGroup = document.querySelectorAll('.panel-group');

	panelGroup.forEach(elem => {
		const accordionItems = document.querySelectorAll(`#${elem.id} .panel-default`);

		accordionItems.forEach((item, i) => {
			const collapseItems = document.querySelectorAll(`#${elem.id} .panel-collapse`),
				collapseItem = item.querySelector('.panel-collapse');

			if (target.closest('.panel-default') === item && !target.closest('#next-step')) {

				//Для тестов калькулятора. В продакш поменять item.classList.add('in')); 	.add на .remove
				collapseItems.forEach(item => item.classList.remove('in'));
				collapseItem.classList.add('in');
			}  else if (target.closest('.panel-default') === item && target.closest('#next-step')) {
				collapseItems.forEach(item => item.classList.remove('in'));
				console.log(accordionItems[i+1]);
				accordionItems[i+1].querySelector('.panel-collapse').classList.add('in');
			}
		});
	});
};

//caclulator Checkbox
const onoffswitchCheckbox = (target) => {
	const onoffswitchCheckbox = document.querySelectorAll('.onoffswitch-checkbox'),
		selectBoxWrapper = document.querySelector('.select-box__wrapper'),
		myonoffSwitch = document.getElementById('myonoffswitch'),
		myonoffSwitchSelesct = selectBoxWrapper.querySelectorAll('select'),
		targetClosest = target.closest('.onoffswitch-label');

	onoffswitchCheckbox.forEach(elem => {

		if (targetClosest && targetClosest.getAttribute('for') === elem.id) {

			elem.checked = !elem.checked;

			if (targetClosest.getAttribute('for') === myonoffSwitch.id && elem.checked) {
				myonoffSwitchSelesct.forEach(el => el.classList.remove('in'));
				selectBoxWrapper.classList.remove('in');
			} else if (targetClosest.getAttribute('for') === myonoffSwitch.id && !elem.checked) {
				myonoffSwitchSelesct.forEach(el => el.classList.add('in'));
				selectBoxWrapper.classList.add('in');
			}
		}
	});
};

//calculate Total and send data
const calculate = () => {
	const calcResult = document.getElementById('calc-result'),
		myonoffswitch = document.getElementById('myonoffswitch'),
		myonoffswitchTwo = document.getElementById('myonoffswitch-two'),
		calcSelescts = document.querySelectorAll('select'),
		distance = document.getElementById('distance'),
		totalObj = {};
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

	calcResult.value = totalSum;
};

const listener = () => {

	document.addEventListener('click', (event) => {
		event.preventDefault();

		const target = event.target,
			popupCall = document.querySelector('.popup-call');

		if (target.classList.contains('call-btn') && target.tagName.toLowerCase() === 'a') {
			popupCall.style.display = 'block';
		}

		if (target.classList.contains('popup-close') || target.classList.contains('popup')) {
			popupCall.style.display = 'none';
		}

		//accordion
		accordion(target);

		//onoffswitch-checkbox
		onoffswitchCheckbox(target);

		//onoffswitch-checkbox
		calculate(target);

	});
};

listener();

