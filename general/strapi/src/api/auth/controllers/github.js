'use strict';

/**
 * A set of functions called "actions" for `github`
 */

const purest = require('purest');
const github = purest({
  provider: 'github',
  defaults: {
    headers: {
      'user-agent': 'strapi',
    },
  },
});

module.exports = {
  callback: async (ctx, next) => {
    const ret = await strapi.controller('plugin::users-permissions.auth').callback(ctx, next);
    if ((ctx.response.status === 200) && (ctx.response.body.user?.provider === 'github')) {
      const { body: teamsBody } = await github.get('user/teams').auth(ctx.request.query.access_token).request();
      const githubs = (await strapi.entityService.findMany('api::auth.github', {sort: 'id', populate: ['role']})).find((rule) => (teamsBody.find((team) => rule.organization === team.organization?.login && (rule.slug === undefined ? true : rule.slug === team.slug )) !== undefined));
      // strapi.log.debug('githubs: '+JSON.stringify(githubs));
      if (Number.isInteger(githubs?.role?.id)) {
        const user = await strapi.entityService.findOne('plugin::users-permissions.user', ctx.response.body.user.id, {populate: ['role']});
        if (Number.isInteger(user?.role?.id) && (githubs.role.id !== user.role.id)) {
         strapi.log.warn(user.provider+'('+user.email+').role: "'+user.role.name+'" -> "'+githubs.role.name+'"');
         // const edit_user = await strapi.service('plugin::users-permissions.user').edit(user.id, {});
         const edit_user = await strapi.entityService.update("plugin::users-permissions.user", user.id, {data: {role: githubs.role.id}});
        }
      }
    }
    return ret;
  }
};
