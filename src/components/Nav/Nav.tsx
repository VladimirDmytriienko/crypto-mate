import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Info,
  Coins,
  PlusCircle,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react'
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

  const links: Array<{ to: string; label: string; icon: LucideIcon }> = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/about', label: 'About', icon: Info },
    { to: '/assets', label: 'Assets', icon: Coins },
    { to: '/add-asset', label: 'Add Asset', icon: PlusCircle },
  ]

  const linkBase =
    'inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-0 sm:h-9 text-[10px] sm:text-sm font-medium ' +
    'border border-transparent text-white/90 transition-all duration-300 ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-black/40'

  const navClasses = cn(
    'z-50 backdrop-blur-lg bg-black/60 text-white',
    'flex items-center gap-2 sm:gap-3 py-1 px-2 sm:px-4 w-full max-w-[calc(100%-2rem)] sm:max-w-4xl mx-auto',
    'rounded-full border border-white/40',
    'shadow-[0_10px_30px_-12px_rgba(255,255,255,0.45)]',
    'transition-all duration-300 ease-out',
    isBottom
      ? 'fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] sm:w-auto'
      : 'sticky top-4 mt-4 mb-6'
  )

  return (
    <nav className={navClasses}>
      <div className="flex flex-wrap items-center gap-2">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              linkBase,
              'hover:text-white hover:bg-white/10 hover:border-white/70',
              'hover:shadow-[0_8px_24px_-10px_rgba(255,255,255,0.8)]'
            )}
          >
            <Icon
              className="h-[14px] w-[14px] sm:size-4 md:size-[18px]"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="tracking-tight">{label}</span>
          </Link>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {isAuthenticated ? (
          <Button
            size="sm"
            variant="secondary"
            className={cn(
              'h-8 sm:h-9 rounded-full px-2 sm:px-3 text-xs sm:text-sm',
              'gap-1 sm:gap-1.5',
              'transition-all duration-300 ease-out',
              'hover:-translate-y-[2px]',
              'hover:bg-white hover:text-black',
              'hover:border hover:border-white/70',
              'hover:shadow-[0_12px_24px_-14px_rgba(255,255,255,0.85)]'
            )}
            aria-label="Sign out"
            onClick={() => signOut()}
          >
            <LogOut
              className="h-[14px] w-[14px] sm:size-4 md:size-[18px]"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                'h-8 sm:h-9 rounded-full px-2 sm:px-3 text-[10px] sm:text-sm text-gray-200',
                'gap-1 sm:gap-1.5',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-[2px]',
                'hover:text-white hover:bg-white/10',
                'hover:border hover:border-white/60',
                'hover:shadow-[0_10px_22px_-14px_rgba(255,255,255,0.85)]'
              )}
              asChild
            >
              <Link to="/sign-in" aria-label="Sign in" className="flex items-center gap-1 sm:gap-1.5">
                <LogIn
                  className="h-[14px] w-[14px] sm:size-4 md:size-[18px]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="hidden sm:inline">Sign in</span>
              </Link>
            </Button>

            <Button
              size="sm"
              className={cn(
                'h-8 sm:h-9 rounded-full px-2 sm:px-3 text-xs sm:text-sm bg-white text-black',
                'gap-1 sm:gap-1.5',
                'transition-all duration-300 ease-out',
                'hover:-translate-y-[2px] hover:bg-white',
                'hover:shadow-[0_12px_28px_-16px_rgba(255,255,255,0.9)]',
                'hover:border hover:border-white/70'
              )}
              asChild
            >
              <Link to="/sign-up" aria-label="Sign up" className="flex items-center gap-1 sm:gap-1.5">
                <UserPlus
                  className="h-[14px] w-[14px] sm:size-4 md:size-[18px]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="hidden sm:inline">Sign up</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
