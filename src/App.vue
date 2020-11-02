<template>
  <div id="app">
    <div id="nav">
      <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body {
    background: #d8c6c6;
  }

#nav {

  nav {
    background-color: rgb(158, 88, 88);
  }
  padding: 30px;

  a {
    font-weight: bold;
       color: #c5a9a9;

    &.router-link-exact-active {
        color: #f0ecec;
    }
  }
}
</style>
