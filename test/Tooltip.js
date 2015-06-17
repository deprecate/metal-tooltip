'use strict';

import async from 'bower:metal/src/async/async';
import dom from 'bower:metal/src/dom/dom';
import Tooltip from '../src/Tooltip';

var tooltip;

describe('Tooltip', function() {
	afterEach(function() {
		if (tooltip) {
			tooltip.dispose();
		}
	});

	it('should render with default attributes', function() {
		tooltip = new Tooltip().render();
		assert.strictEqual('', tooltip.element.style.display);
	});

	it('should render with content', function() {
		tooltip = new Tooltip({
			content: 'content'
		}).render();
		var innerElement = tooltip.element.querySelector('.tooltip-inner');
		assert.strictEqual('content', innerElement.innerHTML);
	});

	it('should update when content attribute change', function(done) {
		tooltip = new Tooltip().render();
		tooltip.content = 'content';
		async.nextTick(function() {
			var innerElement = tooltip.element.querySelector('.tooltip-inner');
			assert.strictEqual('content', innerElement.innerHTML);
			done();
		});
	});

	it('should show tooltip on mouseover by a selector after a delay', function(done) {
		dom.enterDocument('<div id="tooltipTrigger1">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger1');

		tooltip = new Tooltip({
			content: 'content',
			delay: [0, 0],
			selector: '#tooltipTrigger1',
			visible: false
		}).render();
		assert.ok(!tooltip.visible);
		dom.triggerEvent(trigger, 'mouseover');
		setTimeout(function() {
			assert.ok(tooltip.visible);
			assert.strictEqual(trigger, tooltip.alignElement);
			dom.exitDocument(trigger);
			done();
		}, 25);
	});

	it('should hide tooltip on mouseout by a selector after a delay', function(done) {
		dom.enterDocument('<div id="tooltipTrigger2">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger2');

		tooltip = new Tooltip({
			content: 'content',
			delay: [0, 0],
			selector: '#tooltipTrigger2',
			visible: true,
			alignElement: trigger
		}).render();
		dom.triggerEvent(trigger, 'mouseout');
		setTimeout(function() {
			assert.ok(!tooltip.visible);
			dom.exitDocument(trigger);
			done();
		}, 25);
	});

	it('should toggle tooltip on click by a selector after a delay', function(done) {
		dom.enterDocument('<div id="tooltipTrigger3">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger3');

		tooltip = new Tooltip({
			content: 'content',
			delay: [0, 0],
			triggerEvents: ['click', 'click'],
			selector: '#tooltipTrigger3',
			visible: false
		}).render();
		dom.triggerEvent(trigger, 'click');
		setTimeout(function() {
			assert.ok(tooltip.visible);
			dom.triggerEvent(trigger, 'click');
			setTimeout(function() {
				assert.ok(!tooltip.visible);
				dom.exitDocument(trigger);
				done();
			}, 25);
		}, 25);
	});

	it('should prevent tooltip to hide when mouseenter tooltip area', function(done) {
		dom.enterDocument('<div id="tooltipTrigger4">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger4');

		tooltip = new Tooltip({
			content: 'content',
			delay: [0, 0],
			selector: '#tooltipTrigger4',
			visible: false
		}).render();
		dom.triggerEvent(trigger, 'mouseover');
		setTimeout(function() {
			assert.ok(tooltip.visible);
			dom.triggerEvent(trigger, 'mouseout');
			dom.triggerEvent(tooltip.element, 'mouseenter');
			setTimeout(function() {
				assert.ok(tooltip.visible);
				dom.triggerEvent(tooltip.element, 'mouseleave');
				setTimeout(function() {
					assert.ok(!tooltip.visible);
					dom.exitDocument(trigger);
					done();
				}, 25);
			}, 25);
		}, 25);
	});

	it('should remove listeners when dettached', function(done) {
		dom.enterDocument('<div id="tooltipTrigger5">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger5');

		tooltip = new Tooltip({
			content: 'content',
			delay: [0, 0],
			selector: '#tooltipTrigger5',
			visible: false
		}).render();
		tooltip.detach();
		dom.triggerEvent(trigger, 'mouseover');
		setTimeout(function() {
			assert.ok(!tooltip.visible);
			dom.exitDocument(trigger);
			done();
		}, 25);
	});

	it('should stick open if only changes alignElement', function(done) {
		dom.enterDocument('<div class="trigger" id="tooltipTrigger6">trigger</div>');
		dom.enterDocument('<div class="trigger" id="tooltipTrigger7">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger6');
		var triggerOther = dom.toElement('#tooltipTrigger7');

		tooltip = new Tooltip({
			content: 'content',
			delay: [0, 0],
			triggerEvents: ['click', 'click'],
			selector: '.trigger'
		}).render();
		dom.triggerEvent(trigger, 'click');
		setTimeout(function() {
			dom.triggerEvent(trigger, 'click');
			dom.triggerEvent(triggerOther, 'click');
			setTimeout(function() {
				assert.ok(tooltip.visible);
				assert.strictEqual(triggerOther, tooltip.alignElement);
				dom.exitDocument(trigger);
				dom.exitDocument(triggerOther);
				done();
			}, 25);
		}, 25);
	});

	it('should decorate', function() {
		var markup = soy.$$getDelegateFn('Tooltip')({
			id: 'tooltip',
			elementClasses: 'bottom',
			content: 'content'
		}, null, {
			renderChildComponents: true
		});

		dom.append(document.body, markup.content);
		var outerHTML = document.getElementById('tooltip').outerHTML;

		tooltip = new Tooltip({
			element: '#tooltip',
			content: 'content',
			visible: false
		}).decorate();

		assert.strictEqual(tooltip.element.outerHTML, outerHTML);
	});
});
