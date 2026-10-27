/**
 * Enterprise Compliance Platform Mock Dataset
 * 
 * DISCLOSURE:
 * This dataset contains realistic synthetic enterprise data representing a financial 
 * compliance intelligence & document review system (FINRA / SEC compliance workflows).
 * All names, metrics, log traces, and user records are simulated for demonstration purposes.
 */

export interface ExecutiveMetrics {
  totalReviewed: number;
  totalReviewedGrowth: number;
  violationsFlagged: number;
  violationsFlaggedChange: number; // negative is good!
  passRate: number;
  passRateChange: number;
  avgReviewTimeSec: number;
  avgReviewTimeChangeSec: number; // negative is faster!
}

export interface ReviewTrendPoint {
  date: string;
  reviewed: number;
  compliant: number;
  violations: number;
}

export interface RuleViolationBreakdown {
  ruleId: string;
  ruleName: string;
  category: string;
  violations: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  percentage: number;
}

export type UserStatus = 'Active' | 'Pending' | 'Suspended';
export type UserRole = 'System Administrator' | 'Compliance Officer' | 'Senior Auditor' | 'Risk Analyst' | 'Junior Reviewer';

export interface UserPermissions {
  manageRules: boolean;
  approveOverrides: boolean;
  viewPii: boolean;
  exportAuditLogs: boolean;
  manageFeatureFlags: boolean;
}

export interface EnterpriseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  documentsReviewed: number;
  lastActive: string;
  permissions: UserPermissions;
}

export type RuleSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface ComplianceRule {
  id: string;
  code: string;
  title: string;
  regulatoryBody: 'FINRA' | 'SEC' | 'SEC/FINRA' | 'Internal' | 'GDPR';
  category: 'Communications' | 'Recordkeeping' | 'Disclosures' | 'Privacy' | 'Market Conduct';
  description: string;
  severity: RuleSeverity;
  active: boolean;
  violationCount: number;
  lastTriggered: string;
  detectionMode: 'Semantic ML' | 'Deterministic Regex' | 'Hybrid LLM';
}

export interface SystemHealthMetrics {
  apiLatencyMs: number;
  apiLatencyP95Ms: number;
  apiStatus: 'Optimal' | 'Degraded' | 'Offline';
  databaseStatus: 'Connected' | 'Degraded' | 'Disconnected';
  databaseUptime: number; // 99.99%
  databaseReplicationLagMs: number;
  errorRatePercent: number;
  errorRateThresholdPercent: number;
  throughputReqPerSec: number;
  activeWorkerNodes: number;
}

export type LogLevel = 'Info' | 'Warning' | 'Error' | 'Success';
export type LogSubsystem = 'Auth' | 'RuleEngine' | 'PresidioMasker' | 'IngestionAPI' | 'Database' | 'AuditTrail';

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  subsystem: LogSubsystem;
  level: LogLevel;
  actor: string;
  message: string;
  details?: string;
  traceId: string;
}

export interface FeatureFlag {
  id: string;
  key: 'aiSubstringValidation' | 'presidioPiiMasking' | 'precedentLookup' | 'realtimeWebSocket' | 'strictRegexFallback';
  name: string;
  description: string;
  subsystem: string;
  enabled: boolean;
  latencyImpact: string;
  safetyTier: 'High Security' | 'Core Compliance' | 'Experimental';
}

// -------------------------------------------------------------
// SEED MOCK DATA
// -------------------------------------------------------------

export const INITIAL_METRICS: ExecutiveMetrics = {
  totalReviewed: 148920,
  totalReviewedGrowth: 14.2,
  violationsFlagged: 1428,
  violationsFlaggedChange: -8.6, // decrease in violations is favorable
  passRate: 99.04,
  passRateChange: 0.42,
  avgReviewTimeSec: 1.42,
  avgReviewTimeChangeSec: -0.38, // 0.38s faster
};

