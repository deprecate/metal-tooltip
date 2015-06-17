/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Tooltip.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Tooltip.
 * @hassoydeltemplate {Tooltip}
 * @hassoydeltemplate {Tooltip.inner}
 * @hassoydelcall {Tooltip}
 * @hassoydelcall {Tooltip.inner}
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="tooltip-arrow"></div>' + soy.$$getDelegateFn(soy.$$getDelTemplateId('Tooltip.inner'), '', true)(opt_data, null, opt_ijData));
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.content));
};
if (goog.DEBUG) {
  Templates.Tooltip.inner.soyTemplateName = 'Templates.Tooltip.inner';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Tooltip.__deltemplate_s7_5f2b5f73 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<section id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-inner" class="tooltip-inner">' + soy.$$escapeHtml(opt_data.elementContent) + '</section>');
};
if (goog.DEBUG) {
  Templates.Tooltip.__deltemplate_s7_5f2b5f73.soyTemplateName = 'Templates.Tooltip.__deltemplate_s7_5f2b5f73';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Tooltip.inner'), 'element', 0, Templates.Tooltip.__deltemplate_s7_5f2b5f73);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Tooltip.__deltemplate_s13_8d49094e = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Tooltip'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Tooltip.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Tooltip.__deltemplate_s13_8d49094e.soyTemplateName = 'Templates.Tooltip.__deltemplate_s13_8d49094e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Tooltip'), '', 0, Templates.Tooltip.__deltemplate_s13_8d49094e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Tooltip.__deltemplate_s19_71828d2a = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="tooltip component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Tooltip.__deltemplate_s19_71828d2a.soyTemplateName = 'Templates.Tooltip.__deltemplate_s19_71828d2a';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Tooltip'), 'element', 0, Templates.Tooltip.__deltemplate_s19_71828d2a);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Tooltip.__deltemplate_s27_992d380d = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Tooltip.inner'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Tooltip.inner(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Tooltip.__deltemplate_s27_992d380d.soyTemplateName = 'Templates.Tooltip.__deltemplate_s27_992d380d';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Tooltip.inner'), '', 0, Templates.Tooltip.__deltemplate_s27_992d380d);

Templates.Tooltip.content.params = ["content"];
Templates.Tooltip.inner.params = ["content"];
export default Templates.Tooltip;
/* jshint ignore:end */
