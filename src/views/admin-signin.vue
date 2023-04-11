<script setup lang="ts">
import { ref } from 'vue'
import { authAccount, role } from '../composibles/useState'
import { useAlert } from '../composibles/useNotification'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const isLoading = ref<Boolean>(false)

const handleLogin = () => {
  isLoading.value = true
  if (
    email.value === authAccount.email.value &&
    password.value === authAccount.password.value
  ) {
    role.value = 'headmaster'
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } else {
    alert('email atau password anda salah!')
  }
}
</script>

<template>
  <section class="bg-gray-50 min-h-screen flex items-center justify-center">
    <div
      class="bg-[antiquewhite] flex rounded-2xl shadow-lg max-w-[22rem] lg:max-w-3xl p-5 items-center"
    >
      <div class="md:w-1/2 px-8 md:px-16">
        <h2 class="font-bold text-2xl text-[#002D74]">Login</h2>
        <p class="text-sm mt-4 text-[#002D74]">
          Masuk dengan akun headmaster atau administrator anda.
        </p>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <input
            v-model="email"
            class="p-3 mt-8 rounded-xl border"
            type="email"
            name="email"
            placeholder="Email"
          />
          <div class="relative">
            <input
              v-model="password"
              class="p-3 rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
          >
            {{ isLoading ? 'Loading...' : 'Login' }}
          </button>
        </form>

        <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
          <hr class="border-gray-400" />
          <p class="text-center text-sm">OR</p>
          <hr class="border-gray-400" />
        </div>
        <div class="mt-10">
          Lupa password ?
          <a
            href="tel:083819482443"
            class="text-xs text-[#002D74] underline cursor-pointer"
            >call developer</a
          >
        </div>
      </div>

      <!-- image -->
      <div
        style="background: rgb(37, 150, 190)"
        class="md:block hidden w-1/2 rounded-xl py-12"
      >
        <figure>
          <img
            class="w-full h-full"
            src="https://i.ibb.co/jZLyQ2L/logo-tut-wuri.png"
            alt=""
          />
        </figure>
        <div class="mt-10">
          <span class="text-2xl text-white font-medium">SDN 060852</span>
          <p class="text-lg text-white leading-6 px-4 mt-5">
            Portal absensi guru menggunakan face recognation
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
