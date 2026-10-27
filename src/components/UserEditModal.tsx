'use client';

import React, { useState, useEffect } from 'react';
import { EnterpriseUser, UserRole, UserStatus, UserPermissions } from '@/data/mockComplianceData';
import { XMarkIcon } from './icons';

interface UserEditModalProps {
  user: EnterpriseUser | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: EnterpriseUser) => void;
}

const ROLES: UserRole[] = [
  'System Administrator',
  'Compliance Officer',
  'Senior Auditor',
  'Risk Analyst',
  'Junior Reviewer',
];

const STATUSES: UserStatus[] = ['Active', 'Pending', 'Suspended'];

export const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [role, setRole] = useState<UserRole>('Compliance Officer');
  const [status, setStatus] = useState<UserStatus>('Active');
  const [department, setDepartment] = useState<string>('');
  const [permissions, setPermissions] = useState<UserPermissions>({
    manageRules: false,
    approveOverrides: false,
    viewPii: false,
    exportAuditLogs: false,
    manageFeatureFlags: false,
  });

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setStatus(user.status);
      setDepartment(user.department);
      setPermissions({ ...user.permissions });
    }
  }, [user]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleTogglePermission = (key: keyof UserPermissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...user,
      role,
      status,
      department,
      permissions,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div>
            <h3 id="modal-title" className="text-base font-bold text-slate-900">
              Edit User Role & Permissions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Modify governance privileges for {user.name} ({user.id})
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* User identity summary */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
              {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Role selection */}
            <div>
              <label htmlFor="role-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Governance Role
              </label>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Status selection */}
            <div>
              <label htmlFor="status-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Account Status
              </label>
              <select
                id="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as UserStatus)}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department field */}
          <div>
            <label htmlFor="department-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Department
            </label>
            <input
              id="department-input"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Permissions checklist */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Granular System Permissions
            </label>
            <div className="space-y-2.5 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.manageRules}
                  onChange={() => handleTogglePermission('manageRules')}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900">Manage Compliance Rules</span>
                  <p className="text-[11px] text-slate-500">Deploy, toggle, and adjust severity thresholds for FINRA / SEC rules</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.approveOverrides}
                  onChange={() => handleTogglePermission('approveOverrides')}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900">Approve Violation Overrides</span>
                  <p className="text-[11px] text-slate-500">Authorize formal compliance exceptions with signed audit justifications</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.viewPii}
                  onChange={() => handleTogglePermission('viewPii')}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900">View Unmasked Presidio PII</span>
                  <p className="text-[11px] text-slate-500">Access raw client identifiers required for investigatory subpoenas</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.exportAuditLogs}
                  onChange={() => handleTogglePermission('exportAuditLogs')}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900">Export Regulatory Audit Logs</span>
                  <p className="text-[11px] text-slate-500">Generate cryptographic immutable log exports for external auditors</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissions.manageFeatureFlags}
                  onChange={() => handleTogglePermission('manageFeatureFlags')}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900">Toggle Feature Flags</span>
                  <p className="text-[11px] text-slate-500">Change runtime NLP and pipeline switches (AI Substring, Presidio, Precedent)</p>
                </div>
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
