<template>
  <div class="grid p-fluid">
      <div class="col-12">
          <div class="card">
              <Carousel :value="products" :numVisible="3" :numScroll="3" :circular="false" :responsiveOptions="carouselResponsiveOptions">
                  <template #item="product">
                      <div class="product-item">
                          <div class="product-item-content">
                              <div class="mb-3">
                                  <img :src="'images/product/' + product.data.image" :alt="product.data.name" class="product-image" />
                              </div>
                              <div>
                                  <div class="car-buttons mt-5">
                                      <Button type="button" class="p-button p-button-rounded mr-2" icon="pi pi-search"></Button>
                                      <Button type="button" class="p-button-success p-button-rounded mr-2" icon="pi pi-star-fill"></Button>
                                      <Button type="button" class="p-button-help p-button-rounded" icon="pi pi-cog"></Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </template>
              </Carousel>
          </div>
      </div>

  </div>
</template>

<script>
import ProductService from "../service/ProductService";
import PhotoService from "../service/PhotoService";
export default {
  data() {
      return {
          products: [],
      };
  },
  created() {
      this.productService = new ProductService();
      this.photoService = new PhotoService();
  },
  mounted() {
      this.productService.getProductsSmall().then((products) => {
          this.products = products;
      });
      this.photoService.getImages().then((images) => {
          this.images = images;
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/demo/badges.scss';
@import '../assets/demo/items.scss';
</style> 