import { getCookie, setCookie } from 'cookies-next'

// export default async function handler(req, res) {
//   await fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => response.json())
//     .then((data) => res.status(200).json(data))
// }
// export default async function handler(req, res) {
//   await fetch(
//     'https://connect-dev.amalitech-dev.net/api/v1/freelancer-all-jobs'
//   )
//     .then((response) => response.json())
//     .then((data) => res.status(200).json(data))
// }
export default async function handler(req, res) {
  // let accessToken = req.cookies.get('authToken')

  // console.log(getCookie('authToken'))
  // console.log(req)
  await fetch(
    'https://connect-dev.amalitech-dev.net/api/v1/freelancer-all-jobs'
  )
    .then((response) => console.log(response))
    .then((data) => res.status(200).json(data))
  res.send('Cookie')
}
