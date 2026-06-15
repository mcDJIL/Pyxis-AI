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
import logo from '../../assets/images/logo.png'

const navItems = [
  { to: '/history', icon: History, label: 'History' },
  { to: '/settings', icon: Settings, label: 'Settings' },
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
      <div className="h-16 px-3 flex items-center">
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="
              w-10 h-10
              rounded-lg
              flex items-center justify-center
              text-text-secondary
              hover:bg-surface-elevated
              hover:text-text-primary
              transition-all
              cursor-pointer
            "
          >
            <PanelLeftOpen size={18} />
          </button>
        ) : (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-8 h-8 rounded-lg"
              />

              <span className="font-semibold text-text-primary text-md">
                PyxisAI
              </span>
            </div>

            <button
              onClick={() => setCollapsed(true)}
              className="
                w-9 h-9
                rounded-lg
                flex items-center justify-center
                text-text-secondary
                hover:bg-surface-elevated
                hover:text-text-primary
                transition-all
                cursor-pointer
              "
            >
              <PanelRightOpen size={18} />
            </button>
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
          <div className="w-5 h-5 rounded-sm bg-[#0059BB] flex items-center justify-center">
            <Plus className="text-white" size={14} />
          </div>

          {!collapsed && (
            <>
              <span className="flex-1">New Chat</span>
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

        {!collapsed && history.length > 0 && (
          <div className="pt-4">
            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest px-2 mb-3">
              Terbaru
            </p>

            {history.slice(0, 4).map((item) => (
              <NavLink
                to={`dashboard/${item.id}`}
                key={item.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-muted hover:text-text-secondary hover:bg-surface-elevated cursor-pointer transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand/60 shrink-0" />
                <span className="truncate">{item.idea}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}
