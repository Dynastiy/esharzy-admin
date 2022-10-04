<template>
  <div>
    <div class="login--page-wrapper" v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%">
        <div class="login--page_content">
          <div class="login-page-header mb-3 text-center">
            <img src="@/assets/img/icon.svg" width="10%" alt="" />
            <div class="my-2 ">
              <h4 class="font-weight-bold">Admin Login</h4>
              <p class="small text-secondary">
                Enter login details to have access
              </p>
            </div>
          </div>

          <div>
            <form action="" @submit.prevent="login()">
              <div class="mb-3">
                <label for="" class="d-block small"
                  >Email<sup class="text-danger">*</sup>
                </label>
                <input
                  type="email"
                  v-model="credentials.email"
                  class="input--text"
                />
                <small class="text-danger" v-show="errMessages.email" v-for="err in errMessages.email" :key="err"> *{{ err }} </small>
              </div>
              <div class="mb-3">
                <label class="d-block small" for=""
                  >Password<sup class="text-danger">*</sup>
                </label>
                <div class="input--field d-flex align-items-center">
                  <input :type="type" class="input-area" v-model="credentials.password" />
                  <div @click="showPassword" role="button">
                   <span class="text-danger" style="font-size:10px; margin-right: 5px;"> {{ actions }} </span>
                  </div>
                </div>
                <span class="text-secondary small">Min. 8 Characters</span>
                <small class="text-danger" v-show="errMessages.password" v-for="err in errMessages.password" :key="err"> *{{ err }} </small>
              </div>
              <!-- <div
                class="mb-1 d-flex justify-content-between align-items-center"
              >
                
                <div class="">
                  <span
                    class="small d-block text-right font-weight-bold"
                    role="button"
                    style="color: var(--primary-color)"
                    >Forgot Password?</span
                  >
                </div>
              </div> -->
              <div class="mt-3">
                <button>Sign In</button>
              </div>
            </form>
          </div>

        </div>
    </div>

    

    <AppLoader  />
  </div>
</template>

<script>
import AppLoader from "@/components/static/appLoader.vue";
export default {
  data() {
    return {
      type: "password",
      icon: "bi:eye-slash",
      actions: "show",
      credentials: {
        email: "",
        password: "",
      },
      errMessages: {}
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.icon = "clarity:eye-line";
        this.actions = "hide"
      } else {
        this.type = "password";
        this.icon = "bi:eye-slash";
        this.actions = "show"
      }
    },
    async login() {
        this.$store.dispatch('auth/userLogin', this.credentials)
    },
    goToLogin() {
      this.$router.push("/sign-up");
    },
  },
  components: { AppLoader },
  computed:{
    loading(){
      return this.$store.getters['auth/isLoading']
    }
  }
};
</script>

<style>
.animated-content {
  --animate-duration: 4s;
}
</style>
