<template>
  <div class="not-found">
    <article>
      <section class="blank not-found-header">
        <p class="big-sign">404</p>
        <p class="big muted">Entity not found</p>
        <p class="muted">
          The entity you are looking for does not exist. Please try again.
        </p>
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
  name: 'EntityNotFound',
};
</script>
