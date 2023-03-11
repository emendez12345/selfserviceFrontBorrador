<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <h5 class="m-4">Proveedores Compras</h5>
          </template>
        </Toolbar>
        <DataTable
          ref="dt"
          :value="proveedores"
          v-model:selection="seleccionarProveedores"
          dataKey="id"
          :loading="loading"
          stripedRows
          responsiveLayout="scroll"
          @row-select="onProductSelect"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="Número de identificacion"
            header="Número de identificación."
          >
            <template #body="slotProps">
              {{ slotProps.data.numero_identificacion }}
            </template>
          </Column>
          <Column header="Acciones">
            <template #body="slotProps">
              <em
                class="pi pi-eye mr-2 text-black-500 text-xl cursor-pointer"
                v-tooltip.left="'Documentos del proveedor'"
                @click="verDetalleDoc(slotProps.data.facturas)"
              ></em>
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="proveedorDialog"
          :style="{ width: '450px' }"
          header="Documentos Proveedor"
          :modal="true"
          class="p-fluid"
        >
          <DataTable ref="dt" :value="factura" v-model:selection="seleccionarDocumentos" :loading="loading" stripedRows responsiveLayout="scroll" @row-select="onProductSelect">
            <ColumnGroup type="header">
            <Row>
                <Column header="Factura" :rowspan="3" />
                <Column header="Valor a pagar" :colspan="4" />
            </Row>
        </ColumnGroup>
        <Column field="numero" />

          </DataTable>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
    //   loading: true,
      proveedorDialog: false,
      facturas: null,
      factura:null,
      proveedores: null
    };
  },
  created() {
    // this.obtenerProveedores();
    // this.obtenerDetalleEstado();
    // this.obtenerEstados();

    this.proveedores = [
      {
        numero_identificacion: "12345",
        facturas: [
             {numero:'98765342'}
        ],
      },
    ];
  },
  methods: {
    async verDetalleDoc(event) {
      this.proveedorDialog = true;
      event.forEach(e => {
        this.factura=e;
        console.log(this.factura);
      });
    },
    hideDialog() {
      this.proveedorDialog = false;
      this.validarProveedorDialog = false;
      this.NuevaAreaProveedorDialog = false;
    },
  },
  watch: {
    async rangeDate(newQuestion) {
      if (newQuestion) {
        await this.verDetalleDoc(newQuestion);
      }
    },
    deep: true,
  },
};
</script>
