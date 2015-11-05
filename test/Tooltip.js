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
			content: 'content'
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
