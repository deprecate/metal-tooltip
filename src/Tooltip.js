'use strict';

import Soy from 'metal-soy';
import TooltipBase from './TooltipBase';
import templates from './Tooltip.soy';

/**
 * Tooltip component.
 */
class Tooltip extends TooltipBase {
	/**
	 * State synchronization logic for `visible`. Updates the element's opacity,
	 * since bootstrap uses opacity instead of display for tooltip visibility.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		this.element.style.opacity = visible ? 1 : '';
		super.syncVisible(visible);
	}
}
Soy.register(Tooltip, templates);

/**
 * @inheritDoc
 * @see `Align` class.
 * @static
 */
Tooltip.Align = TooltipBase.Align;

export default Tooltip;
export { Tooltip, TooltipBase };
