import { Link } from '@tanstack/react-router'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

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

  const linkBase =
    'inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium ' +
    'border border-transparent text-white/90 transition-all duration-300 ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-black/40'

  const navClasses = cn(
    'z-50 backdrop-blur-lg bg-black/60 text-white',
    'flex items-center gap-3 px-5 sm:px-6 py-2.5 w-full max-w-4xl',
    'rounded-full border border-white/40',
    'shadow-[0_10px_30px_-12px_rgba(255,255,255,0.45)]',
    'transition-all duration-300 ease-out',
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
            className={cn(
              linkBase,
              'hover:text-white hover:bg-white/10 hover:border-white/70',
              'hover:shadow-[0_8px_24px_-10px_rgba(255,255,255,0.8)]'
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {isAuthenticated ? (
          <Button
            size="sm"
            variant="secondary"
            className={cn(
              'h-9 rounded-full px-4',
              'transition-all duration-300 ease-out',
              'hover:-translate-y-[2px]',
              'hover:bg-white hover:text-black',
              'hover:border hover:border-white/70',
              'hover:shadow-[0_12px_24px_-14px_rgba(255,255,255,0.85)]'
            )}
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                'h-9 rounded-full px-4 text-gray-200',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-[2px]',
                'hover:text-white hover:bg-white/10',
                'hover:border hover:border-white/60',
                'hover:shadow-[0_10px_22px_-14px_rgba(255,255,255,0.85)]'
              )}
              asChild
            >
              <Link to="/sign-in">Sign in</Link>
            </Button>

            <Button
              size="sm"
              className={cn(
                'h-9 rounded-full px-4 bg-white text-black',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-[2px] hover:bg-white',
                'hover:shadow-[0_12px_28px_-16px_rgba(255,255,255,0.9)]',
                'hover:border hover:border-white/70'
              )}
              asChild
            >
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
