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
        <FileUpload
          name="PDF"
          :customUpload="true"
          @uploader="subirArchivo($event)"
          @upload="onUpload"
          :multiple="true"
          :maxFileSize="1000000"
          invalidFileSizeMessage="El tamaño del archivo es demasiado grande"
          chooseLabel="Seleccionar"
          uploadLabel="Subir"
          cancelLabel="Cancelar"
          invalidFileTypeMessage="El tipo de archivo no es válido"
        />

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
                @click="verDetalleDoc(slotProps.data)"
              ></em>
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="proveedorDialog"
          header="Documentos Proveedor"
          :modal="true"
          class="p-fluid"
        >
          <DataTable :value="factura.factura" tableStyle="min-width: 10rem">
            <ColumnGroup type="header">
              <Row>
                <Column header="Factura" :rowspan="3" />
              </Row>
              <Row>
                <Column header="Valor" />
              </Row>
            </ColumnGroup>
            <Column field="numero" />
            <Column field="valor">
              <template #body="slotProps">
                {{ slotProps.data.valor }}
              </template>
            </Column>
            <ColumnGroup type="footer">
              <Row>
                <Column
                  footer="Total:"
                  :colspan="3"
                  footerStyle="text-align:right"
                />
                <Column :footer="sumarValores" />
              </Row>
            </ColumnGroup>
          </DataTable>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { subirPdf } from "../api/proveedorService";
export default {
  setup() {},
  data() {
    return {
      //   loading: true,
      proveedorDialog: false,
      facturas: null,
      factura: null,
      proveedores: null,
    };
  },
  created() {
    // this.obtenerProveedores();
    // this.obtenerDetalleEstado();
    // this.obtenerEstados();

    this.proveedores = [
      {
        numero_identificacion: "1144030066",
        facturas: [
          { numero: "98765342", valor: 123000 },
          { numero: "92547891", valor: 250000 },
        ],
      },
    ];
  },
  methods: {
    // formatCurrency(value) {
    //   return value.toLocaleString("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   });
    // },
    async subirArchivo(event) {
      this.pdfaux = event.files[0];
      await subirPdf(
        "/subirexcel",
        {
          numero_identificacion: this.identificacion,
          id_documento: 11,
          File: this.pdfaux,
        },
        "multipart/form-data"
      );
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Archivo Subido",
        life: 10000,
      });
    },
    verDetalleDoc(event) {
      this.proveedorDialog = true;
      this.factura = { factura: event.facturas };
    },
    hideDialog() {
      this.proveedorDialog = false;
      this.validarProveedorDialog = false;
      this.NuevaAreaProveedorDialog = false;
    },
  
  },
  computed: {
     sumarValores() {
          let total = 0;
          for(let fac of this.factura.factura) {
              total += fac.valor;
          }

         return total;
    },
  },
};
</script>
