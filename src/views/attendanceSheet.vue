<template>
  <DefaultLayout>
    <div class="p-4 mt-12">
      <h1 class="text-2xl uppercase mb-12">Daftar Kehadiran Guru</h1>
      <div class="container mx-auto px-[unset] lg:px-28">
        <div
          class="flex flex-col lg:items-end lg:flex-row gap-5 bg-white text-left rounded-lg p-4"
        >
          <label class="flex flex-col font-medium">
            Filter By Date
            <div class="mt-3 flex gap-2 items-center">
              <input
                type="date"
                class="p-3 rounded-md text-xs sm:text-sm border"
              />
              <span>-</span>
              <input
                type="date"
                class="p-3 rounded-md text-xs sm:text-sm border"
              />
            </div>
          </label>
          <label class="w-full flex flex-col font-medium">
            Filter By Status
            <select
              class="mt-3 sm:text-sm border rounded-md w-[300px] h-full px-3 py-3"
            >
              <option value="" disabled selected>Select Status</option>
              <option value="0">Present</option>
              <option value="1">Not Present</option>
            </select>
          </label>
          <div>
            <button class="bg-[#004B9C] py-2.5 px-5 text-white rounded-md">
              Filter
            </button>
          </div>
          <div>
            <router-link
              to="/recapitulation"
              class="w-[70%] lg:w-full flex gap-2 items-center bg-[#004B9C] py-2.5 pr-8 pl-5 rounded-md"
            >
              <span class="whitespace-nowrap text-white"
                >Rekapitulasi Absensi</span
              >
              <img
                width="18"
                height="18"
                src="https://caribarang.id/icons/systems/arrow_right.png"
                alt=""
              />
            </router-link>
          </div>
        </div>
        <div class="py-8">
          <div>
            <div
              class="inline-block w-full shadow-md rounded-lg overflow-x-scroll"
            >
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      class="py-3 pl-5 whitespace-nowrap border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Nim
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Kode Mapel
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Mapel
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Jam masuk
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Jam keluar
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Mood
                    </th>
                    <th
                      class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Status
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
                      {{item.nim}}
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
                    >
                      {{item.codesource}}
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
                    >
                      {{item.source}}
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
                      <p class="text-gray-900 whitespace-no-wrap">8:30 wib</p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
                    >
                      <p class="text-gray-900">17:00 wib</p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
                    >
                      <p class="text-gray-900">{{item.mood}}</p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <span
                        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative capitalize">present</span>
                      </span>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                      <button
                        type="button"
                        class="inline-block text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          class="inline-block h-6 w-6 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { savedUsers } from '../composibles/useState'
</script>

<style scoped>
@charset "UTF-8";
details {
  user-select: none;
}
details summary svg {
  transform: rotate(90deg);
}

details[open] summary svg {
  transform: rotate(-90deg);
}

details[open] summary ~ * {
  animation: ease-opacity-t-b 0.5s ease;
}

summary {
  cursor: pointer;
}

svg {
  transition: all 0.3s;
}

summary::-webkit-details-marker {
  display: none;
}
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
