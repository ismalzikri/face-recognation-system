import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAlert } from './useNotification'
import { savedUsers } from './useState'
import { formatDateString } from './useFormatDate'
const Webcam = require('../helper/webcam')
const faceapi = require('../helper/faceApi.min.js')

let snappedFace = ref().value
const newSavedUsers = savedUsers.value

const urlTakeAbsent =
  'https://face-recognition-attendance-5dkb.onrender.com/api/v1/take/'

function loadLabeledImages() {
  if (newSavedUsers.length == 0) {
    useAlert().openAlert('Wajah anda tidak terdaftar!')
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  } else {
    return Promise.all(
      newSavedUsers.map(async (label) => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const queryImage = new Image()
          queryImage.src = label.image
          const detections = await faceapi
            .detectSingleFace(queryImage)
            .withFaceLandmarks()
            .withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(label.name, descriptions)
      })
    )
  }
}

const scanImg = async (router) => {
  const image = new Image()
  image.src = snappedFace

  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages(router)

  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4)

  const canvas = await faceapi.createCanvasFromMedia(image)
  document.body.append(canvas)
  const displaySize = { width: 350, height: 265 }

  faceapi.matchDimensions(canvas, displaySize)
  const detection = await faceapi
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors()
  if (detection.length < 1) {
    location.reload()
  } else {
    const resizedDetections = faceapi.resizeResults(detection, displaySize)
    const results = resizedDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    )
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      })
      drawBox.draw(canvas)

      const sameLabel = newSavedUsers.find(
        (label) => label.name == result._label
      )

      if (sameLabel) {
        const now = new Date()
        const dayOfWeek = now.getDay() // get current day of the week (0-6, 0 is Sunday)

        const hours = now.getHours()
        let closingTime = 15 // default closing time

        if (dayOfWeek === 5) {
          // if it's Friday
          closingTime = 16 // set closing time to 4:00 PM
        }

        if (hours >= 6 && hours < closingTime) {
          axios
            .post(urlTakeAbsent + 'in', {
              user_id: sameLabel._id,
            })
            .then(() => {
              useAlert().openAlert(`User: ${result._label} absen kamu berhasil`)
              Webcam.reset()
              setTimeout(() => {
                window.location.href = '/'
              }, 1500)
            })
            .catch((error) => {
              useAlert().openAlert(
                `${error.response.data.message} silahkan coba lagi!`
              )
              setTimeout(() => {
                window.location.href = '/'
              }, 1200)
            })
        } else {
          axios
            .post(urlTakeAbsent + 'out', {
              user_id: sameLabel._id,
              date: formatDateString(new Date(), 'full-type'),
            })
            .then((resp) => {
              globalState.isLoadingButton.value = false
              useAlert().openAlert(
                `User: ${resp.data.data.name} absen keluar berhasil!`
              )
              Webcam.reset()
              setTimeout(() => {
                window.location.href = '/'
              }, 1200)
            })
            .catch((error) => {
              useAlert().openAlert(
                `${error.response.data.message} silahkan coba lagi!`
              )
              setTimeout(() => {
                window.location.href = '/'
              }, 1200)
            })
        }
      } else {
        useAlert().openAlert('silahkan coba lagi!')
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

        setTimeout(() => {
          window.location.href = '/'
        }, 500)
      }
    })
  }
}

export const SnapFace = () => {
  const router = useRouter()
  const video = document.querySelector('#video')
  let recog
  video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    recog = setInterval(async () => {
      try {
        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

        if (resizedDetections) {
          if (resizedDetections.detection.score.toFixed(2) > 0.7) {
            await clearInterval(recog)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            document.querySelector('#alert').style.color = 'green'
            document.querySelector('#alert').innerHTML = 'Face found'
            Webcam.snap(function (data_uri) {
              snappedFace = data_uri
            })
            await scanImg(router)
          } else {
            document.querySelector('#alert').style.color = 'red'
            document.querySelector('#alert').innerHTML =
              "Can't find a Face, Please Adjust"
          }
        }
      } catch (err) {
        console.log('something went wrong ====', err)
      }
    }, 1000)
  })
}
