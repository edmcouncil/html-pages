<template>
  <div class="connectionProblemScreen">
    <header>
      <a class="navbar-brand" href="https://edmcouncil.org" target="_blank">
        <img id="edmc-logo" src="@/assets/img/edmc-logo.jpg" />
      </a>
    </header>
    <article class="full-page">
      <section class="blank">
        <img src="@/assets/icons/warning.svg" alt="Warning image" />
        <h1 class>Connection Failed</h1>
        <p class="muted">Couldn't reach our servers, please try again later.</p>

        <a href="https://spec.edmcouncil.org/">Return to homepage</a>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ConnectionProblem'
}
</script>

<style lang="scss" scoped>
.connectionProblemScreen {
  background: rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
  min-height: 100vh;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  header {
    #edmc-logo {
      position: absolute;
      left: 30px;
      top: 20px;
      width: 200px;
    }
  }

  article {
    padding-top: 60px;

    h1 {
      opacity: 0.8;
    }
  }

  article img {
    width: 60px;
    opacity: 0.5;
    padding-bottom: 50px;
  }

  &::before {
    position: absolute;
    content: "";
    width: 0px;
    height: 0px;
    top: 45%;
    left: 50%;
    border-radius: 50px;
    box-shadow: 0px 0px 230px 230px rgba(255, 0, 0, 0.08);
  }
}
</style>
