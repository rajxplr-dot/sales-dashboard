'use client';

import React, { useState, useCallback } from 'react';
import { DashboardHeader, DashboardTab } from '@/components/DashboardHeader';
import { SummaryCard } from '@/components/SummaryCard';
import { ReviewTrendChart } from '@/components/ReviewTrendChart';
import { ViolationDistributionChart } from '@/components/ViolationDistributionChart';
import { UserManagementTable } from '@/components/UserManagementTable';
import { ComplianceRuleManager } from '@/components/ComplianceRuleManager';
import { SystemHealthMonitor } from '@/components/SystemHealthMonitor';
import { FeatureFlagsManager } from '@/components/FeatureFlagsManager';
import { ToastNotification, ToastMessage } from '@/components/ToastNotification';
import {
  FileCheckIcon,
  ShieldAlertIcon,
  CheckBadgeIcon,
  ClockFastIcon,
} from '@/components/icons';
import {
  INITIAL_METRICS,
  INITIAL_REVIEW_TRENDS,
  INITIAL_RULE_VIOLATIONS,
  INITIAL_USERS,
  INITIAL_COMPLIANCE_RULES,
  INITIAL_SYSTEM_HEALTH,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_FEATURE_FLAGS,
  EnterpriseUser,
  RuleSeverity,
  ActivityLogEntry,
} from '@/data/mockComplianceData';
import { formatNumber, formatDuration } from '@/lib/utils';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Local state for interactive features
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [reviewTrends, setReviewTrends] = useState(INITIAL_REVIEW_TRENDS);
  const [ruleViolations, setRuleViolations] = useState(INITIAL_RULE_VIOLATIONS);
  const [users, setUsers] = useState<EnterpriseUser[]>(INITIAL_USERS);
  const [rules, setRules] = useState(INITIAL_COMPLIANCE_RULES);
  const [systemHealth, setSystemHealth] = useState(INITIAL_SYSTEM_HEALTH);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>(INITIAL_ACTIVITY_LOGS);
  const [featureFlags, setFeatureFlags] = useState(INITIAL_FEATURE_FLAGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Helper to add toast messages
  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 1. User Management Update
  const handleUpdateUser = useCallback(
    (updatedUser: EnterpriseUser) => {
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      addToast({
        type: 'success',
        title: 'Permissions Updated',
        message: `Successfully modified role and system privileges for ${updatedUser.name}.`,
      });
    },
    [addToast]
  );

  // 2. Rule Toggling
  const handleToggleRule = useCallback(
    (ruleId: string) => {
      setRules((prev) =>
        prev.map((r) => {
          if (r.id === ruleId) {
            const nextActive = !r.active;
            addToast({
              type: nextActive ? 'success' : 'warning',
              title: `Rule ${r.code} ${nextActive ? 'Enabled' : 'Disabled'}`,
              message: nextActive
                ? `${r.title} is now actively enforcing in the surveillance pipeline.`
                : `${r.title} has been deactivated. Filings will bypass this check.`,
            });
            return { ...r, active: nextActive };
          }
          return r;
        })
      );
    },
    [addToast]
  );

  // 3. Rule Severity Change
  const handleChangeSeverity = useCallback(
    (ruleId: string, newSeverity: RuleSeverity) => {
      setRules((prev) =>
        prev.map((r) => {
          if (r.id === ruleId) {
            addToast({
              type: 'info',
              title: `Rule Severity Updated`,
              message: `Severity tier for ${r.code} changed from ${r.severity} to ${newSeverity}.`,
            });
            return { ...r, severity: newSeverity };
          }
          return r;
        })
      );
    },
    [addToast]
  );

  // 4. Feature Flag Toggle
  const handleToggleFlag = useCallback(
    (flagId: string) => {
      setFeatureFlags((prev) =>
        prev.map((f) => {
          if (f.id === flagId) {
            const nextEnabled = !f.enabled;
            addToast({
              type: nextEnabled ? 'success' : 'warning',
              title: `Feature Flag: ${f.name}`,
              message: nextEnabled
                ? `${f.name} activated. Pipeline telemetry latency: ${f.latencyImpact}.`
                : `${f.name} deactivated. Subsystem bypassed in runtime pipeline.`,
            });
            return { ...f, enabled: nextEnabled };
          }
          return f;
        })
      );
    },
    [addToast]
  );

  // 5. Simulate Real-time Log Event
  const handleSimulateLogEvent = useCallback(() => {
    const sampleEvents = [
      {
        subsystem: 'RuleEngine' as const,
        level: 'Warning' as const,
        actor: 'ML-Surveillance-Worker-4',
        message: 'Flagged subtle promissory return claim on Pitchbook #PB-49219 under FINRA-2210.',
        traceId: `trc-finra-${Math.floor(1000 + Math.random() * 9000)}`,
      },
      {
        subsystem: 'PresidioMasker' as const,
        level: 'Success' as const,
        actor: 'PresidioService-02',
        message: 'Scrubbed 4 SSNs and 1 credit card number from trade confirmation audit log.',
        traceId: `trc-pii-${Math.floor(1000 + Math.random() * 9000)}`,
      },
      {
        subsystem: 'Auth' as const,
        level: 'Info' as const,
        actor: 'Elena Rostova',
        message: 'Authorized regulatory export package #EXP-2026-10-Q3 for SEC external examination.',
        traceId: `sec-exp-${Math.floor(1000 + Math.random() * 9000)}`,
      },
    ];

    const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const newLog: ActivityLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      ...randomEvent,
    };

    setActivityLogs((prev) => [newLog, ...prev]);
    addToast({
      type: 'info',
      title: 'Telemetry Event Captured',
      message: `New activity log entry received from ${newLog.subsystem}.`,
    });
  }, [addToast]);

  // 6. Refresh Telemetry
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSystemHealth((prev) => ({
        ...prev,
        apiLatencyMs: Math.floor(34 + Math.random() * 10),
        errorRatePercent: parseFloat((0.01 + Math.random() * 0.005).toFixed(3)),
      }));
      setIsRefreshing(false);
      addToast({
        type: 'success',
        title: 'Health Telemetry Refreshed',
        message: 'Surveillance pipeline telemetry synchronized with replica nodes.',
      });
    }, 600);
  }, [addToast]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Header with Tab Navigation */}
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* EXECUTIVE METRICS CARDS (Always visible at top of Overview & accessible) */}
        <section aria-labelledby="executive-metrics-heading">
          <h2 id="executive-metrics-heading" className="sr-only">
            Executive Metrics Overview
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Metric 1: Total Documents Reviewed */}
            <SummaryCard
              title="Total Documents Reviewed"
              value={formatNumber(metrics.totalReviewed)}
              growth={metrics.totalReviewedGrowth}
              growthLabel="vs prior 30 days"
              trendDirection="up"
              trendSentiment="positive"
              subtitle="100% filing surveillance coverage"
              icon={<FileCheckIcon className="h-5 w-5" />}
            />

            {/* Metric 2: Compliance Violations Flagged */}
            <SummaryCard
              title="Compliance Violations Flagged"
              value={formatNumber(metrics.violationsFlagged)}
              growth={metrics.violationsFlaggedChange}
              growthLabel="violation reduction"
              trendDirection="down"
              trendSentiment="positive"
              subtitle="FINRA / SEC flags resolved"
              icon={<ShieldAlertIcon className="h-5 w-5 text-rose-600" />}
            />

            {/* Metric 3: Pass Rate */}
            <SummaryCard
              title="Regulatory Pass Rate"
              value={`${metrics.passRate}%`}
              growth={metrics.passRateChange}
              growthLabel="vs internal benchmark"
              trendDirection="up"
              trendSentiment="positive"
              subtitle="Industry high adherence"
              icon={<CheckBadgeIcon className="h-5 w-5 text-emerald-600" />}
            />

            {/* Metric 4: Average Review Time */}
            <SummaryCard
              title="Average Review Time"
              value={formatDuration(metrics.avgReviewTimeSec)}
              growth={metrics.avgReviewTimeChangeSec}
              growthLabel="faster per document"
              trendDirection="down"
              trendSentiment="positive"
              isHighlight={true}
              subtitle="Sub-second inference target"
              icon={<ClockFastIcon className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Charts Section: Review Trends + Violation Distribution */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ReviewTrendChart data={reviewTrends} />
              </div>
              <div className="lg:col-span-1">
                <ViolationDistributionChart data={ruleViolations} />
              </div>
            </div>

            {/* Compliance Quick Rule Snapshot */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ComplianceRuleManager
                rules={rules}
                onToggleRule={handleToggleRule}
                onChangeSeverity={handleChangeSeverity}
              />

              <div className="space-y-6">
                <FeatureFlagsManager
                  flags={featureFlags}
                  onToggleFlag={handleToggleFlag}
                />
              </div>
            </div>

            {/* System Health Quick Telemetry */}
            <SystemHealthMonitor
              metrics={systemHealth}
              logs={activityLogs}
              onAddSimulatedLog={handleSimulateLogEvent}
            />
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT TABLE */}
        {activeTab === 'users' && (
          <div className="animate-in fade-in duration-200">
            <UserManagementTable
              users={users}
              onUpdateUser={handleUpdateUser}
            />
          </div>
        )}

        {/* TAB 3: COMPLIANCE RULE MANAGER */}
        {activeTab === 'rules' && (
          <div className="animate-in fade-in duration-200">
            <ComplianceRuleManager
              rules={rules}
              onToggleRule={handleToggleRule}
              onChangeSeverity={handleChangeSeverity}
            />
          </div>
        )}

        {/* TAB 4: SYSTEM HEALTH & ACTIVITY LOGS */}
        {activeTab === 'health' && (
          <div className="animate-in fade-in duration-200">
            <SystemHealthMonitor
              metrics={systemHealth}
              logs={activityLogs}
              onAddSimulatedLog={handleSimulateLogEvent}
            />
          </div>
        )}

        {/* TAB 5: FEATURE FLAGS */}
        {activeTab === 'flags' && (
          <div className="animate-in fade-in duration-200">
            <FeatureFlagsManager
              flags={featureFlags}
              onToggleFlag={handleToggleFlag}
            />
          </div>
        )}
      </main>

      {/* Floating Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
