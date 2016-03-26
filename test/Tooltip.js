'use strict';

import { async } from 'metal';
import dom from 'metal-dom';
import Soy from 'metal-soy';
import Tooltip from '../src/Tooltip';

var tooltip;

describe('Tooltip', function() {
	afterEach(function() {
		if (tooltip) {
			tooltip.dispose();
		}
	});

	it('should render with default state', function() {
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

	it('should update when title state changes', function(done) {
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
		tooltip.once('stateSynced', function() {
			assert.strictEqual('1', tooltip.element.style.opacity);
			done();
		});
	});

	it('should decorate', function() {
		var element = document.createElement('div');
		dom.enterDocument(element);
		IncrementalDOM.patch(element, () => {
			Tooltip.TEMPLATE({
				id: 'tooltip',
				title: Soy.toIncDom('<b>content</b>')
			});
		});
		var outerHTML = element.querySelector('#tooltip').outerHTML;

		tooltip = new Tooltip({
			element: '#tooltip',
			title: '<b>content</b>',
			visible: false
		}).decorate();

		assert.strictEqual(tooltip.element.outerHTML, outerHTML);
	});

	it('should get the title from the DOM', function(done) {
		dom.enterDocument('<div id="tooltipTrigger2" data-title="title"></div>');
		var trigger = dom.toElement('#tooltipTrigger2');

		tooltip = new Tooltip({
			selector: '#tooltipTrigger2',
			visible: false
		}).render();

		dom.triggerEvent(trigger, 'mouseover');
		tooltip.on('stateSynced', function(data) {
			if (data.changes.title) {
				var innerElement = tooltip.element.querySelector('.tooltip-inner');
				assert.strictEqual('title', innerElement.innerHTML);
				dom.exitDocument(trigger);
				done();
			}
		});
	});
});
