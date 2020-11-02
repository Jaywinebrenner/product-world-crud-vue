<template>
  <div class="headerWrapper">
  <h1 class="headerText">Product Page</h1>
  <h2>{{ name }}</h2>
  <h2>{{ price }} </h2>
  </div>
</template>

<script>


export default {
  name: 'ProductPage',
  data() {
    return {
    
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.wrapper {
  margin: 0 12rem;
}

.bold {
  font-weight: 600;
}

.headerText {
  line-height: .7;
}

.subheaderText {
  line-height: .7;
}

.headerWrapper {
  text-align: center;
}


</style>
