<template>
  <div class="not-found">
    <article>
      <section class="blank not-found-header">
        <p class="big-sign">403</p>
        <p class="big muted">You don't have access to this resource</p>
        <p class="muted">Please login and try again.</p>
      </section>

      <section>
        <h2>Tips</h2>
        <p>Try using search box or modules tree to find ontology resources.</p>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'UnauthorizedError'
};
</script>
