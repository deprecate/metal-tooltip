'use strict';

import { async } from 'metal';
import dom from 'metal-dom';
import { SoyTemplates } from 'metal-soy';
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

	it('should render with title', function() {
		tooltip = new Tooltip({
			title: 'content'
		}).render();
		var innerElement = tooltip.element.querySelector('.tooltip-inner');
		assert.strictEqual('content', innerElement.innerHTML);
	});

	it('should update when title attribute changes', function(done) {
		tooltip = new Tooltip().render();
		tooltip.title = 'content';
		async.nextTick(function() {
			var innerElement = tooltip.element.querySelector('.tooltip-inner');
			assert.strictEqual('content', innerElement.innerHTML);
			done();
		});
	});

	it('should set opacity to 1 when tooltip becomes visible', function(done) {
		tooltip = new Tooltip({
			visible: false
		}).render();
		assert.notStrictEqual('1', tooltip.element.style.opacity);

		tooltip.visible = true;
		tooltip.once('attrsSynced', function() {
			assert.strictEqual('1', tooltip.element.style.opacity);
			done();
		});
	});

	it('should decorate', function() {
		var markup = SoyTemplates.get('Tooltip', 'render')({
			id: 'tooltip',
			title: 'content'
		});

		dom.append(document.body, markup.content);
		var outerHTML = document.getElementById('tooltip').outerHTML;

		tooltip = new Tooltip({
			element: '#tooltip',
			title: 'content',
			visible: false
		}).decorate();

		assert.strictEqual(tooltip.element.outerHTML, outerHTML);
	});

	it('should get the title from the DOM', function(done) {
		dom.enterDocument('<div id="tooltipTrigger2" title="title"></div>');
		var trigger = dom.toElement('#tooltipTrigger2');

		tooltip = new Tooltip({
			selector: '#tooltipTrigger2',
			visible: false
		}).render();

		dom.triggerEvent(trigger, 'mouseover');
		tooltip.once('attrsSynced', function() {
			var innerElement = tooltip.element.querySelector('.tooltip-inner');
			assert.strictEqual('title', innerElement.innerHTML);
			dom.exitDocument(trigger);
			done();
		});
	});

	it('should remove/returns the title attribute from the DOM element on mouseover/mouseout', function(done) {
		dom.enterDocument('<div id="tooltipTrigger3" title="title">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger3');

		tooltip = new Tooltip({
			selector: '#tooltipTrigger3',
			visible: false
		}).render();

		assert.strictEqual('title', trigger.getAttribute('title'));
		dom.triggerEvent(trigger, 'mouseover');
		tooltip.once('attrsSynced', function() {
			assert.strictEqual(null, trigger.getAttribute('title'));
			dom.triggerEvent(trigger, 'mouseout');
			tooltip.once('attrsSynced', function() {
				assert.strictEqual('title', trigger.getAttribute('title'));
				dom.triggerEvent(trigger, 'mouseover');
				tooltip.once('attrsSynced', function() {
					assert.strictEqual(null, trigger.getAttribute('title'));
					done();
				});
			});
		});
	});

	it('should return the DOM to the incial state on Tooltip dispose', function(done) {
		dom.enterDocument('<div id="tooltipTrigger3" title="title">trigger</div>');
		var trigger = dom.toElement('#tooltipTrigger3');

		tooltip = new Tooltip({
			selector: '#tooltipTrigger3',
			visible: false
		}).render();

		assert.strictEqual('title', trigger.getAttribute('title'));
		dom.triggerEvent(trigger, 'mouseover');
		tooltip.once('attrsSynced', function() {
			assert.strictEqual(null, trigger.getAttribute('title'));
			tooltip.dispose();
			assert.strictEqual('title', trigger.getAttribute('title'));
			done();
		});
	});
});
