<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="New"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew"
              />
            
            </div>
          </template>

          <template v-slot:end>
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="users"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="
                flex flex-column
                md:flex-row md:justify-content-between md:align-items-center
              "
            >
              <h5 class="m-0">Usuarios</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="nombre"
            header="Nombre"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">nombre</span>
              {{ slotProps.data.nombre }}
            </template>
          </Column>
          <Column
            field="telefono"
            header="Telefono"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">telefono</span>
              {{ slotProps.data.telefono }}
            </template>
          </Column>

          <Column field="estado" header="Habilitada" :sortable="true">
            <template #body="slotProps">
              <em
                class="pi"
                :class="{
                  'text-teal-500 pi-check-circle': slotProps.data.estado,
                  'text-red-500 pi-times-circle': !slotProps.data.estado,
                }"
              ></em>
            </template>
          </Column>

          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editProduct(slotProps.data)"
              />
          
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="productDialog"
          :style="{ width: '450px' }"
          :header="dataUser.nombre ? dataUser.nombre : 'Crear Usuario'"
          :modal="true"
          class="p-fluid"
        >
          <img
            :src="'images/product/' + product.image"
            :alt="product.image"
            v-if="product.image"
            width="150"
            class="mt-0 mx-auto mb-5 block shadow-2"
          />
          <div class="col-12">
            <Message
              v-if="showMessage"
              :sticky="false"
              :severity="messages.severity"
              :icon="messages.icon"
              >{{ messages.content }}</Message
            >
          </div>

          <div class="field">
            <label for="nombre">Nombre</label>
            <InputText
              placeholder="Nombre"
              id="nombre"
              v-model.trim="dataUser.nombre"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !dataUser.nombre }"
            />
            <small class="p-invalid" v-if="submitted && !dataUser.nombre"
              >nombre is required.</small
            >
          </div>
          <div class="field">
            <label for="telefono">Telefono</label>
            <InputMask
              mask="999-999-99-99"
              placeholder="999-999-99-99"
              id="telefono"
              v-model.trim="dataUser.telefono"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !dataUser.telefono }"
            />
            <small class="p-invalid" v-if="submitted && !dataUser.telefono"
              >telefono is required.</small
            >
          </div>

          <div class="field">
            <div class="col-12 md:col-2">
              <div class="field">
                <label for="estado">Habilitada</label>
                <ToggleButton
                  style="text-align: justify"
                  v-model="dataUser.estado"
                  onLabel="Si"
                  offLabel="No"
                />
              </div>
            </div>
          </div>
          <div class="field" v-if="dataUser.exp">
            <label for="password1" class="mb-3">Contraseña</label>
            <Password
              :class="{
                'p-invalid': v$.dataUser.password.$invalid && submitted,
              }"
              placeholder="Contraseña"
              v-model="dataUser.password"
              toggleMask
              id="password"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              :disabled="desabilitado"
            >
              <template #header>
                <h4>Ingresa una contraseña</h4>
              </template>
              <template #footer="sp">
                {{ sp.level }}
                <Divider />
                <p class="mt-2">Sugerencias</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>Al menos una minúscula</li>
                  <li>Al menos una mayúscula</li>
                  <li>Al menos un número</li>
                  <li>Mínimo 8 caracteres</li>
                </ul>
              </template>
            </Password>
          </div>
          <div class="field" v-if="dataUser.exp">
            <Password
              :class="{
                'p-invalid':
                  v$.dataUser.password_confirmation.$invalid && submitted,
              }"
              id="password"
              :feedback="false"
              v-model="dataUser.password_confirmation"
              placeholder="Confirmar contraseña"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              :disabled="desabilitado"
            >
            </Password>
          </div>

          <template #footer>
            <Button
              label="Cancel"
              icon="pi pi-times"
              class="p-button-text"
              @click="hideDialog"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              class="p-button-text"
              @click="saveProduct(!v$.$invalid)"
              :disabled="desabilitado"
            />
          </template>
        </Dialog>

      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import ProductService from "@/service/ProductService";
import { getUser } from "@/api/usuarioServices";
import { createUser } from "@/api/usuarioServices";
import useVuelidate from "@vuelidate/core";
import { required, sameAs, minLength, helpers } from "@vuelidate/validators";
//import { actualizarUsuarios } from "@/api/usuarioServices";
//import { getById } from "@/api/usuarioServices";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      desabilitado: false,
      users: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      dataUser: {
        id_usuario: "",
        nombre: "",
        telefono: "",
        password: "",
        password_confirmation: "",
        exp: null,
      },
      selectedProducts: null,
      filters: {},
      submitted: false,
      showMessage: false,
      messages: {
        severity: "",
        content: "",
      },
      statuses: [
        { label: "APROBADO", value: "aprobado" },
        { label: "INICIAL", value: "inicial" },
      ],
    };
  },
  
  created() {
    this.productService = new ProductService();
    this.initFilters();
  },
  async mounted() {
    //   this.productService.getProducts().then((data) => (this.products = data));
    const resp = await getUser();
    this.users = resp;
    //  console.log(resp);
  },
  validations() {
    const strongRegex = helpers.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
    );
    return {
      dataUser: {
        nombre: { required },
        telefono: { required },
        password: { required, minLength: minLength(6), strongRegex },
        password_confirmation: {
          required,
          sameAsPassword: sameAs(this.dataUser.password),
        },
      },
    };
  },
  methods: {
    formatCurrency(value) {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
    },
    openNew() {
      this.dataUser = {};
      this.submitted = false;
      this.productDialog = true;
      this.showMessage = false;
      this.dataUser.exp = true;
    },
    editProduct(dataUser) {
      this.dataUser = { ...dataUser };
      console.log(this.dataUser);
      this.productDialog = true;
      this.dataUser.exp = false;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    async saveProduct(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        this.messages.severity = "error";
        this.messages.content = "Por favor verificar los campos";
        this.showMessage = !this.showMessage;
        return;
      } else {
        if (this.dataUser.id_usuario) {
          console.log("Actualizando");
        /*  this.dataUser = await actualizarUsuarios(this.dataUser);
          console.log(this.dataUser);

          this.$toast.add({
            severity: "success",
            summary: "Correcto",
            detail: "El usuario se ha editado correctamente",
            life: 3000,
          });*/
        } else {
          console.log("creando");
          await createUser(this.dataUser);
          this.users.push(this.dataUser);
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Usuario Creado",
            life: 3000,
          });
        }
        this.productDialog = false;
        this.dataUser = {};
      }
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/demo/badges.scss";
</style>
