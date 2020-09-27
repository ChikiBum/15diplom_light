
import {targetPanelGroup} from './listener.js'; 

const onoffswitchCheckbox = (targetPanelGroup) => {

	const onoffswitchCheckbox = document.querySelectorAll('.onoffswitch-checkbox'),
		selectBoxWrapper = document.querySelector('.select-box__wrapper'),
		myonoffSwitch = document.getElementById('myonoffswitch'),
		myonoffSwitchSelesct = selectBoxWrapper.querySelectorAll('select'),
		targetClosest = targetPanelGroup.closest('.onoffswitch-label');

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

export default onoffswitchCheckbox;