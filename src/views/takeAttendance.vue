<script setup>
import DefaultLayout from '../layout/defaultLayout.vue'
import { onMounted, onUpdated } from 'vue'
import { mountWebcam } from '../composibles/useWebcam'
import { loadModels } from '../composibles/useFaceapi'
import { SnapFace} from '../composibles/useAttendance'
import { globalState, savedUsers } from '../composibles/useState'
import { useFetch } from '../composibles/useFetch'

const urlUserList = 'https://face-recognition-attendance-5dkb.onrender.com/api/v1/teacher/list'

const geUserList = async () => {
  const { data } = await useFetch(urlUserList)
  savedUsers.value = data.value.data
  SnapFace()
}

onMounted(() => {
  globalState.registerState.value = 0
  mountWebcam()
  geUserList()
  loadModels()
})
</script>

<template>
  <DefaultLayout>
    <div>
      <h4 id="alert" class="shadow-2xl w-auto mx-auto outline"></h4>
      <div class="web-cam flex justify-center items-center">
        <h2 class="mt-20 text-3xl absolute mx-auto">Loading...</h2>
        <video
          id="video"
          ref="video"
          width="600"
          height="600"
          autoplay
          muted
          class="z-50"
        ></video>
      </div>
      <div
        id="camera"
        ref="camera"
        class="h-auto w-auto text-center hidden"
      ></div>
      <br />
      <p id="snapShot"></p>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.web-cam {
  margin-inline: auto;
  width: 450px;
  height: 450px;
}
</style>