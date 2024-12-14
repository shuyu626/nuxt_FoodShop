import VuetifyUseDialog from 'vuetify-use-dialog';
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VuetifyUseDialog, {
        snackbar: {
          showCloseButton: false,
          snackbarProps: {
            timeout: 2000,
          },
        },
      });
})
