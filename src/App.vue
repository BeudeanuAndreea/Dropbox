<template>
  <div id="app">
    <div id="nav">
      <img src="./assets/dropbox.png">
    </div>
    <router-view />
  </div>
</template>


<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  display: flex;
}
img {
  width: 70px;
  height: 70px;
  margin: 30px auto 100px auto;
}

</style>
