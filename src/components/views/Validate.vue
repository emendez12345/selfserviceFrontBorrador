<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="text-center mb-5">
            <Logo />
            <div class="text-900 text-3xl font-medium mb-3">
              Cambiar contraseña
            </div>
          </div>
          <div class="col-12">
            <Message
              v-if="showMessage"
              :sticky="false"
              :severity="messages.severity"
              :icon="messages.icon"
              >{{ messages.content }}</Message
            >
          </div>

          <div
            v-if="visibleSpinner"
            class="w-full md:w-10 flex justify-content-center mx-auto"
          >
            <ProgressSpinner
              style="width: 50px; height: 50px"
              strokeWidth="5"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
          <div class="w-full md:w-10 mx-auto">
            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Contraseña</label
            >
            <Password
              :class="{
                'p-invalid': v$.dataUser.password.$invalid && submitted,
              }"
              placeholder="Contraseña"
              v-model="dataUser.password"
              toggleMask
              name="password"
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

            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Confirmar contraseña</label
            >
            <Password
              :class="{
                'p-invalid':
                  v$.dataUser.password_confirmation.$invalid && submitted,
              }"
              name="password"
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

            <Button
              @click="change(!v$.$invalid)"
              label="Cambiar contraseña"
              class="w-full p-3 text-xl"
              :disabled="desabilitado"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, sameAs, minLength, helpers } from "@vuelidate/validators";
//import { changePassServices } from "../api/loginServices";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      desabilitado: false,
      visibleSpinner: false,
      dataUser: {
        email: "",
        password: "",
        password_confirmation: "",
        token: "",
      },
      submitted: false,
      showMessage: false,
      messages: {
        severity: "",
        content: "",
      },
    };
  },
  validations() {
    const strongRegex = helpers.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
    );
    return {
      dataUser: {
        password: { required, minLength: minLength(6), strongRegex },
        password_confirmation: {
          required,
          sameAsPassword: sameAs(this.dataUser.password),
        },
      },
    };
  },
  methods: {
    async change(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        this.messages.severity = "error";
        this.messages.content = "Por favor verifica las contraseñas";
        this.showMessage = !this.showMessage;
        return;
      } else {
        this.visibleSpinner = true;
        this.desabilitado = true;
      //  const resp = await changePassServices(this.dataUser);
      /*  if (resp == "OK") {
          //  this.visibleSpinner=false;
          this.$router.push("/page404");
        } else {
          this.showMessage = !this.showMessage;
          this.visibleSpinner = false;
          this.desabilitado = false;
        }*/
      }
      this.messages.severity = "success";
      this.messages.content = "Contraseña actualizada";
      this.showMessage = !this.showMessage;
    },

    CerrarMensajeError() {
      this.showMessage = false;
    },
  },
  mounted() {
    this.dataUser.email = this.$route.params.email;
    this.dataUser.token = this.$route.params.token;
  },
};
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
