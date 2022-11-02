import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import { useSession, getSession, signIn, signOut } from 'next-auth/react'

const Nav = () => {
  const { data: session, status } = useSession()

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/" legacyBehavior>Home</Link>
        </li>
        {!(status === 'loading') && !session && (
          <li>
            <Link href="/api/auth/signin" legacyBehavior>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  signIn({ callbackUrl: '/' })
                }}
              >
                Sign In
              </a>
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link href="/api/auth/signout" legacyBehavior>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  signOut({ callbackUrl: '/' })
                }}
              >
                Sign Out
              </a>
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link href="/create" legacyBehavior>
              <a>Create Post</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Nav
