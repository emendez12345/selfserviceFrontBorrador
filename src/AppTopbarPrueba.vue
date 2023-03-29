<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>SELFSERVICE</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <div class="layout-topbar-menu hidden lg:flex origin-top">
      <button class="p-link layout-topbar-button" @click="toggle">
        <i class="pi pi-user"></i>
      </button>
    </div>
    <Menu ref="menu" :model="menu" :popup="true">
      <SelectButton />
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          items: [
            {
              label: "Cerrar sesión",
              icon: "pi pi-fw pi-power-off",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      //   this.menu[0].label = this.user.name;
      console.log(this.$refs.menu.toggle(event));

      //   this.$refs.menu.toggle(event);
    },
    mensajePrueba() {
      this.mensaje = "mensaje de prueba";
      return;
    },
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo-dark.svg";
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>