import React, { useState, useRef, useEffect } from 'react';
import { PageTab } from '../../types/climate';
import { useAuth } from '../../context/AuthContext';
import { NotificationBell } from '../alerts/NotificationBell';
import { 
  Globe2, 
  BarChart3, 
  MapPin, 
  BookOpen, 
  Sparkles, 
  Info, 
  Menu, 
  X, 
  Leaf,
  Home,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Calendar,
  Star,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  FileText,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenCepTour?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCepTour }) => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Visitor nav items
  const visitorNavItems: { tab: PageTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { tab: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { tab: 'globe', label: '3D Globe', icon: <Globe2 className="w-4 h-4" />, badge: '3D' },
    { tab: 'map', label: 'Climate Map', icon: <MapPin className="w-4 h-4" /> },
    { tab: 'awareness', label: 'Awareness', icon: <BookOpen className="w-4 h-4" /> },
    { tab: 'actions', label: 'Action Score', icon: <Sparkles className="w-4 h-4" />, badge: 'Quiz' },
    { tab: 'report', label: 'Report Generator', icon: <FileText className="w-4 h-4" /> },
    { tab: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  // Authenticated user nav items
  const userNavItems: { tab: PageTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { tab: 'dashboard', label: 'Live Telemetry', icon: <BarChart3 className="w-4 h-4" /> },
    { tab: 'globe', label: '3D Globe', icon: <Globe2 className="w-4 h-4" />, badge: '3D' },
    { tab: 'map', label: 'Map', icon: <MapPin className="w-4 h-4" /> },
    { tab: 'awareness', label: 'Awareness', icon: <BookOpen className="w-4 h-4" /> },
    { tab: 'actions', label: 'Action Score', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'my-dashboard', label: 'My Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { tab: 'report', label: 'Report', icon: <FileText className="w-4 h-4" /> },
  ];

  if (isAdmin) {
    userNavItems.push({ tab: 'admin', label: 'Admin Panel', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Admin' });
  }

  const navItems = isAuthenticated ? userNavItems : visitorNavItems;

  const handleSelect = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    setActiveTab('home');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-climate-darker/80 backdrop-blur-xl border-b border-climate-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleSelect('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-climate-darker rounded-[10px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  EcoPulse
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  3D Earth
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Climate Change Awareness Hub</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleSelect(item.tab)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isActive ? 'bg-emerald-400 text-black' : 'bg-climate-border text-emerald-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Center: Notifications, CEP Demo, & User Profile */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* 1. Notification Center Bell */}
            <NotificationBell />

            {/* 2. College CEP Demo Tour Button */}
            {onOpenCepTour && (
              <button
                onClick={onOpenCepTour}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/40 hover:border-emerald-400 text-emerald-200 text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
                title="Launch College Presentation Tour"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>CEP Demo</span>
              </button>
            )}

            {/* 3. Auth Area */}
            {isAuthenticated && user ? (
              /* Logged-In User Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-climate-dark border border-emerald-500/40 hover:border-emerald-400 text-white text-xs font-semibold transition-all"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-black text-white shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-climate-darker/98 border border-climate-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 divide-y divide-white/5 animate-in slide-in-from-top-2">
                    <div className="px-3.5 py-2.5 space-y-0.5">
                      <div className="font-bold text-xs text-white truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      {isAdmin && (
                        <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/30 uppercase block w-fit mt-1">
                          Administrator
                        </span>
                      )}
                    </div>

                    {[
                      { tab: 'my-dashboard' as PageTab, label: 'My Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
                      { tab: 'my-history' as PageTab, label: 'Assessment History', icon: <Calendar className="w-3.5 h-3.5" /> },
                      { tab: 'saved-cities' as PageTab, label: 'Saved Observatories', icon: <Star className="w-3.5 h-3.5" /> },
                      { tab: 'report' as PageTab, label: 'Climate Report', icon: <FileText className="w-3.5 h-3.5" /> },
                      { tab: 'profile' as PageTab, label: 'My Profile', icon: <User className="w-3.5 h-3.5" /> },
                    ].map((item) => (
                      <button
                        key={item.tab}
                        onClick={() => handleSelect(item.tab)}
                        className="w-full px-3.5 py-2 flex items-center gap-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span className="text-emerald-400">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}

                    {isAdmin && (
                      <button
                        onClick={() => handleSelect('admin')}
                        className="w-full px-3.5 py-2 flex items-center gap-2 text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                        <span>Admin Console</span>
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full px-3.5 py-2.5 flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Visitor Auth Buttons */
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleSelect('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-climate-dark border border-climate-border hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => handleSelect('register')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-climate-border bg-climate-dark text-slate-300 hover:text-white hover:border-emerald-500/40"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-climate-darker/98 border-b border-climate-border px-4 pt-2 pb-4 space-y-1 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 overflow-y-auto max-h-screen">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleSelect(item.tab)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {onOpenCepTour && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCepTour();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Launch College CEP Demo Tour</span>
            </button>
          )}

          <div className="pt-2 border-t border-white/10 space-y-1">
            {isAuthenticated ? (
              <>
                {[
                  { tab: 'my-dashboard' as PageTab, label: 'My Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
                  { tab: 'my-history' as PageTab, label: 'Assessment History', icon: <Calendar className="w-4 h-4" /> },
                  { tab: 'saved-cities' as PageTab, label: 'Saved Observatories', icon: <Star className="w-4 h-4" /> },
                  { tab: 'report' as PageTab, label: 'Climate Report', icon: <FileText className="w-4 h-4" /> },
                  { tab: 'profile' as PageTab, label: 'My Profile', icon: <User className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleSelect(item.tab)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="text-emerald-400">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
                {isAdmin && (
                  <button
                    onClick={() => handleSelect('admin')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-purple-300 hover:bg-purple-500/10 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Admin Console</span>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleSelect('login')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  <span>Login</span>
                </button>
                <button onClick={() => handleSelect('register')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white bg-emerald-600/40 hover:bg-emerald-600/60 border border-emerald-500/40 transition-all">
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
