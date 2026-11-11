import React, { useState } from 'react';
import { 
  User, 
  BookOpen, 
  Bell, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  Save, 
  Shield 
} from 'lucide-react';
import { UserProfile, Task } from '../../types';

interface SettingsViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetData: () => void;
  tasks: Task[];
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  onResetData,
  tasks,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [major, setMajor] = useState(userProfile.major);
  const [semester, setSemester] = useState(userProfile.semester);
  const [university, setUniversity] = useState(userProfile.university);
  const [dailyGoal, setDailyGoal] = useState(userProfile.dailyStudyGoalHours);
  const [isSaved, setIsSaved] = useState(false);

  // Preference toggles
  const [emailReminders, setEmailReminders] = useState(true);
  const [overdueAlerts, setOverdueAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name: name.trim(),
      email: email.trim(),
      major: major.trim(),
      semester: semester.trim(),
      university: university.trim(),
      dailyStudyGoalHours: Number(dailyGoal) || 4,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `studyflow-tasks-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Settings & Preferences</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your student profile, academic semester goals, and prototype data
        </p>
      </div>

      {/* Student Profile Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-600/20"
          />
          <div>
            <h3 className="text-sm font-bold text-slate-900">{userProfile.name}</h3>
            <p className="text-xs text-slate-500">{userProfile.role} · {userProfile.semester}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                University Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Major
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Semester
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Daily Study Target (Hours)
              </label>
              <input
                type="number"
                min="1"
                max="14"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value) || 4)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            {isSaved ? (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </span>
            ) : (
              <span className="text-xs text-slate-400">Updates saved to localStorage</span>
            )}

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Notification Preferences</h3>
        <p className="text-xs text-slate-500 mb-4">
          Control how and when you receive reminders for approaching deadlines
        </p>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">
                Urgent Deadline Alerts
              </span>
              <span className="text-[11px] text-slate-500">
                Notify 4 hours and 1 hour before an assignment deadline
              </span>
            </div>
            <input
              type="checkbox"
              checked={overdueAlerts}
              onChange={(e) => setOverdueAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">
                Daily Study Briefing
              </span>
              <span className="text-[11px] text-slate-500">
                Morning summary of tasks scheduled for today
              </span>
            </div>
            <input
              type="checkbox"
              checked={dailySummary}
              onChange={(e) => setDailySummary(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Data Management & Prototype Reset */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Data & Prototype Persistence</h3>
        <p className="text-xs text-slate-500 mb-4">
          Your changes are stored locally in your browser. You can export or restore the default sample dataset at any time.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Tasks JSON</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all tasks and categories to initial 24 academic sample tasks?')) {
                onResetData();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Sample Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
