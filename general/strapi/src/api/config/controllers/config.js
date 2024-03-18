/**
 * config controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::config.config');
