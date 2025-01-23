'use strict';

/**
 * access-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::access-product.access-product');
