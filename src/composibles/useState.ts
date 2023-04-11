import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useAlert } from './useNotification'
const Webcam = require('../helper/webcam')
import axios from 'axios'

export const globalState = {
  registerState: ref(0),
  capturedFaces: ref([]),
  capturedNim: ref(''),
  capturedUserName: ref(''),
  capturedCodeSource: ref(''),
  capturedSource: ref(''),
}

export const authAccount = {
  email: ref<string>('admin@controlling.com'),
  password: ref<string>('@dministrator'),
}

export const savedUsers = useStorage('savedUsers', []).value as any

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

  // savedUsers.push({
  //   kodemapel: globalState.capturedCodeSource,
  //   mapel: globalState.capturedSource,
  //   nim: globalState.capturedNim,
  //   name: globalState.capturedUserName.value,
  //   img: choosen.img,
  //   mood: choosen.mood,
  //   date:[]
  // })

  // useAlert().openAlert(`User: ${globalState.capturedUserName.value} berhasil di daftarkan`)
  // Webcam.reset()
  // setTimeout(() => {
  //   window.location.href = '/'
  // }, 1200)

  axios
    .post(
      'https://face-recognition-attendance-5dkb.onrender.com/api/v1/teacher/add',
      {
        kodemapel: globalState.capturedCodeSource.value,
        mapel: globalState.capturedSource.value,
        nim: globalState.capturedNim.value,
        name: globalState.capturedUserName.value,
        image: choosen.img,
        mood: choosen.mood,
      }
    )
    .then((resp) => {
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
