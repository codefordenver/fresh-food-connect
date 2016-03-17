/* global __DEVTOOLS__ */

if (__DEVTOOLS__) {
  module.exports = require('persistence/configureStore.dev')
} else {
  module.exports = require('persistence/configureStore.prod')
}
