<template>
    <div class="grid p-fluid">
        <div class="col-12">
            <div class="card">
                <Carousel :value="noticias" :numVisible="1" :numScroll="1" orientation="horizontal"
                    verticalViewPortHeight="500px" :responsiveOptions="responsiveOptions" containerClass="w-70rem"
                    contentClass="flex align-items-center">
                    <template #item="slotProps">
                        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
                            <div class="mb-3">
                                <img :src="
                                    'https://primefaces.org/cdn/primevue/images/product/'+slotProps.data.image
                                " :alt="slotProps.data.name" class="w-10 shadow-2" />
                            </div>
                            <div>
                                <h4 class="mb-1">{{ slotProps.data.name }}</h4>
                                <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>
                                <div class="mt-5">
                                    <Button icon="pi pi-search" rounded class="mr-2" />
                                    <Button icon="pi pi-star-fill" rounded severity="success" class="mr-2" />
                                    <Button icon="pi pi-cog" rounded severity="help" />
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
// import ProductService from "../service/ProductService";
import NoticiaService from "../service/NoticiaService";
import PhotoService from "../service/PhotoService";
export default {
    data() {
        return {
            noticias: [],
        };
    },
    created() {
        this.NoticiaService = new NoticiaService();
        this.photoService = new PhotoService();
    },
    mounted() {
        this.NoticiaService.getNoticias().then((noticias) => {
            this.noticias = noticias;
            console.log(noticias);
        });
        this.photoService.getImages().then((images) => {
            this.images = images;
        });
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/demo/badges.scss";
@import "../assets/demo/items.scss";
</style> 