import clearForm from './clearForm.js';
import onoffswitchCheckbox  from './onoffswitchCheckbox.js';
import accordion  from './accordion.js';
import calculate  from './calculate.js';
import {totalObj} from './calculate.js'; 

let targetPanelGroup;

const listener = () => {

	const panelGroup = document.querySelectorAll('.panel-group'),
		aCallBtn = document.querySelectorAll('a.call-btn'),
		buttonCallBtn = document.querySelector('button.call-btn'),
		popupCall = document.querySelector('.popup-call'),
		popupDiscount = document.querySelector('.popup-discount'),
		popupClose = document.querySelectorAll('.popup-close'),
		addSentenceBtn = document.querySelector('.add-sentence-btn'),
		discountBtns  = document.querySelectorAll('.discount-btn'),
		checkBtn = document.querySelector('.check-btn'),
		popupCheck = document.querySelector('.popup-check'),
		consultationBtn = document.querySelector('.consultation-btn'),
		popupConsultation = document.querySelector('.popup-consultation'),
		userQuest = document.querySelector('input[name=user_quest]'),
		popup = document.querySelectorAll('.popup'),
		forms = document.querySelectorAll('form');

		

	forms.forEach(elem => {
		elem.addEventListener('click', (event) => {
			const isEmpty = (obj) => {
				for(const key in obj)
				{
					return false;
				}
				return true;
			};
	
			let calcIsEmpty = isEmpty(totalObj);
	
			if (!event.target.closest('.popup-discount') && !calcIsEmpty){
				for (const key in totalObj) {
					//#director-form'popup-consultation
					if ((event.target.closest('.director-form') || event.target.closest('.popup-consultation')) && key === 'userQuestion'){
						calcIsEmpty = true;
					} else {
						delete totalObj[key];
					}
				}
				if (!event.target.closest('.popup-consultation')){
				clearForm(calcIsEmpty);
			}
			}
		});
	});

	panelGroup.forEach(elem => {	
		elem.addEventListener('click', (event) => {
			event.preventDefault();
			// event.stopPropagation()
			
			const target = event.target;
			targetPanelGroup = target;

			//accordion
			accordion(target);

			//onoffswitch-checkbox
			onoffswitchCheckbox(target);

			//onoffswitch-checkbox
			calculate(target);
		});
	});

	aCallBtn.forEach(elem => {	
		elem.addEventListener('click', (event) => {
			event.preventDefault();
			popupCall.style.display = 'block';
	
		});
	});

	popup.forEach(elem => {
		elem.addEventListener('click', (event) => {
			const target = event.target;
			if (target.classList.contains('popup')){
				target.style.display = 'none';
				clearForm();
			}
		});
	});


	popupClose.forEach(element => {
		element.addEventListener('click', (event) =>{
			const target = event.target;
			event.preventDefault();
			
			if (target.closest('.popup-call'))
			{
				popupCall.style.display = 'none';
			} else if (target.closest('.popup-discount')){
				popupDiscount.style.display = 'none';
			
				for (const key in totalObj) {
					delete totalObj[key];
				}
			} else if (target.closest('.popup-check')){
				popupCheck.style.display = 'none';
			}
			else if (target.closest('.popup-consultation')){
				popupConsultation.style.display = 'none';
				for (const key in totalObj) {
					delete totalObj[key];
				}
				userQuest.value = '';
			}
			clearForm();
		});
	});
	

	buttonCallBtn.addEventListener('click', (event) =>{
		event.preventDefault();
		popupDiscount.style.display = 'block';
	});

	addSentenceBtn.addEventListener('click', () => {
		const hidden = document.querySelectorAll('.hidden'),
			visibleSmBlock = document.querySelector('.visible-sm-block');

		hidden.forEach(el => {
			el.classList.remove('hidden');
		});

		visibleSmBlock.classList.remove('visible-sm-block');
		addSentenceBtn.style.display = 'none';
	});

	discountBtns.forEach(elem => {
		elem.addEventListener('click', (event) => {
			event.preventDefault();
			popupDiscount.style.display = 'block';
		});
	});

	checkBtn.addEventListener('click', (event) => {
		event.preventDefault();
		popupCheck.style.display = 'block';
	});

	consultationBtn.addEventListener('click', (event) => {
		event.preventDefault();
		if (userQuest.value.length > 0){
			totalObj.userQuestion = userQuest.value;
		}
		popupConsultation.style.display = 'block';
	});
};

export default listener;
export {targetPanelGroup};