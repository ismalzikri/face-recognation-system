import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { useAlert } from './useNotification'
const Webcam = require('../helper/webcam')
import axios from 'axios'

export const globalState = {
  isLoadingButton: ref(false),
  registerState: ref(0),
  capturedFaces: ref([]),
  capturedNip: ref(''),
  capturedUserName: ref(''),
  capturedCodeSource: ref(''),
  capturedSource: ref(''),
}

export const authAccount = {
  email: ref<string>('admin@controlling.com'),
  password: ref<string>('@dministrator'),
}

export const savedUsers = useStorage('savedUsers', [])

export const role = useStorage<string>('role', '')

export const highestDetection = () => {
  let highestDetection = 0,
    pos = 0
  globalState.capturedFaces.value.map((face: any, index) => {
    if (face.detection > highestDetection) {
      highestDetection = face.detection
      pos = index
    }
  })

  return globalState.capturedFaces.value[pos]
}

export const saveCapturedUser = async () => {
  const choosen = highestDetection() as any
  
  globalState.isLoadingButton.value = true
  axios
    .post(
      'https://face-recognition-attendance-5dkb.onrender.com/api/v1/teacher/add',
      {
        kodemapel: globalState.capturedCodeSource.value,
        mapel: globalState.capturedSource.value,
        no_induk: globalState.capturedNip.value,
        name: globalState.capturedUserName.value,
        image: choosen.image,
        mood: choosen.mood,
      }
    )
    .then((resp) => {
      globalState.isLoadingButton.value = false
      useAlert().openAlert(`User: ${resp.data.data.name} berhasil di daftarkan`)
      Webcam.reset()
      setTimeout(() => {
        window.location.href = '/'
      }, 1200)
    })
    .catch((error) => {
      console.log(error)
    })
}