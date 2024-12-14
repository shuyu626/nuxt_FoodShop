<template>
    <v-dialog
    max-width="450"
    scroll-strategy="none"
    >
        <v-card>
            <v-container class="py-5 px-8">
            <div class="mt-2 mb-5 text-center">
                <h3>Welcome To Ecommerce</h3>
                <h5>Log in with email & password</h5>
            </div>
            <p class="text-body-2">
                Email or Phone Number
            </p>
            <v-text-field
                placeholder="example@mail"
                variant="outlined"
                density="compact"
                :rules="[value => !!value || 'Email is required']"
            />
            <p class="text-body-2">
                Password
            </p>
            <v-text-field
                v-model="password"
                placeholder="******"
                variant="outlined"
                density="compact"
                :type="showPassword ? 'text' : 'password'"
                :rules="[value => !!value && value.length > 6 || 'Password must be longer than 6 characters']"

            >
                <template #append-inner>
                    <v-btn
                    variant="text"
                    @click="togglePasswordVisibility"
                    :ripple="false"
                    >
                        <v-icon>{{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    </v-btn>
                </template>
            </v-text-field>
            <LongButton />
            <div class="d-flex align-center px-15">
                <v-divider />
                <span class="mx-4">on</span>
                <v-divider />
            </div>
            <LongButton
                color="indigo-darken-1"
                prepend-icon="mdi-facebook"
                text="Continue With Facebook"
            />
            <LongButton
                color="blue-darken-1"
                prepend-icon="mdi-google"
                text="Continue With Google"
            />
            <div class="text-center text-body-2 mt-2 mb-7">
                Don't have account? 
                <span class="text-decoration-underline">Sign Up</span>
            </div>
            </v-container>
            <div class="w-100 bg-secondary text-center pa-5">
            <span class="text-third">Forgot Your Password</span>
            <span class="mx-2 text-decoration-underline">Reset It</span>
            </div>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
const email = ref<string>('');  // 綁定 email
const password = ref<string>('');  // 綁定 password
const showPassword = ref<boolean>(false);  // 控制密碼顯示
const emailErrors = ref<string[]>([]);  // 儲存電子郵件錯誤訊息
const passwordErrors = ref<string[]>([]);  // 儲存密碼錯誤訊息
// 驗證函數
const validateForm = () => {
  emailErrors.value = [];
  passwordErrors.value = [];
  
  // 驗證 email
  if (!email.value) {
    emailErrors.value.push('請輸入電子郵件');
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailErrors.value.push('請輸入有效的電子郵件地址');
  }

  // 驗證密碼
  if (!password.value) {
    passwordErrors.value.push('請輸入密碼');
  } else if (password.value.length < 6) {
    passwordErrors.value.push('密碼至少包含 6 個字符');
  }
};

// 提交處理函數
const handleLogin = () => {
  validateForm();
  if (emailErrors.value.length === 0 && passwordErrors.value.length === 0) {
    console.log('Email:', email.value);
    console.log('Password:', password.value);
    // 在此處理登入邏輯
  }
};

// 切換密碼顯示
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
<style scoped>
</style>