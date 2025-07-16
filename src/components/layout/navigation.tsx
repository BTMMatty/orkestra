// src/components/layout/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  TrendingUp, 
  Trophy,
  Zap,
  Brain,
  BarChart3,
  Settings
} from 'lucide-react'

const navItems = [
  {
    label: 'COMMAND CENTER',
    href: '/',
    icon: LayoutDashboard,
    description: 'Neural HQ'
  },
  {
    label: 'ACCOUNTS',
    href: '/accounts',
    icon: Building2,
    description: 'Entity Control'
  },
  {
    label: 'CONTACTS',
    href: '/contacts',
    icon: Users,
    description: 'Human Assets'
  },
  {
    label: 'OPPORTUNITIES',
    href: '/opportunities',
    icon: TrendingUp,
    description: 'Strike Zones'
  },
  {
    label: 'DEALS',
    href: '/deals',
    icon: Trophy,
    description: 'Victory Log'
  },
  {
    label: 'AGENTS',
    href: '/agents',
    icon: Brain,
    description: 'AI Squadron'
  },
  {
    label: 'ANALYTICS',
    href: '/analytics',
    icon: BarChart3,
    description: 'Battle Metrics'
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-black border-r border-white/20">
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border-2 border-white rounded-full" />
            <div className="absolute w-12 h-0.5 bg-white top-1/2 left-1/2 
                          -translate-x-1/2 -translate-y-1/2 rotate-45" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight group-hover:text-glow">
              ORKESTRA
            </div>
            <div className="text-xs opacity-70">CRM DOMINANCE</div>
          </div>
        </Link>
      </div>

      {/* Quick Command */}
      <div className="p-4 border-b border-white/20">
        <Link 
          href="/command"
          className="flex items-center gap-3 p-3 border border-white/30 
                   hover:border-white hover:bg-white hover:text-black 
                   transition-all duration-200 group"
        >
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">QUICK COMMAND</span>
        </Link>
      </div>

      {/* Nav Items */}
      <div className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 transition-all duration-200
                ${isActive 
                  ? 'bg-white text-black' 
                  : 'hover:bg-white/10 hover:translate-x-1'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.label}</div>
                <div className={`text-xs ${isActive ? 'opacity-70' : 'opacity-50'}`}>
                  {item.description}
                </div>
              </div>
              {isActive && (
                <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
              )}
            </Link>
          )
        })}
      </div>

      {/* User Menu */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <Link 
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 
                   transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">CONTROL PANEL</span>
        </Link>
      </div>
    </nav>
  )
}