export const INITIAL_REVIEW_TRENDS: ReviewTrendPoint[] = [
  { date: 'Oct 01', reviewed: 4200, compliant: 4165, violations: 35 },
  { date: 'Oct 04', reviewed: 4850, compliant: 4802, violations: 48 },
  { date: 'Oct 07', reviewed: 5120, compliant: 5078, violations: 42 },
  { date: 'Oct 10', reviewed: 4980, compliant: 4941, violations: 39 },
  { date: 'Oct 13', reviewed: 5640, compliant: 5590, violations: 50 },
  { date: 'Oct 16', reviewed: 6200, compliant: 6142, violations: 58 },
  { date: 'Oct 19', reviewed: 5900, compliant: 5851, violations: 49 },
  { date: 'Oct 22', reviewed: 6450, compliant: 6405, violations: 45 },
  { date: 'Oct 25', reviewed: 6890, compliant: 6842, violations: 48 },
  { date: 'Oct 27', reviewed: 7120, compliant: 7081, violations: 39 },
];

export const INITIAL_RULE_VIOLATIONS: RuleViolationBreakdown[] = [
  {
    ruleId: 'rule-finra-2210',
    ruleName: 'FINRA-2210: Communications with the Public',
    category: 'Communications',
    violations: 584,
    severity: 'Critical',
    percentage: 40.9,
  },
  {
    ruleId: 'rule-sec-17a4',
    ruleName: 'SEC-17a-4: Electronic Records Preservation',
    category: 'Recordkeeping',
    violations: 392,
    severity: 'High',
    percentage: 27.5,
  },
  {
    ruleId: 'rule-disc-09',
    ruleName: 'DISC-09: Mandatory Risk Disclosures',
    category: 'Disclosures',
    violations: 246,
    severity: 'Medium',
    percentage: 17.2,
  },
  {
    ruleId: 'rule-gdpr-32',
    ruleName: 'GDPR-ART-32: PII Data Safeguard',
    category: 'Privacy',
    violations: 134,
    severity: 'High',
    percentage: 9.4,
  },
  {
    ruleId: 'rule-aml-04',
    ruleName: 'AML-KYC-04: High-Risk Geolocation',
    category: 'Market Conduct',
    violations: 72,
    severity: 'Low',
    percentage: 5.0,
  },
];

export const INITIAL_USERS: EnterpriseUser[] = [
  {
    id: 'usr-001',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@meridian-capital.com',
    role: 'System Administrator',
    department: 'SecOps & Infrastructure',
    status: 'Active',
    documentsReviewed: 14205,
    lastActive: '2 mins ago',
    permissions: {
      manageRules: true,
      approveOverrides: true,
      viewPii: true,
      exportAuditLogs: true,
      manageFeatureFlags: true,
    },
  },
  {
    id: 'usr-002',
    name: 'Marcus Chen, CFA',
    email: 'm.chen@meridian-capital.com',
    role: 'Compliance Officer',
    department: 'Regulatory Affairs',
    status: 'Active',
    documentsReviewed: 28910,
    lastActive: '14 mins ago',
    permissions: {
      manageRules: true,
      approveOverrides: true,
      viewPii: false,
      exportAuditLogs: true,
      manageFeatureFlags: false,
    },
  },
  {
    id: 'usr-003',
    name: 'Elena Rostova',
    email: 'elena.rostova@meridian-capital.com',
    role: 'Senior Auditor',
    department: 'Risk & Audit',
    status: 'Active',
    documentsReviewed: 21450,
    lastActive: '45 mins ago',
    permissions: {
      manageRules: false,
      approveOverrides: true,
      viewPii: true,
      exportAuditLogs: true,
      manageFeatureFlags: false,
    },
  },
  {
    id: 'usr-004',
    name: 'David K. O\'Connor',
    email: 'david.oconnor@meridian-capital.com',
    role: 'Risk Analyst',
    department: 'Equities & Trading',
    status: 'Pending',
    documentsReviewed: 4810,
    lastActive: 'Yesterday',
    permissions: {
      manageRules: false,
      approveOverrides: false,
      viewPii: false,
      exportAuditLogs: false,
      manageFeatureFlags: false,
    },
  },
  {
    id: 'usr-005',
    name: 'Aisha Al-Mansoor',
    email: 'aisha.almansoor@meridian-capital.com',
    role: 'Compliance Officer',
    department: 'Wealth Management',
    status: 'Active',
    documentsReviewed: 19820,
    lastActive: '3 hours ago',
    permissions: {
      manageRules: true,
      approveOverrides: false,
      viewPii: false,
      exportAuditLogs: true,
      manageFeatureFlags: false,
    },
  },
  {
    id: 'usr-006',
    name: 'Benjamin Vance',
    email: 'b.vance@meridian-capital.com',
    role: 'Junior Reviewer',
    department: 'Retail Brokerage',
    status: 'Suspended',
    documentsReviewed: 1204,
    lastActive: '6 days ago',
    permissions: {
      manageRules: false,
      approveOverrides: false,
      viewPii: false,
      exportAuditLogs: false,
      manageFeatureFlags: false,
    },
  },
  {
    id: 'usr-007',
    name: 'Priya Sharma',
    email: 'priya.sharma@meridian-capital.com',
    role: 'Senior Auditor',
    department: 'Global Markets Compliance',
    status: 'Active',
    documentsReviewed: 34190,
    lastActive: '1 hour ago',
    permissions: {
      manageRules: true,
      approveOverrides: true,
      viewPii: true,
      exportAuditLogs: true,
      manageFeatureFlags: false,
    },
  },
  {
    id: 'usr-008',
    name: 'Liam Gallagher',
    email: 'liam.g@meridian-capital.com',
    role: 'Risk Analyst',
    department: 'Fixed Income & Derivatives',
    status: 'Pending',
    documentsReviewed: 2310,
    lastActive: '3 days ago',
    permissions: {
      manageRules: false,
      approveOverrides: false,
      viewPii: false,
      exportAuditLogs: false,
      manageFeatureFlags: false,
    },
  },
];

