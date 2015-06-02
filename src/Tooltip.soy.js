/* jshint ignore:start */
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Tooltip.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Tooltip.
 * @hassoydeltemplate {Tooltip}
 * @hassoydelcall {Tooltip}
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
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
Templates.Tooltip.__deltemplate_s3_8d49094e = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Tooltip'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Tooltip.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Tooltip.__deltemplate_s3_8d49094e.soyTemplateName = 'Templates.Tooltip.__deltemplate_s3_8d49094e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Tooltip'), '', 0, Templates.Tooltip.__deltemplate_s3_8d49094e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Tooltip.__deltemplate_s9_71828d2a = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="tooltip component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Tooltip.__deltemplate_s9_71828d2a.soyTemplateName = 'Templates.Tooltip.__deltemplate_s9_71828d2a';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Tooltip'), 'element', 0, Templates.Tooltip.__deltemplate_s9_71828d2a);

/* jshint ignore:end */
