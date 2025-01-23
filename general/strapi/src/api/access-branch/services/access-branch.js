'use strict';

/**
 * access-branch service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::access-branch.access-branch');
