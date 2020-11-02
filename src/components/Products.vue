<template>
<div class="wrapper">
  <div class="headerWrapper">
  <h1 class="headerText">Product World</h1>
  <h5 class="subheaderText">A Place for a World of Products</h5>

  <div v-if="!isLoading" class="addProductWrapper">
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

    <div v-if="isLoading" class="loadingWrapper">
      <h1>LOADING</h1>
  </div>

  </div>

  <div 
   class="productCard"
    v-for="product in sortedProducts"
    :key="product.product_id"
  >
    <div
    class="topCardEditMode"
    v-if="editId === product.product_id"
    >
    <div>{{ product.product_id }}</div>
    <input type="text" v-model="editProductData.name">
    <input type="text" v-model="editProductData.price">
    </div>


  <div class="topCard" v-else>
    <h6 class="productIdText"> {{ product.product_id }}</h6>
    <h6> <span class='bold'>Product:</span> {{ product.name }} </h6>
      <h6> <span class='bold'>Price:</span> ${{ product.price }}</h6>
  </div>

    <div class="bottomCardEditMode"
     v-if="editId === product.product_id"
    >
    <h6 class="editText" @click="onCancel">Cancel</h6>
    <h6 class="deleteText" @click="onEditSubmit">Confirm</h6>
  </div>
    

  <div class="bottomCard" v-else>
    <router-link
    :to="{
      name: 'ProductPage',
      params: { product_id: product.product_id }
    }"
    ><h6>Details</h6></router-link>
 
    <h6 class="editText" @click="onEdit(product)">Edit</h6>
    <h6 class="deleteText" @click="onDelete(product.product_id)">Delete</h6>
  </div>
    
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
      isLoading: false,
      editId: '',
      addProductData: {
        product_id: '',
        name: '',
        price: ''
      },
        editProductData: {
          product_id: '',
          name: '',
          price: ''
      }
    }
  },
  methods: {

    getProducts() {
       this.isLoading = true
      db.collection('products').get().then(querySnapshot => {

        const scopedProducts = []
        querySnapshot.forEach(doc => {
          scopedProducts.push(doc.data())
        })
        this.products = scopedProducts
        this.isLoading = false
      })
    },

  submitProduct() {
    this.isLoading = true
    db.collection('products').add(this.addProductData).then(this.getProducts)
    this.isLoading = false
      },

    onDelete (product_id) {
      db.collection('products')
        .where('product_id', '==', product_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(this.getProducts)
          })
        })
      },

      onEdit(product) {
      this.editId = product.product_id
      this.editProductData.name = product.name
      this.editProductData.price = product.price
      },

      onCancel() {
        this.editId = ''
      this.editProductData.name = ''
      this.editProductData.price = ''
      },

    onEditSubmit () {
      db.collection('products')
        .where('product_id', '==', this.editId).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.set({
              product_id: this.editId,
              name: this.editProductData.name,
              price: this.editProductData.price
            }).then(this.getProducts)
          })
          this.onCancel()
        })
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

.productCard {
    min-width: 400px;
  margin-top:2rem;
  margin-bottom: 2rem;
  display: flex;
  background-color: rgb(250, 248, 248);
  border: 1px solid black;
  justify-content: center;
}

.topCard{
  flex: 3;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(249, 250, 248);
  // border: 1px solid black;
}

.topCardEditMode {
  flex: 3;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
    background-color: rgb(231, 225, 143);

}

.bottomCard {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(250, 250, 248);
  border-left: 1px solid black;
}

.bottomCardEditMode {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(212, 203, 71);
  border-left: 1px solid black;
}

.addProductWrapper {
  min-width: 400px;
  height: 280px;
  text-align: center;
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
  cursor: pointer;
  text-align: center;
}

.buttonText {
  color: white;
}

.loadingWrapper {
    min-width: 400px;
    background-color: rgb(250, 248, 248);
    height: 280px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.deleteText {
  cursor: pointer;
  color: rgb(158, 88, 88);
}

.editText {
    cursor: pointer;

}

</style>
