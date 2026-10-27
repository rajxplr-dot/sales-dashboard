'use client';

import React, { useState, useMemo } from 'react';
import { EnterpriseUser, UserStatus } from '@/data/mockComplianceData';
import { UserEditModal } from './UserEditModal';
import { SearchIcon, FilterIcon, EditPencilIcon, ArrowUpDownIcon } from './icons';
import { formatNumber } from '@/lib/utils';

interface UserManagementTableProps {
  users: EnterpriseUser[];
  onUpdateUser: (updatedUser: EnterpriseUser) => void;
}

type SortField = 'name' | 'role' | 'department' | 'status' | 'documentsReviewed' | 'lastActive';
type SortOrder = 'asc' | 'desc';

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  onUpdateUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | UserStatus>('All');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('documentsReviewed');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal state
  const [selectedUser, setSelectedUser] = useState<EnterpriseUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
      const matchesRole = roleFilter === 'All' || u.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchQuery, statusFilter, roleFilter]);

  // Sort users
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortField, sortOrder]);

  // Paginate users
  const totalPages = Math.ceil(sortedUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedUsers.slice(startIndex, startIndex + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const openEditModal = (user: EnterpriseUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Active
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            Pending
          </span>
        );
      case 'Suspended':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
            Suspended
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              User Management & Access Control
            </h2>
            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              {filteredUsers.length} of {users.length} Users
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Surveillance personnel, compliance auditors, and role-based permission delegation
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or dept..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <FilterIcon className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Pending">Pending Only</option>
              <option value="Suspended">Suspended Only</option>
            </select>
          </div>

          {/* Page size */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-700 border-b border-slate-200">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="cursor-pointer px-4 py-3 font-bold hover:text-indigo-600"
              >
                <div className="flex items-center gap-1.5">
                  User <ArrowUpDownIcon className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('role')}
                className="cursor-pointer px-4 py-3 font-bold hover:text-indigo-600"
              >
                <div className="flex items-center gap-1.5">
                  Role <ArrowUpDownIcon className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('department')}
                className="cursor-pointer px-4 py-3 font-bold hover:text-indigo-600"
              >
                <div className="flex items-center gap-1.5">
                  Department <ArrowUpDownIcon className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="cursor-pointer px-4 py-3 font-bold hover:text-indigo-600"
              >
                <div className="flex items-center gap-1.5">
                  Status <ArrowUpDownIcon className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('documentsReviewed')}
                className="cursor-pointer px-4 py-3 font-bold hover:text-indigo-600 text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Reviewed <ArrowUpDownIcon className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('lastActive')}
                className="cursor-pointer px-4 py-3 font-bold hover:text-indigo-600"
              >
                <div className="flex items-center gap-1.5">
                  Last Active <ArrowUpDownIcon className="h-3 w-3" />
                </div>
              </th>
              <th className="px-4 py-3 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                        {u.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-medium text-slate-800">
                    {u.role}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">
                    {u.department}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {getStatusBadge(u.status)}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-semibold text-slate-900 text-right">
                    {formatNumber(u.documentsReviewed)}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">
                    {u.lastActive}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-center">
                    <button
                      onClick={() => openEditModal(u)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label={`Edit roles and permissions for ${u.name}`}
                    >
                      <EditPencilIcon className="h-3.5 w-3.5" />
                      Edit Role
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No users found matching "{searchQuery}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-4">
        <div className="text-xs text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-900">
            {sortedUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-slate-900">
            {Math.min(currentPage * pageSize, sortedUsers.length)}
          </span>{' '}
          of <span className="font-semibold text-slate-900">{sortedUsers.length}</span> users
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-7 w-7 rounded-lg text-xs font-semibold transition ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Role & Permissions Modal */}
      <UserEditModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdateUser}
      />
    </div>
  );
};
