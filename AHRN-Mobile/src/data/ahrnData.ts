/** Shared demo data — mirrors apps/web pages and figma/Wireframes.md */

export const home = {
  name: 'Maple Street Home',
  address: '1247 Maple Street, Austin TX',
  hri: 87,
  hriSummary: 'Good — 1 system needs attention',
  alertTitle: 'HVAC compressor degradation detected',
  alertBody: 'AI predicts failure within 21 days — view forecast for details',
};

export const homeHealthScore = {
  score: 87,
  grade: 'Good',
  trend: '+3 pts vs last month',
  summary: 'Overall home reliability is strong. HVAC needs attention this month.',
  factors: [
    { label: 'HVAC', score: 62, colorKey: 'warning' as const },
    { label: 'Plumbing', score: 94, colorKey: 'success' as const },
    { label: 'Electrical', score: 91, colorKey: 'success' as const },
    { label: 'Roof', score: 88, colorKey: 'success' as const },
  ],
};

export const activeAlerts = [
  {
    id: 'ALT-001',
    title: 'HVAC compressor degradation',
    body: 'Vibration and thermal readings exceed baseline — failure risk rising.',
    severity: 'high' as const,
    system: 'HVAC',
    detected: '2 hours ago',
  },
  {
    id: 'ALT-002',
    title: 'Water heater anode wear',
    body: 'Corrosion index at 78% — schedule inspection within 30 days.',
    severity: 'medium' as const,
    system: 'Water Heater',
    detected: 'Yesterday',
  },
  {
    id: 'ALT-003',
    title: 'Smart lock firmware update',
    body: 'Security patch available for front door lock.',
    severity: 'low' as const,
    system: 'Security',
    detected: '3 days ago',
  },
];

export const upcomingRisks = [
  {
    id: 'RSK-101',
    system: 'HVAC compressor',
    riskPct: 72,
    window: 'Within 21 days',
    impact: 'Emergency repair ~$2,400',
    colorKey: 'danger' as const,
  },
  {
    id: 'RSK-102',
    system: 'Water heater tank',
    riskPct: 34,
    window: 'Within 90 days',
    impact: 'Leak prevention service ~$180',
    colorKey: 'warning' as const,
  },
  {
    id: 'RSK-103',
    system: 'Electrical panel',
    riskPct: 12,
    window: 'Within 6 months',
    impact: 'Routine inspection ~$120',
    colorKey: 'success' as const,
  },
];

export const openClaims = [
  {
    id: 'CLM-4821',
    title: 'HVAC compressor repair',
    status: 'In review' as const,
    provider: 'CoolAir Pro',
    filed: 'Jun 10, 2026',
    amount: '$1,240',
    nextStep: 'Awaiting technician evidence upload',
  },
  {
    id: 'CLM-4798',
    title: 'Roof leak mitigation',
    status: 'Approved' as const,
    provider: 'Lone Star Roofing',
    filed: 'May 28, 2026',
    amount: '$890',
    nextStep: 'Payout scheduled Jun 18',
  },
  {
    id: 'CLM-4755',
    title: 'Garage door sensor fault',
    status: 'Action needed' as const,
    provider: 'SafeHome Tech',
    filed: 'May 15, 2026',
    amount: '$210',
    nextStep: 'Upload photo evidence to proceed',
  },
];

export const scheduledMaintenance = [
  {
    id: 'MNT-301',
    task: 'HVAC seasonal tune-up',
    date: 'Jun 22, 2026',
    time: '10:00 AM',
    provider: 'CoolAir Pro',
    status: 'Confirmed' as const,
  },
  {
    id: 'MNT-298',
    task: 'Water heater flush',
    date: 'Jul 05, 2026',
    time: '2:00 PM',
    provider: 'Austin Plumbing Co.',
    status: 'Pending' as const,
  },
  {
    id: 'MNT-295',
    task: 'Electrical panel inspection',
    date: 'Jul 18, 2026',
    time: '9:30 AM',
    provider: 'Texas Electric Services',
    status: 'Confirmed' as const,
  },
];

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
  emergencyCost: 1800,
  recommendedActions: [
    { id: 'act-1', label: 'Schedule Inspection', detail: 'Book a certified HVAC inspection within 7 days' },
    { id: 'act-2', label: 'Monitor System', detail: 'Enable daily vibration + thermal alerts on HVAC' },
    { id: 'act-3', label: 'Request Quotes', detail: 'Compare verified repair warranties from local providers' },
  ],
  costImpact: {
    preventiveRepair: 250,
    potentialFailureCost: 1800,
    potentialSavings: 1550,
  },
};

export type BidWeights = {
  price: number;
  eta: number;
  coverage: number;
  warranty: number;
};

export const defaultBidWeights: BidWeights = {
  price: 30,
  eta: 25,
  coverage: 20,
  warranty: 25,
};

export const bidScoringGuide = {
  summary:
    'Each bid is scored 0–100 using your priority weights. Higher scores mean a better match for what you value most.',
  factors: [
    { key: 'price', label: 'Price', description: 'Lower cost scores higher when price weight is increased.' },
    { key: 'eta', label: 'ETA', description: 'Faster arrival and completion times score higher.' },
    { key: 'coverage', label: 'Coverage', description: 'Service area reach, parts availability, and technician rating.' },
    { key: 'warranty', label: 'Warranty', description: 'Longer verified repair warranty periods score higher.' },
  ],
};

export const aiBidRecommendation = {
  provider: 'CoolFix Services',
  score: 92,
  summary: 'Best combination of cost, ETA and warranty.',
  reasons: [
    'Fastest ETA at 1 hour with 24-month Repair Guarantee',
    'Highest warranty length in the comparison set',
    'Strong sensor-verified outcome history (97% success)',
  ],
};

export const bids = [
  {
    id: '1',
    provider: 'ABC HVAC',
    price: 220,
    eta: '2 hrs',
    etaHours: 2,
    warranty: '12 Months',
    warrantyMonths: 12,
    guaranteeLabel: '12-month Verified Repair Warranty',
    aiScore: 88,
    recommended: false,
    rankFactors: { price: 90, eta: 72, coverage: 86, warranty: 80 },
    whyRanked: 'Competitive price with solid 12-month warranty coverage.',
  },
  {
    id: '2',
    provider: 'CoolFix Services',
    price: 250,
    eta: '1 hr',
    etaHours: 1,
    warranty: '24 Months',
    warrantyMonths: 24,
    guaranteeLabel: '24-month Repair Guarantee',
    aiScore: 92,
    recommended: true,
    rankFactors: { price: 78, eta: 96, coverage: 92, warranty: 98 },
    whyRanked: 'Best balance of speed, warranty length, and verified repair outcomes.',
  },
  {
    id: '3',
    provider: 'FastAir',
    price: 180,
    eta: '4 hrs',
    etaHours: 4,
    warranty: '6 Months',
    warrantyMonths: 6,
    guaranteeLabel: '6-month Verified Repair Warranty',
    aiScore: 78,
    recommended: false,
    rankFactors: { price: 98, eta: 55, coverage: 74, warranty: 62 },
    whyRanked: 'Lowest price, but longer wait time and shorter warranty period.',
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
