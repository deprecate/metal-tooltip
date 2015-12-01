'use strict';

import async from 'bower:metal/src/async/async';
import dom from 'bower:metal/src/dom/dom';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
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
		var markup = SoyTemplates.get('Tooltip', 'content')({
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
		dom.enterDocument('<div id="tooltipTrigger2" data-title="title"></div>');
		var trigger = dom.toElement('#tooltipTrigger2');

		tooltip = new Tooltip({
			selector: '#tooltipTrigger2',
			visible: false
		}).render();

		dom.triggerEvent(trigger, 'mouseover');
		tooltip.once('attrsSynced', function() {
			tooltip.once('attrsSynced', function() {
				var innerElement = tooltip.element.querySelector('.tooltip-inner');
				assert.strictEqual('title', innerElement.innerHTML);
				dom.exitDocument(trigger);
				done();
			});
		});
	});
});