export const INITIAL_COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'rule-1',
    code: 'FINRA-2210',
    title: 'Communications with the Public & Promissory Claims',
    regulatoryBody: 'FINRA',
    category: 'Communications',
    description: 'Prohibits false, exaggerated, unwarranted, promissory, or misleading statements or claims in public financial communications and client presentations.',
    severity: 'Critical',
    active: true,
    violationCount: 584,
    lastTriggered: '18 mins ago',
    detectionMode: 'Semantic ML',
  },
  {
    id: 'rule-2',
    code: 'SEC-17a-4',
    title: 'Electronic Books and Records Preservation',
    regulatoryBody: 'SEC',
    category: 'Recordkeeping',
    description: 'Mandates preservation of electronic records, correspondence, and transactions in non-rewritable, non-erasable (WORM) format with immediate access audit indexing.',
    severity: 'High',
    active: true,
    violationCount: 392,
    lastTriggered: '1 hour ago',
    detectionMode: 'Hybrid LLM',
  },
  {
    id: 'rule-3',
    code: 'DISC-09',
    title: 'Mandatory Risk & Conflict of Interest Disclosures',
    regulatoryBody: 'SEC/FINRA',
    category: 'Disclosures',
    description: 'Enforces conspicuous inclusion of fee schedules, material conflicts of interest, past performance disclaimers, and investment principal risk warnings.',
    severity: 'Medium',
    active: true,
    violationCount: 246,
    lastTriggered: '3 hours ago',
    detectionMode: 'Deterministic Regex',
  },
  {
    id: 'rule-4',
    code: 'GDPR-ART-32',
    title: 'Security of Processing & PII De-identification',
    regulatoryBody: 'GDPR',
    category: 'Privacy',
    description: 'Ensures personally identifiable information (tax IDs, banking credentials, passport numbers) is scrubbed or encrypted prior to archival distribution.',
    severity: 'High',
    active: true,
    violationCount: 134,
    lastTriggered: '5 hours ago',
    detectionMode: 'Semantic ML',
  },
  {
    id: 'rule-5',
    code: 'AML-KYC-04',
    title: 'Sanctioned Jurisdiction & High-Risk Geotag Screening',
    regulatoryBody: 'Internal',
    category: 'Market Conduct',
    description: 'Flags inbound and outbound trading counterparties originating from OFAC-sanctioned jurisdictions or FATF non-cooperative financial centers.',
    severity: 'Low',
    active: false,
    violationCount: 72,
    lastTriggered: '2 days ago',
    detectionMode: 'Deterministic Regex',
  },
];

export const INITIAL_SYSTEM_HEALTH: SystemHealthMetrics = {
  apiLatencyMs: 38,
  apiLatencyP95Ms: 64,
  apiStatus: 'Optimal',
  databaseStatus: 'Connected',
  databaseUptime: 99.99,
  databaseReplicationLagMs: 0,
  errorRatePercent: 0.012,
  errorRateThresholdPercent: 0.05,
  throughputReqPerSec: 1450,
  activeWorkerNodes: 8,
};

