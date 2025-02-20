'use strict';

/**
 * access-current router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::access-current.access-current');
