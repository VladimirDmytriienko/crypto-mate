import { Link } from '@tanstack/react-router'
import { useAuthQuery } from '@/hooks/useAuthQuery';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type NavProps = {
  position?: 'top' | 'bottom'
}

const Nav = ({ position = 'top' }: NavProps) => {
  const { user, signOut } = useAuthQuery()
  const isAuthenticated = !!user
  const isBottom = position === 'bottom'
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/about', label: 'About' },
    { to: '/assets', label: 'Assets' },
    { to: '/add-asset', label: 'Add Asset' },
  ]

  const getLinkClasses = (isActive: boolean) =>
    cn(
      'relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium border border-white/10 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40',
      'hover:-translate-y-1 hover:scale-[1.05] hover:border-white/80 hover:bg-white/35 hover:text-black hover:shadow-[0_16px_32px_-18px_rgba(255,255,255,0.95)]',
      'after:absolute after:inset-0 after:rounded-full after:border after:border-white/50 after:opacity-0 after:transition-opacity after:duration-300 after:content-[""] hover:after:opacity-100',
      isActive
        ? 'bg-white text-black shadow-lg hover:bg-white hover:text-black'
        : 'text-gray-100'
    )

  const navClasses = cn(
    'z-50 bg-black/60 dark:bg-black/60 backdrop-blur-lg border border-white/20 dark:border-white/10 text-white rounded-full shadow-lg transition-all duration-300',
    'flex items-center gap-3 px-4 sm:px-6 py-3 w-full max-w-4xl',
    isBottom
      ? 'fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]'
      : 'sticky top-4 mt-4 mb-6'
  )

  return (
    <nav className={navClasses}>
      <div className="flex flex-wrap items-center gap-2">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        {isAuthenticated ? (
          <Button
            size="sm"
            variant="secondary"
            className="transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.05] hover:border hover:border-white/70 hover:bg-white hover:text-black hover:shadow-[0_16px_32px_-18px_rgba(255,255,255,0.95)]"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-200 hover:text-black transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.05] hover:bg-white/40 hover:border hover:border-white/70 hover:shadow-[0_12px_24px_-14px_rgba(255,255,255,0.9)]"
              asChild
            >
              <Link to="/sign-in">
                Sign in
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_18px_36px_-18px_rgba(255,255,255,0.9)] hover:border hover:border-white/80"
              asChild
            >
              <Link to="/sign-up">
                Sign up
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
