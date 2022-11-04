//import { NextResponse, NextRequest } from 'next/server'

const middleware = (handler) => {
  return async (req, res) => {
    try {
      // let token = req.cookies.authToken;

      // // console.log('Token', accessToken.value);

      // const requestHeaders = new Headers(req.headers)

      // requestHeaders.set('Accept', 'application/json')
      // requestHeaders.set('Content-Type', 'application/json')
      // requestHeaders.set('authorization', `Bearer ${token}`)
      // requestHeaders.set(
      //   'Strict-Transport-Security',
      //   'max-age=63072000; includeSubDomains; preload'
      // )
      // requestHeaders.set('Content-Security-Policy', "default-src 'self'")
      // requestHeaders.set('X-Content-Type-Options', 'nosniff')
      // requestHeaders.set('X-Frame-Options', 'SAMEORIGIN')
      // requestHeaders.set('Referrer-Policy', 'no-referrer')
      console.log("Invoke", req.headers)
      return handler(req, res);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}

export default middleware;
// export function middleware(req) {


  // const response = NextResponse.next({
  //   req: {
  //     // New request headers
  //     headers: requestHeaders,
  //   },
  // })

  // // Set a new response header `x-hello-from-middleware2`
  // // response.headers.set('x-hello-from-middleware2', 'hello')
  // console.log(response.headers)
  // return NextResponse.redirect(new URL('/freelancer-all-jobs', req.url))
  //return response
//}

// export const config = {
//   matcher: ["/about/:path*", "/:path*/freelancer-all-jobs/:path*"],
// }
