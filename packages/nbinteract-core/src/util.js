/**
 * Private utility functions used primarily by NbInteract.js
 */

import { KernelMessage } from '@jupyterlab/services'

/**
 * Converts a notebook HTTP URL to a WebSocket URL
 */
export const baseToWsUrl = baseUrl =>
  'wss:' +
  baseUrl
    .split(':')
    .slice(1)
    .join(':')

/**
 * Message type for widgets
 */
export const WIDGET_MSG = 'application/vnd.jupyter.widget-view+json'

/**
 * Functions to work with notebook DOM
 */
export const pageHasWidgets = () =>
  document.querySelector('.output_widget_view') !== null
export const cellToCode = cell => cell.querySelector('.input_area').textContent
export const isWidgetCell = cell =>
  cell.querySelector('.output_widget_view') !== null
export const cellToWidgetOutput = cell =>
  cell.querySelector('.output_widget_view')
export const removeLoadingFromCell = cell => {
  // Keep in sync with interact_template.tpl
  const el = cell.querySelector('.js-widget-loading-indicator')
  if (el) el.remove()
}

/**
 * Functions to work with kernel messages
 */
export const isErrorMsg = msg => msg.msg_type === 'error'
export const msgToModel = (msg, manager) => {
  if (!KernelMessage.isDisplayDataMsg(msg)) {
    return
  }

  const widgetData = msg.content.data[WIDGET_MSG]
  if (widgetData === undefined || widgetData.version_major !== 2) {
    return
  }

  const model = manager.get_model(widgetData.model_id)
  return model
}