export const INITIAL_ACTIVITY_LOGS: ActivityLogEntry[] = [
  {
    id: 'log-101',
    timestamp: '14:52:10',
    subsystem: 'RuleEngine',
    level: 'Warning',
    actor: 'RuleExecutor-Worker-3',
    message: 'Flagged violation on Doc #DOC-89410 under FINRA-2210 (promissory language in hedge pitch deck).',
    traceId: 'trc-89410-finra',
  },
  {
    id: 'log-102',
    timestamp: '14:50:35',
    subsystem: 'PresidioMasker',
    level: 'Success',
    actor: 'PresidioService-01',
    message: 'Masked 14 SSN patterns and 2 IBAN entries across 8 archived client records.',
    traceId: 'trc-presidio-8819',
  },
  {
    id: 'log-103',
    timestamp: '14:48:12',
    subsystem: 'Auth',
    level: 'Info',
    actor: 'Sarah Jenkins',
    message: 'Administrative session authenticated with MFA from corporate subnet 10.14.2.80.',
    traceId: 'auth-sess-9902',
  },
  {
    id: 'log-104',
    timestamp: '14:45:00',
    subsystem: 'Database',
    level: 'Info',
    actor: 'DB-Health-Probe',
    message: 'WAL replication checkpoint verified across 3 read replicas with 0ms lag.',
    traceId: 'chk-db-pg-cluster',
  },
  {
    id: 'log-105',
    timestamp: '14:41:22',
    subsystem: 'IngestionAPI',
    level: 'Info',
    actor: 'BatchConsumer-Alpha',
    message: 'Ingested 450 documents from Bloomberg Trading Gateway in 182ms.',
    traceId: 'ingest-bbg-450',
  },
  {
    id: 'log-106',
    timestamp: '14:38:14',
    subsystem: 'RuleEngine',
    level: 'Error',
    actor: 'OCR-Preprocessor',
    message: 'Malformed PDF header encountered on Doc #DOC-89392. Falling back to raw text extraction.',
    traceId: 'err-ocr-89392',
  },
  {
    id: 'log-107',
    timestamp: '14:30:05',
    subsystem: 'AuditTrail',
    level: 'Success',
    actor: 'Marcus Chen',
    message: 'Generated Q3 SEC-17a-4 immutable compliance snapshot hash #sha256:e3b0c442...',
    traceId: 'audit-q3-snap',
  },
];

export const INITIAL_FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'flag-1',
    key: 'aiSubstringValidation',
    name: 'AI Substring Validation',
    description: 'Enables contextual semantic validation using fine-tuned LLM embeddings on flagged phrases rather than simple exact-string heuristics.',
    subsystem: 'RuleEngine NLP Core',
    enabled: true,
    latencyImpact: '+18ms per doc',
    safetyTier: 'Core Compliance',
  },
  {
    id: 'flag-2',
    key: 'presidioPiiMasking',
    name: 'Presidio PII Masking',
    description: 'Automates Microsoft Presidio-based redacting of social security numbers, bank routing codes, customer emails, and phone numbers before downstream persistence.',
    subsystem: 'Privacy & Data Protection',
    enabled: true,
    latencyImpact: '+6ms per doc',
    safetyTier: 'High Security',
  },
  {
    id: 'flag-3',
    key: 'precedentLookup',
    name: 'Precedent Lookup',
    description: 'Cross-references flagged passages against a vector database of 12,000+ historical FINRA/SEC enforcement disciplinary actions for contextual risk grading.',
    subsystem: 'Precedent Intelligence Engine',
    enabled: true,
    latencyImpact: '+24ms per doc',
    safetyTier: 'Core Compliance',
  },
  {
    id: 'flag-4',
    key: 'realtimeWebSocket',
    name: 'Real-Time WebSocket Streaming',
    description: 'Broadcasts low-latency document audit progress, violation alerts, and pipeline telemetry directly to connected compliance auditor consoles.',
    subsystem: 'Real-time Gateway',
    enabled: false,
    latencyImpact: 'Zero overhead (Async)',
    safetyTier: 'Experimental',
  },
  {
    id: 'flag-5',
    key: 'strictRegexFallback',
    name: 'Strict Regex Fallback',
    description: 'Automatically shifts inference to deterministic regex rules if ML inference latency exceeds 200ms or when API gateway load spikes above threshold.',
    subsystem: 'Failover Sentinel',
    enabled: true,
    latencyImpact: '-14ms on fallback',
    safetyTier: 'Core Compliance',
  },
];
