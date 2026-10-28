import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navItems } from './navItems'
import LoginButton from './LoginButton'

export default function Header() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded px-3 py-2 text-sm font-medium ${
      isActive ? 'bg-navy-50 text-navy-900' : 'text-slate-700 hover:bg-slate-100'
    }`
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-navy-800">
          사회복지학 연구 아카이브
        </Link>
        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex gap-1">
            {navItems.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} className={linkClass}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LoginButton />
          <button
            type="button"
            className="rounded border border-slate-300 px-3 py-2 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? '닫기' : '☰ 메뉴'}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="모바일 메뉴" className="border-t border-slate-200 px-4 py-2 md:hidden">
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
