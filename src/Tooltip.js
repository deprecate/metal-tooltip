'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import TooltipBase from './TooltipBase';
import './Tooltip.soy';

/**
 * Tooltip component.
 */
class Tooltip extends TooltipBase {
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

ComponentRegistry.register('Tooltip', Tooltip);

export default Tooltip;
