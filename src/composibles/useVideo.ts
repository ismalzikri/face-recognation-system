// import { Webcam } from '../helper/webcam'
const Webcam = require('../helper/webcam')
import { globalState } from './useState'
const faceapi = require('../helper/faceApi.min.js')

type FaceData = {
  detection: string;
  image: string;
  mood: string;
};

const getMode = (objMood: Record<string, number>): string => {
  let highestMood = '';
  let highest = 0;
  Object.keys(objMood).map((mood) => {
    if (objMood[mood] > highest) {
      highest = objMood[mood];
      highestMood = mood;
    }
  });

  return highestMood;
};

export const saveFace = (faceData: {
  detection: {
    score: number;
  };
  expressions: any; // Replace 'any' with the actual type of 'expressions' if possible
}) => {
  Webcam.snap(function (data_uri: string) {
    if (parseFloat(faceData.detection.score.toFixed(2)) > 0.7) {
      const newFaceData: FaceData = {
        detection: faceData.detection.score.toFixed(2),
        image: data_uri,
        mood: getMode(faceData.expressions),
      };

      (globalState.capturedFaces.value as FaceData[]).push(newFaceData);
    }
  });

  console.log(globalState.capturedFaces.value);
};


export function startVideo(video: HTMLVideoElement) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.error('getUserMedia is not supported');
  }
}


export const ScanFace = () => {
  const video = document.querySelector<HTMLVideoElement>('#video')
  let recog: NodeJS.Timeout | undefined

  if (!video) {
    // Handle case when video element is not found
    console.error('Video element not found')
    return
  }

  video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)

    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }

    if (typeof video.width === 'number' && typeof video.height === 'number') {
      displaySize.width = video.width
      displaySize.height = video.height
    } else {
      // Handle case when width and height are not available
      console.error('Video width and/or height not available')
      return
    }

    faceapi.matchDimensions(canvas, displaySize)
    recog = setInterval(async () => {
      const count = globalState.capturedFaces.value.length
      try {
        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)

        if (resizedDetections) {
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

          if (count < 3) saveFace(resizedDetections)

          const alertElement = document.querySelector<HTMLElement>('#alert')
          if (alertElement) {
            alertElement.style.color = 'green'
            alertElement.innerHTML = `Face found, Captured ${count} out of 3`
          }

          if (count >= 3) {
            if (recog) clearInterval(recog)
            canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
            globalState.registerState.value++
          }
        }
      } catch {
        if (count < 3) {
          const alertElement = document.querySelector<HTMLElement>('#alert')
          if (alertElement) {
            alertElement.style.color = 'red'
            alertElement.innerHTML = `Can't find a Face, Please Adjust <br>  Captured ${count} out of 3`
          }
        }
      }
    }, 1000)
  })
}