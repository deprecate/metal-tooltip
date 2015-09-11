'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import Align from 'bower:metal-position/src/Align';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import EventHandler from 'bower:metal/src/events/EventHandler';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import 'bower:metal/src/dom/events';
import './Tooltip.soy';

/**
 * Tooltip component.
 */
class Tooltip extends SoyComponent {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);

		this.eventHandler_ = new EventHandler();
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		this.align();
		this.syncTriggerEvents(this.triggerEvents);
	}

	/**
	 * @inheritDoc
	 */
	detached() {
		this.eventHandler_.removeAllListeners();
	}

	/**
	 * Aligns the tooltip with the best region around alignElement. The best
	 * region is defined by clockwise rotation starting from the specified
	 * `position`. The element is always aligned in the middle of alignElement
	 * axis.
	 * @param {Element=} opt_alignElement Optional element to align with.
	 */
	align(opt_alignElement) {
		this.syncAlignElement(opt_alignElement || this.alignElement);
	}

	/**
	 * @param {!function()} fn
	 * @param {number} delay
	 * @private
	 */
	callAsync_(fn, delay) {
		clearTimeout(this.delay_);
		this.delay_ = setTimeout(fn.bind(this), delay);
	}

	/**
	 * Handles hide event triggered by `events`.
	 * @param {!Event} event
	 * @protected
	 */
	handleHide(event) {
		var delegateTarget = event.delegateTarget;
		var interactingWithDifferentTarget = delegateTarget && (delegateTarget !== this.alignElement);
		this.callAsync_(function() {
			if (this.locked_) {
				return;
			}
			if (interactingWithDifferentTarget) {
				this.alignElement = delegateTarget;
			} else {
				this.visible = false;
				super.syncVisible(false);
			}
		}, this.delay[1]);
	}

	/**
	 * Handles show event triggered by `events`.
	 * @param {!Event} event
	 * @protected
	 */
	handleShow(event) {
		var delegateTarget = event.delegateTarget;
		super.syncVisible(true);
		this.callAsync_(function() {
			this.alignElement = delegateTarget;
			this.visible = true;
		}, this.delay[0]);
	}

	/**
	 * Handles toggle event triggered by `events`.
	 * @param {!Event} event
	 * @protected
	 */
	handleToggle(event) {
		if (this.visible) {
			this.handleHide(event);
		} else {
			this.handleShow(event);
		}
	}

	/**
	 * Locks tooltip visibility.
	 * @param {!Event} event
	 */
	lock() {
		this.locked_ = true;
	}

	/**
	 * Unlocks tooltip visibility.
	 * @param {!Event} event
	 */
	unlock(event) {
		this.locked_ = false;
		this.handleHide(event);
	}

	/**
	 * Attribute synchronization logic for `alignElement` attribute.
	 * @param {Element} alignElement
	 * @param {Element} prevAlignElement
	 */
	syncAlignElement(alignElement, prevAlignElement) {
		if (prevAlignElement) {
			alignElement.removeAttribute('aria-describedby');
		}
		if (alignElement) {
			if (this.visible) {
				alignElement.setAttribute('aria-describedby', this.id);
			} else {
				alignElement.removeAttribute('aria-describedby');
			}
			if (this.inDocument) {
				Tooltip.Align.align(this.element, alignElement, this.position);
			}
		}
	}

	/**
	 * Attribute synchronization logic for `position` attribute.
	 * @param {Align.Top|Align.Right|Align.Bottom|Align.Left} position
	 */
	syncPosition(position) {
		this.updatePositionCSS(position);
		this.syncAlignElement(this.alignElement);
	}

	/**
	 * Attribute synchronization logic for `selector` attribute.
	 */
	syncSelector() {
		this.syncTriggerEvents(this.triggerEvents);
	}

	/**
	 * Attribute synchronization logic for `triggerEvents` attribute.
	 * @param {!Array<string>} triggerEvents
	 */
	syncTriggerEvents(triggerEvents) {
		if (!this.inDocument) {
			return;
		}
		this.eventHandler_.removeAllListeners();
		var selector = this.selector;
		if (!selector) {
			return;
		}

		this.eventHandler_.add(
			this.on('mouseenter', this.lock),
			this.on('mouseleave', this.unlock));

		if (triggerEvents[0] === triggerEvents[1]) {
			this.eventHandler_.add(
				dom.delegate(document, triggerEvents[0], selector, this.handleToggle.bind(this)));
		} else {
			this.eventHandler_.add(
				dom.delegate(document, triggerEvents[0], selector, this.handleShow.bind(this)),
				dom.delegate(document, triggerEvents[1], selector, this.handleHide.bind(this)));
		}
	}

	/**
	 * Attribute synchronization logic for `visible` attribute.
	 * Updates the element's opacity value according to it's visibility, and realigns
	 * the tooltip as needed.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		this.element.style.opacity = visible ? 1 : '';
		this.align();
	}

	/**
	 * Updates the css class for the current position.
	 * @param {number} position
	 */
	updatePositionCSS(position) {
		dom.removeClasses(this.element, Tooltip.PositionClasses.join(' '));
		dom.addClasses(this.element, Tooltip.PositionClasses[position]);
	}
}

/**
 * @inheritDoc
 * @see `Align` class.
 * @static
 */
Tooltip.Align = Align;

/**
 * Default tooltip elementClasses.
 * @default tooltip
 * @type {string}
 * @static
 */
Tooltip.ELEMENT_CLASSES = 'tooltip';

/**
 * Tooltip attrbutes definition.
 * @type {!Object}
 * @static
 */
Tooltip.ATTRS = {
	/**
	 * Element to align tooltip with.
	 * @type {Element}
	 */
	alignElement: {
		setter: dom.toElement
	},

	/**
	 * Delay showing and hiding the tooltip (ms).
	 * @type {!Array<number>}
	 * @default [ 500, 250 ]
	 */
	delay: {
		validator: Array.isArray,
		value: [500, 250]
	},

	/**
	 * Trigger events used to bind handlers to show and hide tooltip.
	 * @type {!Array<string>}
	 * @default ['mouseenter', 'mouseleave']
	 */
	triggerEvents: {
		validator: Array.isArray,
		value: ['mouseenter', 'mouseleave']
	},

	/**
	 * If a selector is provided, tooltip objects will be delegated to the
	 * specified targets by setting the `alignElement`.
	 * @type {?string}
	 */
	selector: {
		validator: core.isString
	},

	/**
	 * Content to be placed inside tooltip.
	 * @type {string}
	 */
	content: {
	},

	/**
	 * The position to try alignment. If not possible the best position will be
	 * found.
	 * @type {Align.Top|Align.Right|Align.Bottom|Align.Left}
	 * @default Align.Bottom
	 */
	position: {
		validator: Tooltip.Align.isValidPosition,
		value: Tooltip.Align.Bottom
	}
};

/**
 * CSS classes used for each align position.
 * @type {!Array}
 * @static
 */
Tooltip.PositionClasses = ['top', 'right', 'bottom', 'left'];

ComponentRegistry.register('Tooltip', Tooltip);

export default Tooltip;
