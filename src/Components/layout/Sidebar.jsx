import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  History,
  Settings,
  Zap,
  ChevronRight,
  Plus,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightOpen,
  Icon,
} from 'lucide-react'

import { cn } from '../../Lib/Utils'
import { useAnalysisStore } from '../../Store/AnalysisStore'

const navItems = [
  { to: '/history', icon: History, label: 'Riwayat' },
  { to: '/settings', icon: Settings, label: 'Pengaturan' },
]

export default function Sidebar() {
  const { history } = useAnalysisStore()
  const [collapsed, setCollapsed] = useState(true)

  return (
    <aside
      className={cn(
        'shrink-0 flex flex-col h-full bg-surface-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'py-5 flex items-center',
          collapsed ? 'justify-center px-0' : 'gap-2.5 px-5'
        )}
      >
        <div className="rounded-lg bg-brand flex items-center justify-center shadow-brand">
          <Zap size={16} className="text-dark" />
        </div>

        {!collapsed && (
          <div>
            <span className="font-semibold text-text-primary text-sm tracking-wide">
              Pyxis
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-4 space-y-1">
        {!collapsed && (
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest px-2 mb-3">
            Menu
          </p>
        )}

        <NavLink
          to="/"
          end
          title="New Chat"
          className={({ isActive }) =>
            cn(
              'flex items-center rounded-xl text-sm transition-all duration-150',
              collapsed
                ? 'justify-center p-2'
                : 'gap-3 px-3 py-3',
              'bg-brand text-dark hover:opacity-90'
            )
          }
        >
          <div className="w-5 h-5 rounded-sm bg-black/10 flex items-center justify-center">
            <Plus size={14} />
          </div>

          {!collapsed && (
            <>
                <span className="flex-1">Obrolan Baru</span>
                <ChevronRight
                  size={12}
                  className="opacity-0 group-hover:opacity-50 transition-opacity"
                />
              </>
          )}
        </NavLink>

        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            title={label}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg text-sm transition-all duration-150 group',
                collapsed
                  ? 'justify-center py-3'
                  : 'gap-3 px-3 py-2.5',
                isActive
                  ? 'bg-brand/15 text-brand font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
              )
            }
          >
            <Icon size={18} />

            {!collapsed && (
              <>
                <span className="flex-1">{label}</span>
                <ChevronRight
                  size={12}
                  className="opacity-0 group-hover:opacity-50 transition-opacity"
                />
              </>
            )}
          </NavLink>
        ))}

        {/* Button Collapse / Expand */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full cursor-pointer rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all',
            collapsed
              ? 'flex justify-center py-3'
              : 'flex items-center gap-3 px-3 py-2.5'
          )}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <>
              <PanelRightOpen size={18} />
            </>
          )}
        </button>

        {!collapsed && history.length > 0 && (
          <div className="pt-4">
            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest px-2 mb-3">
              Terbaru
            </p>

            {history.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-muted hover:text-text-secondary hover:bg-surface-elevated cursor-pointer transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand/60 shrink-0" />
                <span className="truncate">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}