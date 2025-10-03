'use strict';

/**
 * access-current service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::access-current.access-current');
