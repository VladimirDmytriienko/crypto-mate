import { Link } from '@tanstack/react-router'
import { useAuthQuery } from '@/hooks/useAuthQuery';


const Nav = () => {
  const { user } = useAuthQuery()
  const isAuthenticated = !!user

  return (
    <nav className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-black/20 text-white rounded-full px-4 py-2 flex space-x-4 shadow-lg text-sm mt-4 mb-4">
      <Link to="/" className="text-gray-300 hover:text-white transition">
        Dashboard
      </Link>
      <Link to="/about" className="text-gray-300 hover:text-white transition">
        About
      </Link>

      {isAuthenticated ?
        <Link to="/" className="text-gray-300 hover:text-white transition">
          "Logged in!"
        </Link>
        :
        <>
          <Link to="/sign-in" className="text-gray-300 hover:text-white transition">
            Sign In
          </Link>
          <Link to="/sign-up" className="text-gray-300 hover:text-white transition">
            Sign Up
          </Link>
        </>
      }
    </nav>
  )
}

export default Nav
