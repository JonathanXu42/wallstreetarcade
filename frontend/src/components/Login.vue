<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="authStore.authError" class="error-message">{{ authStore.authError }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogin = async () => {
      const success = await authStore.login({ email: email.value, password: password.value });
      if (success) {
        router.push('/'); // Redirect to home or dashboard on successful login
      }
    };

    return {
      email,
      password,
      authStore,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
