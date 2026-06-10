/** Shared demo data — mirrors apps/web pages and figma/Wireframes.md */

export const home = {
  name: 'Maple Street Home',
  address: '1247 Maple Street, Austin TX',
  hri: 87,
  hriSummary: 'Good — 1 system needs attention',
  alertTitle: 'HVAC compressor degradation detected',
  alertBody: 'AI predicts failure within 21 days — view forecast for details',
};

export const systems = [
  { name: 'HVAC', status: 'At Risk', risk: 'Failure in 21 days', colorKey: 'warning' as const },
  { name: 'Water Heater', status: 'Healthy', risk: 'No issues detected', colorKey: 'success' as const },
  { name: 'Electrical Panel', status: 'Healthy', risk: 'Last inspected 45 days ago', colorKey: 'success' as const },
];

export const roleCoverage = [
  { role: 'Homeowner', capability: 'Forecasts, bids, repair tracking', screen: 'Forecast' as const },
  { role: 'Technician', capability: 'Opportunity feed, bid submission, evidence requirements', screen: 'Technician' as const },
  { role: 'Admin', capability: 'Operations, disputes, compliance readiness', screen: 'Admin' as const },
  { role: 'Super Admin', capability: 'Tenants, policies, model controls, kill switch', screen: 'SuperAdmin' as const },
];

export const riskData = [
  { day: 0, risk: 12 },
  { day: 7, risk: 18 },
  { day: 14, risk: 35 },
  { day: 21, risk: 72 },
  { day: 28, risk: 91 },
  { day: 35, risk: 98 },
];

export const forecastAi = {
  explanation:
    'Vibration patterns and thermal readings indicate compressor bearing wear. Historical data from 2,400 similar units shows 72% failure probability within 21 days without intervention.',
  model: 'LLaMA Reliability v2.1',
  confidence: '94%',
  emergencyCost: 2400,
};

export const bids = [
  {
    id: '1',
    provider: 'CoolAir Pro',
    outcome: '12 months stability guarantee',
    pof: '98%',
    eta: '2 days',
    price: 120,
    recommended: true,
  },
  {
    id: '2',
    provider: 'Texas HVAC Solutions',
    outcome: '6 months stability guarantee',
    pof: '91%',
    eta: '1 day',
    price: 95,
    recommended: false,
  },
  {
    id: '3',
    provider: 'Reliable Comfort Co.',
    outcome: '9 months stability guarantee',
    pof: '94%',
    eta: '3 days',
    price: 110,
    recommended: false,
  },
];

export const job = {
  id: 'AHRN-2847',
  title: 'HVAC Compressor Repair — CoolAir Pro',
  slaRemaining: '4h 22m',
  sensorStatus: 'Pending verification',
  steps: [
    { label: 'Bid Accepted', status: 'done' as const, time: 'Mon 9:00 AM' },
    { label: 'Technician Assigned', status: 'done' as const, time: 'Mon 9:15 AM' },
    { label: 'On Site', status: 'active' as const, time: 'Mon 11:30 AM' },
    { label: 'Repair Complete', status: 'pending' as const, time: 'Est. Mon 2:00 PM' },
    { label: 'Sensor Verification', status: 'pending' as const, time: 'Est. Mon 2:30 PM' },
    { label: 'Evidence Locked', status: 'pending' as const, time: 'Est. Mon 2:35 PM' },
  ],
  evidence: [
    { label: 'Technician photo', value: 'Required before closeout' },
    { label: 'Sensor packet', value: 'Vibration + thermal sample' },
    { label: 'Chain hash', value: 'SHA-256 pending' },
    { label: 'Audit event', value: 'JOB_EVIDENCE_SUBMITTED' },
  ],
};

export const adminKpis = [
  { label: 'Cost Avoided', value: '$847K', change: '+12% this month', colorKey: 'success' as const },
  { label: 'Prediction Accuracy', value: '94.2%', change: '+1.8% vs last month', colorKey: 'accent' as const },
  { label: 'Active Jobs', value: '1,284', change: '342 in progress', colorKey: 'warning' as const },
  { label: 'PoF Success Rate', value: '97.1%', change: 'Outcome guarantees met', colorKey: 'success' as const },
];

export const accuracyTrend = [88, 90, 91, 92, 93, 94];
export const accuracyMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const pofOutcomes = [
  { label: 'Guarantees fulfilled', pct: 97, colorKey: 'success' as const },
  { label: 'Early interventions', pct: 82, colorKey: 'accent' as const },
  { label: 'Emergency failures prevented', pct: 76, colorKey: 'warning' as const },
];

export const adminDisputes = [
  { id: 'DSP-1024', issue: 'Homeowner challenged Proof-of-Fix result', owner: 'Ops Review', sla: '2h 12m' },
  { id: 'DSP-1025', issue: 'Technician evidence missing thermal sample', owner: 'Compliance', sla: '5h 40m' },
  { id: 'DSP-1026', issue: 'Sensor packet timestamp mismatch', owner: 'Audit Desk', sla: '1d 3h' },
];

export const adminComplianceChecks = [
  { label: 'SOC2 access control', status: 'Mapped to RBAC + audit logs' },
  { label: 'PII redaction', status: 'Enabled for AI prompts and responses' },
  { label: 'Availability target', status: '99.9% target tracked by ops dashboard' },
  { label: 'API latency', status: 'p95 target: under 300ms' },
];

export const technicianFilters = [
  { label: 'Device filter', value: 'HVAC, water, electrical' },
  { label: 'Distance filter', value: 'Within 15 miles' },
  { label: 'Minimum confidence', value: '85%+ forecast confidence' },
  { label: 'Evidence required', value: 'Photo + sensor packet' },
];

export const technicianOpportunities = [
  {
    id: 'AHRN-2847',
    system: 'HVAC compressor',
    distance: '4.2 mi',
    window: 'Today, 11:30 AM - 2:30 PM',
    confidence: '94%',
    outcome: '12-month stability guarantee',
    bidRange: '$95 - $140',
  },
  {
    id: 'AHRN-2851',
    system: 'Water heater anode rod',
    distance: '7.8 mi',
    window: 'Tomorrow, 9:00 AM - 12:00 PM',
    confidence: '88%',
    outcome: '9-month leak prevention',
    bidRange: '$70 - $115',
  },
  {
    id: 'AHRN-2860',
    system: 'Electrical breaker heat signature',
    distance: '12.4 mi',
    window: 'Friday, 1:00 PM - 5:00 PM',
    confidence: '91%',
    outcome: 'Verified safe-load operation',
    bidRange: '$130 - $210',
  },
];

export const superAdminTenants = [
  { name: 'Lone Star Homes', region: 'Texas', policy: 'Standard PoF', users: 12408, status: 'Active' as const },
  { name: 'Pacific Property Group', region: 'California', policy: 'Strict Evidence', users: 8712, status: 'Active' as const },
  { name: 'Northeast Managed Homes', region: 'New York', policy: 'Human Review', users: 6541, status: 'Review' as const },
];

export const superAdminPolicies = [
  'No autonomous financial decisions',
  'Human approval required for disputed outcomes',
  'PII-redacted explainability logs retained for 365 days',
  'AI failures fall back to rules-only reliability scoring',
];

export const modelVersions = [
  'LLaMA Reliability v2.1',
  'LLaMA Reliability v2.0',
  'Rules-only fallback v1.4',
];

export const footerDisclaimer =
  'AHRN is a predictive reliability platform. It does not provide insurance or indemnification.';
