'use strict';

/**
 * access-pull-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::access-pull-request.access-pull-request');
