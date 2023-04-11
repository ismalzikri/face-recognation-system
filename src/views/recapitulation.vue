<template>
  <div class="mt-20">
    <h2 class="font-medium capitalize text-2xl">Rekapitulasi kehadiran guru</h2>
    <div class="container mx-auto px-[unset] lg:px-28 mt-14">
      <form class="flex items-end gap-6">
        <label class="flex flex-col gap-2 items-start">
          Filter by Month
          <input class="rounded-lg p-2" type="month" />
        </label>
        <div>
          <button class="bg-[#004B9C] py-2 px-5 text-white rounded-md">
            Filter
          </button>
        </div>
      </form>
      <div
        class="inline-block w-full shadow-md rounded-lg overflow-x-scroll mt-8"
      >
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Nim
              </th>
              <th
                class="py-3 pl-5 whitespace-nowrap border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
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
                Mood
              </th>
              <th
                class="py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Total Hadir
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 5" :key="item">
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
              >
                99821423432
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
              >
                00221
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
              >
                Matematika
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap text-sm"
              >
                <div class="flex justify-center items-center gap-3">
                  <div class="flex-shrink-0 w-10 h-10">
                    <img class="w-full h-full rounded-full" :src="item.img" />
                  </div>
                  <p class="text-gray-900 whitespace-no-wrap">zikri</p>
                </div>
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
              >
                <p class="text-gray-900">Happy</p>
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm whitespace-nowrap"
              >
                <p class="text-gray-900 font-semibold">18/25</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
