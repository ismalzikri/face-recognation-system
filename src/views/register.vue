<script setup>
import SavePerson from '../components/SavePerson.vue'
import DefaultLayout from '../layout/defaultLayout.vue'
import { onMounted, onUpdated } from 'vue'
import { mountWebcam } from '../composibles/useWebcam'
import { loadModels } from '../composibles/useFaceapi'
import { ScanFace } from '../composibles/useVideo'
import { globalState } from '../composibles/useState'

onUpdated(() => {
  globalState.registerState.value = 0
})
onMounted(mountWebcam)
onMounted(loadModels)
onMounted(ScanFace)
</script>

<template>
  <DefaultLayout>
    <div v-if="globalState.registerState.value == 0">
      <h4 id="alert" class="shadow-2xl w-auto mx-auto outline"></h4>
      <div class="web-cam">
        <video
          id="video"
          ref="video"
          width="500"
          height="500"
          autoplay
          muted
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
    <SavePerson v-else />
  </DefaultLayout>
</template>

<style scoped>
.web-cam {
  margin-inline: auto;
  width: 450px;
  height: 450px;
}
</style>
