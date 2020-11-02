<template>
<div class="wrapper">
  <div class="headerWrapper">
  <h1 class="headerText">Product World</h1>
  <h5 class="subheaderText">A Place for a World of Products</h5>

  <div class="addProductWrapper">
  <h6>ADD PRODUCT</h6>
      <input class="input" type="text"
      v-model="addProductData.product_id"
      placeholder="ID">
      <input class="input" type="text"
      v-model="addProductData.name"
      placeholder="Product Name">
      <input class="input" type="text"
      v-model="addProductData.price"
      placeholder="Price">
      <div 
      @click="submitProduct"
      class="inputButton"><h6 class="buttonText">Submit Product</h6></div>

  </div>

  </div>
  <div 
   class="productCard"
    v-for="product in sortedProducts"
    :key="product.product_id"
  >
  <h3 class="productIdText"> {{ product.product_id }}</h3>
  <h6> <span class='bold'>Product:</span> {{ product.name }} </h6>
    <h6> <span class='bold'>Price:</span> ${{ product.price }}</h6>
 
    
  </div>
</div>


</template>

<script>

import db from '@/db'
export default {
  name: 'Products',
  data() {
    return {
      products: [],
      addProductData: {
        product_id: '',
        name: '',
        price: ''
      }
    }
  },
  methods: {

    getProducts () {
      db.collection('products').get().then(querySnapshot => {
        const scopedProducts = []
        querySnapshot.forEach(doc => {
          scopedProducts.push(doc.data())
        })
        this.products = scopedProducts
      })
    },

    submitProduct() {
  db.collection('products').add(this.addProductData).then(this.getProducts)
    }
  },
  created() {
    this.getProducts()
  },
  computed: {
    sortedProducts () {
      return this.products.slice().sort((a, b) => {
        return a.product_id - b.product_id
      })
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
  line-height: 0;

}

.subheaderText {

}

.productCard {
  margin-top:2rem;
  display: flex;

  justify-content: space-around;
  align-items: center;
  background-color: rgb(250, 248, 248);
  border: 1px solid black;
}

.addProductWrapper {
  margin-top: 5rem;
    border: 1px solid black;
    background-color: rgb(250, 248, 248);
    padding: 0 20px;
}
.input {
  padding-left: 20px;
}

.inputButton {
    border: 1px solid black;
    background-color: rgb(158, 88, 88);
  margin: 20px 0 20px 0;
}

.buttonText {
  color: white;
}

</style>
