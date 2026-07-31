import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ADMIN_NAV } from '@/constants/navigation';
import { Icon } from '@/components/ui/Icon';

const ADMIN_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDfgquZ9SI2DaZYHqOJFfwkWk52Ch9r0bMcKRCIUOH1neVRkb15cTivIqgNEh9WKv4AuEJ5w0y6A0p8Mg5L9wuggPyd6oHWig4lJ30H1UKEjE7wkgtjPm4sXtZnMnL5lNYqPkUovCaRBc6NJLJd8R0DENXdMdOcyj5v1J5RMNUcrku_mvEETiZU1pzoPLkUAVctaRoFc-M8HYyd5MKx08lBgtWZNo9ZQth56CQzPkjPzjIGbs0WlUz8hQ';

const KPIS = [
  { icon: 'group', tone: 'bg-primary-fixed text-primary', delta: '+12.5%', label: 'Total Patients', value: '42,892', color: '#004ac6' },
  { icon: 'medical_information', tone: 'bg-secondary-fixed text-secondary', delta: '+3.2%', label: 'Active Doctors', value: '1,240', color: '#006b5f' },
  { icon: 'description', tone: 'bg-tertiary-fixed text-tertiary', delta: '+24%', label: 'Reports Processed', value: '184,302', color: '#6a1edb' },
  { icon: 'trending_up', tone: 'bg-primary-container text-white', delta: 'Optimal', label: 'Platform Growth', value: '89.4%', color: '#004ac6' },
];

const SPARKS = [
  [12, 8, 15, 10, 18, 14, 20, 16, 22],
  [20, 16, 18, 14, 17, 13, 16, 12, 15],
  [10, 14, 12, 18, 16, 22, 20, 26, 24],
  [18, 20, 16, 22, 19, 24, 21, 25, 23],
];

const VERIFICATIONS = [
  {
    name: 'Dr. Marcus Thorne',
    meta: 'Cardiology • St. Jude Medical Center',
    tags: ['MD Licensed', 'Board Certified'],
    flagged: false,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEdnj_BKBYLmgv5DpqOyRx_1w-rhbNdXwL457m0ArpQpw6nf0j8C0yk8IlZJj1Xqw9VmgKBrTsr0S1gMFY9m_gvI9cACUKxrtEBtC0NytZ-XOXY0DjhR7g-eXRTVY_AOy4M_CCrSh6MD0M4Ih5xXmR-afIgCE-YoxKs7wWObBO2BDJJGPUpaTKIucSvUPCWGZXh9FtbwGGN7ppGDOZt3S4kdkzCo6oEQssyJBKLk_qEiWmoKxqqCBrdw',
  },
  {
    name: 'Dr. Sarah Lora',
    meta: 'Radiology • City General Clinic',
    tags: ['MD Licensed', 'ID Flagged'],
    flagged: true,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUMBiQd7Sn0oh2vWQrDce4DP7CiD1wepRyPgYQvamUpmaiOiAelOHgkSpf5E8I8yHIVeGJiODZODnITwUqrH3ZMsRvcm4P_-46nJy2lWSX2xt5Fhk_qlebijkNxP8Y2yoYm0wUolwbHEtuDbOb4apFjIdiObKxT2QQc_ZScw6X5duZO73utbh3RGnsLA5gHkj-fP5V65b0J369_PFYm8RgttarAfmAHgYFKPAOQ-UXKsZxJAvEezQXBA',
  },
  {
    name: 'Dr. David Chen',
    meta: 'Oncology • Northview Health',
    tags: ['MD Licensed', 'Specialist'],
    flagged: false,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjmjzFow6-Gw7TaYIkbBtRPpX-HXMZiE4jM-68xijPWrq0xLaJ1sIfBvp1ejjQdfbHm6o8c4EgPeZD-O1Jp6xcRSUMqfs-P9g2rK0y7yxiEWNTwIvtAHyswXB6P0nNAmyfROLZPV6s1LvU63L9hyEqEwzAhs-IzCIuPwgGjlOrJCfjzMpCK_EIsTjRZ_qXs-rMEnQ3nh4ghvon-swOYz1rLwlzB52K9gluTUFk7SD-j5cVND0XWWk5w',
  },
];

