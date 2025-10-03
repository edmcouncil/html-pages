'use strict';

/**
 * access-release service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::access-release.access-release');
