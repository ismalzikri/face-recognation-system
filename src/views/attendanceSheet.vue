<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '@/composibles/useFetch'
import { formattedTime, formatDateString } from '@/composibles/useFormatDate'

const route = useRoute()
const router = useRouter()

let attendance = ref([])
const isLoading = ref(false)
const start_date = ref('')
const end_date = ref('')

const handleFilter = () => {
  const from = start_date.value
  const to = end_date.value
  router
    .replace(`/attendanceSheet?start_date=${from}&end_date=${to}`)
    .then(() => {
      getListAttendance()
    })
}

const getListAttendance = async () => {
  const from = route.query.start_date
    ? route.query.start_date
    : formatDateString(new Date(), 'full-type')
  const to = route.query.end_date
    ? route.query.end_date
    : formatDateString(new Date(), 'full-type')

  start_date.value = from
  end_date.value = to

  isLoading.value = true
  const { data } = await useFetch(
    `https://face-recognition-attendance-5dkb.onrender.com/api/v1/attendance/list?start_date=${from}&end_date=${to}`
  )
  attendance.value = data.value.data
  isLoading.value = false
}

onMounted(async () => {
  getListAttendance()
})
</script>

<template>
  <DefaultLayout>
    <div class="p-4 mt-12">
      <h1 class="text-2xl uppercase mb-12">Daftar Kehadiran Guru dan Pegawai</h1>
      <div class="container mx-auto px-[unset] lg:px-50">
        <form
          class="flex flex-col lg:items-end lg:flex-row gap-5 bg-white text-left rounded-lg p-4"
          @submit.prevent="handleFilter"
        >
          <label class="flex flex-col font-medium">
            Filter Menurut Tanggal
            <div class="mt-3 flex gap-2 items-center">
              <input
                v-model="start_date"
                type="date"
                class="p-3 rounded-md text-xs sm:text-sm border"
                required
              />
              <span>-</span>
              <input
                v-model="end_date"
                type="date"
                class="p-3 rounded-md text-xs sm:text-sm border"
                required
              />
            </div>
          </label>
          <label class="w-full flex flex-col font-medium">
            Filter Menurut Status
            <select
              class="mt-3 sm:text-sm border rounded-md w-[300px] h-full px-3 py-3"
            >
              <option value="" disabled selected>Select Status</option>
              <option value="0">Hadir</option>
              <option value="1">Absen</option>
            </select>
          </label>
          <div>
            <button
              type="submit"
              class="bg-[#004B9C] py-2.5 px-5 text-white rounded-md"
            >
              Filter
            </button>
          </div>
          <div style="padding-left: 2%;">
            <router-link
              to="/teacher-list"
              class="w-[70%] lg:w-full flex gap-2 items-center bg-[#004B9C] py-2.5 pr-6 pl-5 rounded-md"
            >
              <span class="whitespace-nowrap text-white">Daftar Nama guru</span>
              
            </router-link>
          </div>
        </form>
        <div class="py-8">
          <div>
            <div
              class="container mx-auto px-[unset] lg:px-50"
            >
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      class="py-3 pl-5 whitespace-nowrap border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
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
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Jam Masuk
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Jam Keluar
                    </th>
                    
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in attendance" :key="index">
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
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ formattedTime(item.entryTime) }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
                    >
                      <p class="text-gray-900">
                        {{ item.exitTime ? formattedTime(item.exitTime) : '-' }}
                      </p>
                    </td>
                   
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <span
                        class="relative inline-block px-3 py-1 font-semibold leading-tight"
                      >
                        <span
                          aria-hidden
                          :class="
                            formattedTime(item.entryTime) > 8
                              ? 'bg-gray-300'
                              : 'bg-green-200'
                          "
                          class="absolute inset-0 opacity-50 rounded-full"
                        ></span>
                        <span class="relative capitalize">{{
                          formattedTime(item.entryTime) > 8 ? 'Terlambat' : 'Hadir'
                        }}</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-if="isLoading && attendance.length == 0"
                class="bg-white p-3 font-medium"
              >
                Loading ...
              </div>
              <div
                v-if="!isLoading && attendance.length < 1"
                class="bg-white p-3 font-medium"
              >
                Belum ada data absen hari ini
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
