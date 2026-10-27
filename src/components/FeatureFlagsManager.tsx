'use client';

import React from 'react';
import { FeatureFlag } from '@/data/mockComplianceData';
import { FlagIcon } from './icons';

interface FeatureFlagsManagerProps {
  flags: FeatureFlag[];
  onToggleFlag: (flagId: string) => void;
}

export const FeatureFlagsManager: React.FC<FeatureFlagsManagerProps> = ({
  flags,
  onToggleFlag,
}) => {
  const enabledCount = flags.filter((f) => f.enabled).length;

  // Derive dynamic pipeline metrics based on current state
  const isPiiActive = flags.find((f) => f.key === 'presidioPiiMasking')?.enabled ?? false;
  const isAiActive = flags.find((f) => f.key === 'aiSubstringValidation')?.enabled ?? false;
  const isPrecedentActive = flags.find((f) => f.key === 'precedentLookup')?.enabled ?? false;

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Runtime Feature Flags & NLP Modules
              </h2>
              <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                {enabledCount} of {flags.length} Enabled
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dynamically toggle regulatory inspection modules without triggering CI/CD restarts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-700">
              Live Configuration Sync
            </span>
          </div>
        </div>

        {/* Live Pipeline State Impact Cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={`rounded-xl border p-4 transition-all ${
            isAiActive
              ? 'border-indigo-200 bg-indigo-50/50 text-indigo-950'
              : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Semantic AI Engine
            </span>
            <div className="mt-2 text-lg font-bold">
              {isAiActive ? 'Deep LLM Inspection' : 'Exact Regex Only'}
            </div>
            <p className="mt-1 text-xs text-slate-600">
              {isAiActive
                ? 'High recall: catches obfuscated promissory language'
                : 'Deterministic fast regex path active'}
            </p>
          </div>

          <div className={`rounded-xl border p-4 transition-all ${
            isPiiActive
              ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
              : 'border-rose-200 bg-rose-50/50 text-rose-950'
          }`}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              PII Redaction Level
            </span>
            <div className="mt-2 text-lg font-bold flex items-center gap-2">
              {isPiiActive ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Active Masking
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Raw Unmasked Mode
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-600">
              {isPiiActive
                ? 'Presidio scrubs SSNs, routing codes, and IBANs'
                : 'Warning: PII scrubbing bypassed for debugging'}
            </p>
          </div>

          <div className={`rounded-xl border p-4 transition-all ${
            isPrecedentActive
              ? 'border-blue-200 bg-blue-50/50 text-blue-950'
              : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Precedent Vector DB
            </span>
            <div className="mt-2 text-lg font-bold">
              {isPrecedentActive ? '12k Precedents Online' : 'Precedent Scoring Bypassed'}
            </div>
            <p className="mt-1 text-xs text-slate-600">
              {isPrecedentActive
                ? 'Vector cosine similarity against past enforcement orders'
                : 'Historical enforcement lookups inactive'}
            </p>
          </div>
        </div>

        {/* Feature Flags Switches List */}
        <div className="mt-6 space-y-4">
          {flags.map((flag) => {
            const isHighlight =
              flag.key === 'aiSubstringValidation' ||
              flag.key === 'presidioPiiMasking' ||
              flag.key === 'precedentLookup';

            return (
              <div
                key={flag.id}
                className={`flex flex-col gap-3 rounded-xl border p-4 transition-all sm:flex-row sm:items-center sm:justify-between ${
                  flag.enabled
                    ? isHighlight
                      ? 'border-indigo-200 bg-indigo-50/20 shadow-sm'
                      : 'border-slate-200 bg-white shadow-sm'
                    : 'border-slate-200 bg-slate-50/70 opacity-80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {flag.name}
                    </h3>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 font-mono">
                      {flag.subsystem}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                        flag.safetyTier === 'High Security'
                          ? 'bg-rose-50 text-rose-700'
                          : flag.safetyTier === 'Core Compliance'
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {flag.safetyTier}
                    </span>
                    {isHighlight && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                        Required Feature Flag
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {flag.description}
                  </p>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Telemetry Overhead:{' '}
                    <strong className="text-slate-600">{flag.latencyImpact}</strong>
                  </div>
                </div>

                {/* Visible State Toggle Switch */}
                <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-bold ${
                        flag.enabled ? 'text-indigo-600' : 'text-slate-400'
                      }`}
                    >
                      {flag.enabled ? 'ENABLED' : 'DISABLED'}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {flag.enabled ? 'Active in Pipeline' : 'Bypassed'}
                    </span>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={flag.enabled}
                    aria-label={`Toggle ${flag.name}`}
                    onClick={() => onToggleFlag(flag.id)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      flag.enabled ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        flag.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
