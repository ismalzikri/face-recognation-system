<template>
  <form
    class="grid place-items-center place-content-center mt-24 w-full"
    @submit.prevent="save"
  >
    <img
      :src="face.image"
      alt="userFace"
      class="rounded-full w-72 h-72 border border-indigo-600 object-cover"
    />
    <div
      class="border border-indigo-600 w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl flex flex-col justify-center items-center mt-5"
    >
      Nim:
      <input
        type="text"
        v-model="globalState.capturedNip.value"
        placeholder="No induk"
        class="p-2 py-1 border-2 border-indigo-600 rounded bg-transparent z-50"
        required
      />
    </div>
    <div
      class="border border-indigo-600 w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl flex flex-col justify-center items-center mt-5"
    >
      Name:
      <input
        type="text"
        v-model="globalState.capturedUserName.value"
        placeholder="Nama"
        class="p-2 py-1 border-2 border-indigo-600 rounded bg-transparent z-50"
        required
      />
    </div>
    <div
      class="border border-indigo-600 w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl flex flex-col justify-center items-center mt-5"
    >
      Kode Mapel:
      <input
        type="text"
        v-model="globalState.capturedCodeSource.value"
        placeholder="Kode mapel"
        class="p-2 py-1 border-2 border-indigo-600 rounded bg-transparent z-50"
        required
      />
    </div>
    <div
      class="border border-indigo-600 w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl flex flex-col justify-center items-center mt-5"
    >
      Mapel:
      <input
        type="text"
        v-model="globalState.capturedSource.value"
        placeholder="Mapel"
        class="p-2 py-1 border-2 border-indigo-600 rounded bg-transparent z-50"
        required
      />
    </div>
    <div
      class="border border-indigo-600 w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl flex flex-col justify-center items-center mt-5"
    >
      Face Certainty : {{ face.detection }}
    </div>
    <div
      class="border border-indigo-600 w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl flex flex-col justify-center items-center mt-5"
    >
      User's Mood : {{ face.mood }}
    </div>
    <button
      type="submit"
      class="text-center w-full px-6 py-3 mt-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700"
    >
      {{ globalState.isLoadingButton.value ? 'Loading...' : 'Register' }}
    </button>
  </form>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  highestDetection,
  globalState,
  saveCapturedUser,
} from '../composibles/useState'

const face = highestDetection()
const save = async () => {
  globalState.isLoadingButton.value = true
  await saveCapturedUser()
  globalState.isLoadingButton.value = false
}
</script>
