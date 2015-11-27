'use strict';

import TooltipBase from './TooltipBase';
import './Tooltip.soy';

/**
 * Tooltip component.
 */
class Tooltip extends TooltipBase {
	/**
	 * Attribute synchronization logic for `visible` attribute. Updates the
	 * element's opacity, since bootstrap uses opacity instead of display
	 * for tooltip visibility.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		this.element.style.opacity = visible ? 1 : '';
		super.syncVisible(visible);
	}
}

/**
 * @inheritDoc
 * @see `Align` class.
 * @static
 */
Tooltip.Align = TooltipBase.Align;

/**
 * Default tooltip elementClasses.
 * @default tooltip
 * @type {string}
 * @static
 */
Tooltip.ELEMENT_CLASSES = 'tooltip';

export default Tooltip;
