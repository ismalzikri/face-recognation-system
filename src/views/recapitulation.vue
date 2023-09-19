<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '@/composibles/useFetch'
import { formatDateString } from '@/composibles/useFormatDate'

const route = useRoute()
const router = useRouter()

let recap = ref([])
const isLoading = ref(false)
const month = ref('')

const handleFilter = () => {
  const monthly = month.value
  router.replace(`/recapitulation?month=${monthly}`).then(() => {
    getListRecap()
  })
}

const getListRecap = async () => {
  const monthly = route.query.month
    ? route.query.month
    : formatDateString(new Date(), 'month')

  month.value = monthly

  isLoading.value = true
  const { data } = await useFetch(
    `https://face-recognition-attendance-5dkb.onrender.com/api/v1/recapitulation?month=${monthly}`
  )
  recap.value = data.value.data
  isLoading.value = false
}

onMounted(async () => {
  getListRecap()
})
</script>

<template>
  <div class="mt-20">
    <h1 class="text-2xl uppercase mb-12">Rekapitulasi Kehadiran Guru dan Pegawai</h1>
    <div class="container mx-auto px-[unset] lg:px-28 mt-14">
      <form @submit.prevent="handleFilter" class="flex items-end gap-6">
        <label class="flex flex-col gap-2 items-start">
          Filter Menurut Bulan
          <input v-model="month" class="rounded-lg p-2" type="month" />
        </label>
        <div>
          <button
            type="submit"
            class="bg-[#004B9C] py-2 px-5 text-white rounded-md"
          >
            Filter
          </button>
        </div>
      </form>
      <br>
      <div
        class="container mx-auto px-[unset] lg:px-50"
      >
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                N I P
              </th>
              <th
                class="py-3 pl-5 whitespace-nowrap border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
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
              Total Terlambat / Bulan
            </th>
            <th
              class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Total Hadir / Hari Kerja
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in recap" :key="index">
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
                  <img class="w-full h-full rounded-full" :src="item.image" />
                </div>
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ item.name }}
                </p>
              </div>
            </td>
            
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
            >
              <p class="text-gray-900">{{ item.late }}</p>
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
            >
              <p class="text-gray-900 font-semibold">{{ item.total }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="isLoading && recap.length == 0"
        class="bg-white p-3 font-medium"
      >
        Loading ...
      </div>
      <div
        v-if="!isLoading && recap.length < 1"
        class="bg-white p-3 font-medium"
      >
        Belum ada data absen hari ini
      </div>
    </div>
  </div>
</div>
</template>