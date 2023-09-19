<script setup>
import { onMounted } from 'vue'
import { role} from '../composibles/useState'
import Face from '../components/Face.vue'
import DefaultLayout from '../layout/defaultLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Fungsi untuk log out
const logout = () => {
  
  // Tambahkan logika untuk melakukan log out di sini
  // Contoh: Menghapus informasi login atau token yang telah digunakan untuk autentikasi
  // Disini, kita akan mengatur role menjadi null untuk menunjukkan bahwa pengguna tidak lagi masuk (logged out)
  role.value = null

  // Redirect pengguna ke halaman sebelumnya setelah log out
  const router = useRouter()
  router.push('../admin-signin')
  
}

</script>

<template>

 
  <DefaultLayout>
    <br>
    <button
    v-if="role === 'headmaster'"
    class="fixed top-5 right-5 lg:right-20 text-xs lg:text-sm text-white bg-indigo-600 p-2.5 rounded-md"
    @click="logout"
  >
    Logout
  </button>

  <router-link
  to="/admin-signin"
  class="fixed top-5 right-4 lg:right-30 text-xs lg:text-sm text-white bg-indigo-600 p-2.5 rounded-md"
  @click="login"
>
  Login
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-0 h-0 ml-0"
  >
  </svg>
</router-link>


    <section class="w-full px-4 antialiased items-center min-h-screen flex bg">
      
      <div class="mx-auto container mt-12 md:mt-0">
        
        <section class="px-2 py-4 md:px-0">
          
          <div class="container items-center px-8 mx-auto xl:px-5">

            
            <div
              class="flex items-center justify-between sm:-mx-3 flex-col-reverse md:flex-row gap-12"
            >
              <div class="w-full md:w-1/2 md:px-3">
                <div
                  class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
                >
                
                  <h1
                    class="text-4xl text-center sm:text-left font-extrabold sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl outline tracking-wide"
                  >
                    <span class="block xl:inline">
                      <b class="font-bold text-slate-400">F</b>ace <br />
                      <b class="font-bold text-slate-400">A</b>ttendance <br />
                      <b class="font-bold text-slate-400">S</b>ystem</span
                    >
                  </h1>
                  <p
                    class="mx-auto text-base text-left text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl font-bold"
                    style="font-family: 'Times New Roman', Times, serif;">
                  Sistem absensi yang bekerja dengan menggunakan pengenalan wajah ( AI )
                  </p>
                  <div
                    class="relative flex flex-col sm:flex-row gap-4 flex-wrap font-extralight"
                  >
                    <router-link
                      to="/About"
                      class="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                    >
                      Tentang Aplikasi
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </router-link>
                    <router-link
                      v-if="role === 'headmaster'"
                      to="/register"
                      class="flex items-center w-full px-6 py-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                    >
                      Register
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </router-link>
                    <router-link
                      to="/takeAttendance"
                      class="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                    >
                      Absensi
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </router-link>
                    <router-link
                      v-if="role === 'headmaster'"
                      to="/attendanceSheet"
                      class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                    >
                      Data Absensi
                      
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </router-link>
                  </div>
                </div>
              </div>
             
              <div class="w-full md:w-1/2">

                
                <div
                  class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl flex flex-col justify-center items-center"
                >
                  <face class="mx-auto" />
                </div>
                <div
                  class="w-full h-auto overflow-hidden py-2 rounded-md shadow-xl sm:rounded-2xl flex flex-col justify-center items-center mt-5"
                >
                  <span class="font-bold text-2xl">SDN 060852</span>
                  <!-- <div class="flex gap-4 text-3xl mt-5">
                    <a
                      href="https://github.com/Laravel007"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="lab la-github"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/ismalzikri/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="lab la-instagram"></i>
                    </a>
                  </div> -->
                  <div>
                  </div>
                  <!--Berhasil logout-->
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </section>
  </DefaultLayout>
</template>

<style>
.outline {
  line-height: 1.2;
  text-decoration: none;
  color: transparent;
  -webkit-text-stroke: 1.5px #301ea5;
}

</style>
