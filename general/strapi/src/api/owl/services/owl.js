'use strict';

/**
 * owl service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::owl.owl');
