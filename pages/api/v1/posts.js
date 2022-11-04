import { getCookie, setCookie } from 'cookies-next'
import middleware from '../../../src/middleware'
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
async function handler(req, res) {
  // let accessToken = req.cookies.get('authToken')

  // console.log(getCookie('authToken'))
  // console.log(req)
  await fetch('https://connect-api.amalitech-dev.net/api/v1/users/my-profile', {
    method: "GET",
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `Bearer ${req.cookies.authToken}`
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      res.status(200).json(data)})
    .catch((err) => console.error("Error: " + err.message))

}
export default handler