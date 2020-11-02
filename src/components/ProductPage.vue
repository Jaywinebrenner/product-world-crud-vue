<template>
<div class="productPageWrapper">
    <div v-if="!isLoading" class="headerWrapper">
    <h1 class="headerText">Product Page</h1>
    <h2> {{ name }}</h2>
    <h2>{{ price }} </h2>
  </div>

  <div v-if="isLoading" class="isLoadingDiv">
      <h1>Loading...</h1>
  </div>


</div>
</template>

<script>
import db from '@/db'

export default {
  name: 'ProductPage',
  data() {
    return {
        name: '',
        price: '',
        isLoading: true
    
    }
  },
  beforeCreate() {
      this.isLoading = true
    db.collection('products')
    .where('product_id', '==', this.$route.params.product_id).get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            this.name = doc.data().name
            this.price = doc.data().price

            // Other syntax
            // const { name, price } = doc.data()
            // this.name = name
            // this.price = price
        })
        this.isLoading = false
    })

  }

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

.isLoadingDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid black;
}


</style>
