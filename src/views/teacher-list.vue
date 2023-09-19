<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useFetch } from '@/composibles/useFetch'
import { savedUsers } from '@/composibles/useState'

const isLoading = ref(false)
const isSeeAction = ref(null)
const start_date = ref('')
const end_date = ref('')

const URL = 'https://face-recognition-attendance-5dkb.onrender.com/api/v1/teacher/delete/'

const getListTeacher = async () => {
  isLoading.value = true
  const { data } = await useFetch(
    'https://face-recognition-attendance-5dkb.onrender.com/api/v1/teacher/list'
  )

  savedUsers.value = data.value.data
  isLoading.value = false
}

const handleDelete = (id) => {
  axios
    .delete(URL + id)
    .then((resp) => {
      getListTeacher()
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  getListTeacher()
})
</script>

<template>
  <DefaultLayout>
    <div class="p-4 mt-12">
      <h1 class="text-2xl uppercase mb-12">Daftar Nama Guru dan Pegawai</h1>
      <div class="container mx-auto px-[unset] lg:px-28">
        <div
          class="flex flex-col lg:items-center lg:flex-row gap-5 text-left rounded-lg"
        >
          <div>
            <router-link
              to="/attendanceSheet"
              class="bg-[#004B9C] py-2.5 px-5 text-white rounded-md"
            >
              Lihat absensi
            </router-link>
          </div>
          <div>
            <router-link
              to="/recapitulation"
              class="w-[70%] lg:w-full flex gap-2 items-center bg-[#004B9C] py-2.5 pr-8 pl-5 rounded-md"
            >
              <span class="whitespace-nowrap text-white"
                >Rekapitulasi Absensi</span
              >
              
            </router-link>
          </div>
        </div>
        <div class="py-8">
          <div>
            <div
            class="container mx-auto px-[unset] lg:px-50"
            >
              <table v-if="!isLoading" class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      class="py-3 whitespace-nowrap border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      N I P
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Jabatan
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Golongan
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in savedUsers" :key="index">
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
                    >
                      {{ item.no_induk }}
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
                    >
                      {{ item.kodemapel }}
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
                    >
                      {{ item.mapel }}
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
                    >
                      <div class="flex justify-center items-center gap-3">
                        <div class="flex-shrink-0 w-10 h-10">
                          <img
                            class="w-full h-full rounded-full"
                            :src="item.image"
                          />
                        </div>
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{ item.name }}
                        </p>
                      </div>
                    </td>
                   
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right relative"
                    >
                      <button
                        type="button"
                        class="inline-block text-gray-500 hover:text-gray-700"
                        @click="isSeeAction === item._id ? (isSeeAction = null) : (isSeeAction = item._id)"
                      >
                        <svg
                          class="inline-block h-6 w-6 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                          />
                        </svg>
                        <div
                          v-if="isSeeAction === item._id"
                          class="absolute bottom-0 left-2 py-2 px-3 shadow-lg font-medium text-red-500 bg-white rounded-md"
                          @click="handleDelete(item._id)"
                        >
                          Delete
                        </div>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="isLoading" class="bg-white p-3 font-medium">
                Loading ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
select {
  appearance: none;
  print-color-adjust: exact;
  background-image: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9J25vbmUnIHZpZXdCb3g9JzAgMCAyMCAyMCc+PHBhdGggc3Ryb2tlPScjNmI3MjgwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMS41JyBkPSdtNiA4IDQgNCA0LTQnLz48L3N2Zz4=);
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
}
</style>
