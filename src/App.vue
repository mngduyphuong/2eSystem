<template>
  <div>
    <b-navbar
      toggleable="md"
      type="dark"
      variant="primary"
      style="padding: 0.5rem 1rem"
    >
      <b-navbar-brand to="/">
        <div>
          <img src="./assets/2e_logo.png" width="40%" />
        </div>
      </b-navbar-brand>
      <!-- nav bar keep on top of the web all time, collapse when viewing on smaller resolution device -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="nav-link" to="/">Home</b-nav-item>
          <b-nav-item class="nav-link" to="/airlines">Airlines</b-nav-item>
          <b-nav-item class="nav-link" to="/airports">Airports</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Router view, router can be modified in router/index.js file-->
    <!-- There are 3 main pages with addition child components -->
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.nav-link {
  font-size: 1.2rem;
}
</style>
