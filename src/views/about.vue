<script>
export default {
  name: 'AboutPage',
}
</script>

<template>
  <div class="text-center flex flex-col justify-center items-center p-4">
    <h1
      class="text-4xl sm:text-center font-extrabold sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl outline tracking-wide"
    >
      Tentang Aplikasi FAS <br>(Face Attendance System)
    </h1>
    <div
      class="border w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl sm:rounded-2xl flex flex-col justify-center items-center mt-5"
    >
      <p style="text-align: justify;"> Face Attendance System (FAS) atau Sistem Absensi dengan Wajah adalah pengenalan wajah anda ke penyimpanan dalam mode register 
      kemudian membandingkannya dengan wajah kehadiran lainnya dalam mode absensi. Setiap sesi mode absensi yang berhasil menambahkan 
      entri ke tabel absensi.</p>
      <br>
      <p style="text-align: justify;"> Sistem ini digunakan untuk melakukan absensi kehadiran yang di 
        peruntukan kepada seluruh pegawai SDN 060852 Medan .</p>
  

    <div
    class="border w-full p-5 max-w-[40rem] h-auto overflow-hidden md:text-lg rounded-md shadow-xl sm:rounded-2xl flex flex-col justify-left items-left mt-5"
    >
    <p style="font-style: 'Times New Roman', Times, serif;">
      <p class="text-left">Cara Mendaftarkan Wajah :</p>
      <p class="text-left">1. Masuk ke menu Registrasi</p>
      <p class="text-left">2. Posiskan wajah anda pada kamera, (Kamera akan mengidentifikasi wajah anda sebanyak 3 kali)</p>
      <p class="text-left">3. Ketika wajah sudah teridentifikasi, isi data diri anda seperti Nama, Nomor Identitas Pegawai, Jabatan, dan Golongan</p>
      <p class="text-left">4. Jika data yang anda masukkan sudah benar, tekan tombol Registrasi untuk menyimpan data anda</p>
      <p class="text-left">5. Jika sudah berhasil, Anda akan kembali ke menu home website dan muncul notifikasi "Registrasi Berhasil"</p>
    </p>
      <br>
      <p class="text-left">Cara Melakukan Absensi :</p>
      <p class="text-left">1. Pilih menu Absensi</p>
      <p class="text-left">2. Posiskan wajah anda pada kamera, (Kamera akan mengidentifikasi wajah anda)</p>
      <p class="text-left">3. Jika sudah berhasil, Anda akan kembali ke menu home website dan muncul notifikasi "Absensi Berhasil"</p>
      
      <br>
      <p class="text-left">NB :</p>
      <p class="text-left">1. Menu Login hanya di gunakan oleh admin yang memiliki akun headmaster</p>
      <p class="text-left">2. Jika ada kendala pada sistem silahkan laporkan pada admin</p>

      <i class="mt-4">Selamat Mencoba !!!</i>
    
      </div>
    </div>
  </div>
</template>
