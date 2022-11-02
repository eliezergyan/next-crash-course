import NextAuth from 'next-auth'
import token from '../v1/posts'

import { setCookie } from 'cookies-next'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        //Unique ID for provider
        id: 'credentials',
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'theFairWork_Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: 'Email', type: 'text', placeholder: 'Email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const res = await fetch(
            `https://connect-api.amalitech-dev.net/api/v1/users/loginV2/`,
            {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { 'Content-Type': 'application/json' },
            }
          )

          const user = await res.json()

          token.token = user.token

          // localStorage.setItem('authToken', 'token')

          // If no error and we have user data, return it
          if (res.ok && user) {
            return user
          }

          return null
        },
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        if (user) {
          return user
        } else {
          // Return false to display a default error message
          // return false
          // Or you can return a URL to redirect to:
          return '/unauthorized'
        }
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith('/')) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
      async jwt({ token, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (user) {
          // token.user = user
          token.accessToken = user.token
          token.id = user.user.id
          token.email = user.user.email
          token.name =
            user.user.UserProfile.firstname +
            ' ' +
            user.user.UserProfile.lastname
          token.picture = user.user.UserProfile.profile_picture

          setCookie('authToken', user.token, {
            req,
            res,
            maxAge: 60 * 60 * 24,
          })
        }

        return token
      },
      async session({ session, token }) {
        // Send properties to the client, like an access_token and user id from a provider.
        session.accessToken = token.accessToken
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
        return session
      },
    },
    // pages: {
    //   signIn: '/login',
    // },
  }
}

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
