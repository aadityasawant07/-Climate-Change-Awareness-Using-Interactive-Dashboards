import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageTab } from '../../types/climate';
import { 
  User, 
  Mail, 
  Calendar, 
  Lock, 
  LogOut, 
  Save, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  BarChart3
} from 'lucide-react';

interface ProfileViewProps {
  setActiveTab: (tab: PageTab) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ setActiveTab }) => {
  const { user, logout, updateProfileName, changeUserPassword, historyRecords, savedCities, unlockedAchievements } = useAuth();

  // Name edit state
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [nameSaving, setNameSaving] = useState(false);
  const [nameMsg, setNameMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password change state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passSaving, setPassSaving] = useState(false);
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameMsg(null);
    if (!nameInput.trim() || nameInput.trim().length < 2) {
      setNameMsg({ type: 'error', text: 'Name must be at least 2 characters.' });
      return;
    }
    setNameSaving(true);
    try {
      await updateProfileName(nameInput);
      setNameMsg({ type: 'success', text: 'Display name updated successfully.' });
    } catch (err: any) {
      setNameMsg({ type: 'error', text: err.message || 'Failed to update name.' });
    } finally {
      setNameSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg(null);
    if (newPass.length < 6) {
      setPassMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPass !== confirmNewPass) {
      setPassMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setPassSaving(true);
    try {
      await changeUserPassword(oldPass, newPass);
      setPassMsg({ type: 'success', text: 'Password changed successfully.' });
      setOldPass('');
      setNewPass('');
      setConfirmNewPass('');
    } catch (err: any) {
      setPassMsg({ type: 'error', text: err.message || 'Failed to change password.' });
    } finally {
      setPassSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTab('home');
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">

      {/* Profile Hero Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-[#0a2318] to-[#040e09] shadow-2xl">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/10">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-emerald-950/60 shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{user.name}</h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{user.email}</span>
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Member since {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-2xl bg-climate-dark/60 border border-climate-border">
            <div className="text-xl font-black font-mono text-emerald-400">{historyRecords.length}</div>
            <div className="text-slate-400 text-[11px]">Assessments</div>
          </div>
          <div className="p-3 rounded-2xl bg-climate-dark/60 border border-climate-border">
            <div className="text-xl font-black font-mono text-cyan-400">{savedCities.length}</div>
            <div className="text-slate-400 text-[11px]">Saved Cities</div>
          </div>
          <div className="p-3 rounded-2xl bg-climate-dark/60 border border-climate-border">
            <div className="text-xl font-black font-mono text-amber-400">{unlockedAchievements.length}</div>
            <div className="text-slate-400 text-[11px]">Badges Earned</div>
          </div>
        </div>
      </div>

      {/* Update Display Name */}
      <div className="glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" />
          <span>Update Display Name</span>
        </h3>

        {nameMsg && (
          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
            nameMsg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            {nameMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{nameMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveName} className="flex gap-3">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter new display name..."
            className="flex-1 bg-climate-darker border border-climate-border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            type="submit"
            disabled={nameSaving}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all"
          >
            {nameSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save</span>
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Change Password</span>
        </h3>

        {passMsg && (
          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
            passMsg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            {passMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
            <span>{passMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3">
          {[
            { label: 'Current Password', value: oldPass, setter: setOldPass, placeholder: '••••••••' },
            { label: 'New Password (min 6 characters)', value: newPass, setter: setNewPass, placeholder: '••••••••' },
            { label: 'Confirm New Password', value: confirmNewPass, setter: setConfirmNewPass, placeholder: '••••••••' },
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{label}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full bg-climate-darker border border-climate-border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span>Show passwords</span>
            </label>

            <button
              type="submit"
              disabled={passSaving}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              {passSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Logout */}
      <div className="glass-panel p-5 rounded-3xl border border-rose-500/30 bg-rose-950/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Sign Out</h3>
            <p className="text-xs text-slate-400">End your current session and return to the public home page.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 border border-rose-500/40 text-white font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

    </div>
  );
};
