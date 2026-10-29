import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems } from './navItems'
import LoginButton from './LoginButton'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { user, configured } = useAuth()
  // 승인되기 전에는 메뉴를 숨김
  const showNav = !configured || !!user?.allowed
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-full px-4 py-2 text-sm font-semibold ${
      isActive ? 'bg-navy-50 text-navy-800' : 'text-slate-700 hover:bg-slate-100'
    }`
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-navy-900">
          <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full bg-accent-500" />
          사회복지학 연구 아카이브
        </Link>
        {showNav && <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex gap-1">
            {navItems.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} className={linkClass}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>}
        <div className="flex items-center gap-2">
          <LoginButton />
          {showNav && <button
            type="button"
            className="rounded border border-slate-300 px-3 py-2 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? '닫기' : '☰ 메뉴'}
          </button>}
        </div>
      </div>
      {showNav && open && (
        <nav id="mobile-menu" aria-label="모바일 메뉴" className="border-t border-slate-200 px-4 py-2 lg:hidden">
          <ul>
            {navItems.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} className={linkClass} onClick={() => setOpen(false)}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
