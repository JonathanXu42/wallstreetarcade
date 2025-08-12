<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" v-model="firstname" required />
      </div>
      <div>
        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" v-model="lastname" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
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
    const firstname = ref('');
    const lastname = ref('');
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const handleRegister = async () => {
      const success = await authStore.register({ 
        firstname: firstname.value, 
        lastname: lastname.value, 
        email: email.value, 
        password: password.value 
      });
      if (success) {
        router.push('/'); // Redirect to home or dashboard on successful registration
      }
    };

    return {
      firstname,
      lastname,
      email,
      password,
      authStore,
      handleRegister,
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
