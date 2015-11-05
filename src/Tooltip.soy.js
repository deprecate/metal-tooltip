/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from Tooltip.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Tooltip.
 */

if (typeof Templates.Tooltip == 'undefined') { Templates.Tooltip = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Tooltip.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var positionClasses__soy3 = ['top', 'right', 'bottom', 'left'];
  var positionClass__soy4 = opt_data.position != null ? positionClasses__soy3[opt_data.position] : 'bottom';
  output += '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="tooltip component ' + soy.$$escapeHtmlAttribute(positionClass__soy4) + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="tooltip"><div class="tooltip-arrow"></div>' + Templates.Tooltip.inner(opt_data, null, opt_ijData) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Tooltip.content.soyTemplateName = 'Templates.Tooltip.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Tooltip.inner = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<section id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-inner" class="tooltip-inner">' + soy.$$escapeHtml(opt_data.content ? opt_data.content : '') + '</section>');
};
if (goog.DEBUG) {
  Templates.Tooltip.inner.soyTemplateName = 'Templates.Tooltip.inner';
}

Templates.Tooltip.content.params = ["id"];
Templates.Tooltip.inner.params = ["content","id"];

class Tooltip extends Component {
  static setImpl(ctor) {
    ComponentRegistry.register(ctor, 'Tooltip');
  }
}
Tooltip.RENDERER = SoyRenderer;
Tooltip.setImpl(Tooltip);
SoyAop.registerTemplates('Tooltip');
export default Tooltip;
/* jshint ignore:end */