const ACTIVITIES = [
  { icon: 'check_circle', tone: 'bg-secondary-fixed text-secondary', title: 'New Doctor Verified', body: 'Dr. Elena Rodriguez completed verification.', ago: '2 minutes ago' },
  { icon: 'warning', tone: 'bg-error-container text-error', title: 'Failed Login Attempt', body: 'Multiple failed attempts from IP 192.168.1.45 (Unknown Location)', ago: '15 minutes ago', alert: true },
  { icon: 'sync', tone: 'bg-primary-fixed text-primary', title: 'Model Update', body: 'AI Diagnostic Model v4.2 successfully deployed.', ago: '1 hour ago' },
  { icon: 'info', tone: 'bg-surface-variant text-on-surface-variant', title: 'Weekly Report', body: 'System performance report generated for stakeholders.', ago: '3 hours ago' },
];

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const step = 100 / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${100 - (p / max) * 100}`)
    .join(' ');
  return (
    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout active="dashboard" nav={ADMIN_NAV} userName="Dr. Julianne Smith" userTitle="Chief Admin" avatarSrc={ADMIN_AVATAR}>
      <div className="p-container-padding space-y-10 max-w-[1440px]">
        <section className="flex justify-between items-end">
          <div>
            <h2 className="font-display-lg text-primary mb-1">Analytics Dashboard</h2>
            <p className="text-on-surface-variant font-body-lg">Platform performance and clinical intake oversight.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-outline-variant text-on-surface px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-surface-container transition-colors shadow-sm">
              <Icon name="calendar_today" className="text-[20px]" /> Last 30 Days
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              <Icon name="download" className="text-[20px]" /> Export PDF
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KPIS.map((kpi, i) => (
            <div key={kpi.label} className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30 flex flex-col hover:-translate-y-1 transition-transform cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg ${kpi.tone} flex items-center justify-center`}>
                  <Icon name={kpi.icon} />
                </div>
                <span className="text-secondary font-bold text-xs bg-secondary-fixed/30 px-2 py-1 rounded">{kpi.delta}</span>
              </div>
              <p className="text-on-surface-variant font-label-md uppercase mb-1">{kpi.label}</p>
              <h3 className="font-headline-lg text-on-surface">{kpi.value}</h3>
              <div className="mt-4 h-10 w-full overflow-hidden">
                <Sparkline points={SPARKS[i]} color={kpi.color} />
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 p-card-padding overflow-hidden relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="font-headline-md text-on-surface">Platform Growth Analytics</h4>
              <p className="text-on-surface-variant text-sm">User registrations vs. Clinical report generation over time.</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm font-medium">Registrations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm font-medium">Clinical Reports</span>
              </div>
            </div>
          </div>
          <div className="w-full h-[400px] relative">
            <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
              {[350, 275, 200, 125, 50].map((y) => (
                <line key={y} stroke="#f1f5f9" strokeWidth="1" x1="0" x2="1000" y1={y} y2={y} />
              ))}
              <defs>
                <linearGradient id="grad-primary" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#004ac6', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: '#004ac6', stopOpacity: 0 }} />
                </linearGradient>
                <linearGradient id="grad-secondary" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#006b5f', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: '#006b5f', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d="M0 350 L0 300 Q 150 280, 300 150 T 600 100 T 1000 50 L 1000 350 Z" fill="url(#grad-primary)" />
              <path d="M0 300 Q 150 280, 300 150 T 600 100 T 1000 50" fill="none" stroke="#004ac6" strokeLinecap="round" strokeWidth="4" />
              <path d="M0 350 L0 330 Q 200 320, 400 250 T 700 150 T 1000 100 L 1000 350 Z" fill="url(#grad-secondary)" />
              <path d="M0 330 Q 200 320, 400 250 T 700 150 T 1000 100" fill="none" stroke="#006b5f" strokeDasharray="8,4" strokeLinecap="round" strokeWidth="4" />
            </svg>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 glass-card p-4 rounded-xl shadow-xl ai-glow border border-primary/20 pointer-events-none">
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">Week of Oct 14 - 21</p>
              <div className="space-y-2">
                <div className="flex justify-between gap-8">
                  <span className="text-sm font-medium">Registrations:</span>
                  <span className="text-sm font-bold text-primary">1,402</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-sm font-medium">Reports:</span>
                  <span className="text-sm font-bold text-secondary">3,894</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <h4 className="font-headline-md text-on-surface">Verification Queue</h4>
              <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold">14 Pending</span>
            </div>
            <div className="p-6 space-y-4">
              {VERIFICATIONS.map((v) => (
                <div key={v.name} className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center gap-4">
                    <img className="w-12 h-12 rounded-lg object-cover" alt={v.name} src={v.avatar} />
                    <div>
                      <h5 className="font-bold text-on-surface">{v.name}</h5>
                      <p className="text-xs text-on-surface-variant">{v.meta}</p>
                      <div className="flex gap-2 mt-1">
                        {v.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                              tag === 'ID Flagged' ? 'bg-error-container text-on-error-container' : 'bg-surface-variant text-on-surface-variant'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {v.flagged ? (
                    <button className="bg-white border border-outline text-on-surface px-4 py-2 rounded-lg font-bold text-sm hover:bg-surface-container transition-colors">
                      Review ID
                    </button>
                  ) : (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all">
                        <Icon name="close" className="text-[18px]" />
                      </button>
                      <button className="bg-secondary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-secondary/90 shadow-sm">
                        Verify Account
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-auto p-4 border-t border-outline-variant/30 text-center">
              <button className="text-primary font-bold text-sm hover:underline">View All 14 Pending Requests</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col h-full">
            <div className="p-6 border-b border-outline-variant/30">
              <h4 className="font-headline-md text-on-surface">System Activities</h4>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {ACTIVITIES.map((log, i) => (
                <div key={log.title} className="flex gap-4 relative">
                  {i < ACTIVITIES.length - 1 && <div className="absolute left-3.5 top-8 bottom-0 w-[1px] bg-outline-variant/30" />}
                  <div className={`w-7 h-7 rounded-full ${log.tone} flex items-center justify-center z-10`}>
                    <Icon name={log.icon} className="text-[16px]" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${log.alert ? 'text-error' : ''}`}>{log.title}</p>
                    <p className="text-xs text-on-surface-variant mb-1">{log.body}</p>
                    <p className="text-[10px] text-on-surface-variant opacity-60">{log.ago}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="py-10 px-container-padding flex justify-between items-center text-on-surface-variant opacity-50 border-t border-outline-variant/30">
        <p className="text-xs">© 2024 HealthSphere AI Enterprise. All clinical data encrypted via AES-256.</p>
        <div className="flex gap-6">
          {['Privacy Protocol', 'System Status', 'API Docs'].map((l) => (
            <a key={l} className="text-xs hover:text-primary transition-colors" href="#">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </DashboardLayout>
  );
}
