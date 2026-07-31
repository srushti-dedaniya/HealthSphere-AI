import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DOCTOR_NAV } from '@/constants/navigation';
import { Icon } from '@/components/ui/Icon';

const DOCTOR_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD1RoDDXft1Ra1NirCUbOaS4f5POIXus8XOal-pcqZRCrzfBK3EXKq5YGD9dLi1kjJdXqcU8GttOQA9r5BiJItS5igJOfrnxtb7QdYYQLKOs2DBEG5dydPb51HpjBvhJe9UtBAcNqs0D6qYZjdHEjNsCAz8BBhr-Z3b6mxqvszPerjLo5ZeSn8L7dl8zZN-4_HrAyOlS5NXiZRNDRVNOGmEaLYtOuDFvkNO1mCmqScMFlNXu_vj4GabzQ';

const QUEUE = [
  {
    name: 'Robert Chen',
    reason: 'Post-Op Checkup',
    status: 'In Room 4',
    wait: 'Wait: 12m',
    active: true,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMnPkIEb8p1CMK-W0Wevb-mtEs1pjGXinkXuqT43yF-H1oARsdQF8Y09Da6BFWDFLVVhjmKbOeFRHPSrxroa0BrZIElUaShRNb6Gbx8ZEOnI-s0UDc5JBJ8ChN2_6JP4ZRiC-u1j4WvlHE1LvUzz4VatkSD2aT1FQKM4NoSvlGv7f0d7Iyw2zo0NTAEdGtDBxFZZ9pov-7Vp8zXbki7tGwneXULazLBha88NOH-FdsGVvyY_sNLBJ-fw',
  },
  {
    name: 'Sarah Jenkins',
    reason: 'Chronic Migraine',
    status: 'Ready',
    wait: 'Wait: 4m',
    active: false,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMLDzyIZbR5-LunZ-s2tTt_OfPAY8G_ASea3sUyBV97tFfYeJF1fojjsJ2iRqoRXGrS2JmxqrxTAOq9oaFpR3jKIKyCMjd-jAslJzYAVth6qc43cOtkZqNIMgmtJ0D7bribjdwHB0PYKehjPS0Mx4Ov8tnKa3dtavXQVgdKvZtreM0v5YLtMKgHFYCxEPX--s4LOolAQBjX7kx_Hsufx7W9wk2nDbZFIQimoL9wcj29X9bDw56d_Y4EQ',
  },
  {
    name: 'Michael Scott',
    reason: 'Routine Bloodwork',
    status: '10:45 AM',
    active: false,
    noAvatar: true,
  },
];

const TIMELINE = [
  {
    time: '09:00 AM — Ongoing',
    title: 'Robert Chen - Post-Op Review',
    badges: ['AI', 'RN'],
    current: true,
  },
  { time: '10:15 AM', title: 'Sarah Jenkins - Migraine Follow-up', tag: 'TELEHEALTH' },
  { time: '11:00 AM', title: 'Elena Rodriguez - Diabetes Management', tag: 'Priority', error: true },
];

const REPORTS = [
  {
    icon: 'warning',
    tone: 'error',
    title: 'Comprehensive Metabolic Panel',
    ago: '2H AGO',
    patient: 'Patient: Marcus Aurelius (ID: 8829-X)',
    badge: 'Elevated Glucose - 128 mg/dL',
    sub: 'Abnormal',
  },
  {
    icon: 'check_circle',
    tone: 'secondary',
    title: 'Lipid Profile Results',
    ago: '5H AGO',
    patient: 'Patient: Linda Wu (ID: 1024-C)',
    badge: 'All values within target range',
  },
];

const STATS = [
  { icon: 'speed', tone: 'text-primary bg-primary-container/10', delta: '+12%', label: 'Throughput', value: '24', unit: '/day' },
  { icon: 'health_and_safety', tone: 'text-secondary bg-secondary/10', delta: '+5%', label: 'Recovery Rate', value: '94.2%' },
  { icon: 'history_edu', tone: 'text-tertiary bg-tertiary-container/10', delta: '8 Pending', deltaTone: 'text-error', label: 'Open Reports', value: '14' },
];

export default function DoctorDashboard() {
  return (
    <DashboardLayout active="dashboard" nav={DOCTOR_NAV} userName="Dr. Julianne Smith" userTitle="Chief Hematologist" avatarSrc={DOCTOR_AVATAR}>
      <div className="max-w-[1440px] mx-auto p-gutter space-y-gutter pb-section-gap">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Welcome back, Dr. Smith</h2>
            <p className="text-body-lg text-on-surface-variant">You have 8 appointments today. 3 patients are currently waiting.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-surface-container-lowest border border-outline-variant px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-low transition-colors">
              <Icon name="calendar_today" /> Calendar View
            </button>
            <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Icon name="videocam" /> Join Next Call
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-gutter">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass p-6 rounded-3xl card-lift flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className={`material-symbols-outlined p-2 ${stat.tone} rounded-lg`}>{stat.icon}</span>
                  <span className={`${stat.deltaTone ?? 'text-secondary'} font-bold text-xs`}>{stat.delta}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-on-surface-variant font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold">
                    {stat.value} {stat.unit && <span className="text-sm font-normal text-on-surface-variant">{stat.unit}</span>}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-12 lg:col-span-4 row-span-3">
            <div className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 h-full overflow-hidden flex flex-col">
              <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                <h3 className="font-bold text-lg">Patient Queue</h3>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-xs font-bold">3 ACTIVE</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {QUEUE.map((q) => (
                  <div
                    key={q.name}
                    className={`p-4 rounded-2xl transition-all cursor-pointer group ${
                      q.active
                        ? 'bg-surface-container-low border border-transparent hover:border-primary/20'
                        : 'bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/20'
                    } ${q.noAvatar ? 'opacity-60' : ''}`}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative">
                        {q.noAvatar ? (
                          <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center">
                            <Icon name="person" className="text-on-surface-variant" />
                          </div>
                        ) : (
                          <img className="w-12 h-12 rounded-xl object-cover" alt={q.name} src={q.avatar} />
                        )}
                        {q.active && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-surface-container-low" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{q.name}</p>
                        <p className="text-xs text-on-surface-variant">{q.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-bold ${q.active ? 'text-primary' : 'text-on-surface-variant'}`}>{q.status}</p>
                        {q.wait && <p className="text-[10px] text-on-surface-variant uppercase">Wait: {q.wait.split(': ')[1]}</p>}
                      </div>
                    </div>
                    {q.active && (
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors">Start Consult</button>
                        <button className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                          <Icon name="more_horiz" className="text-sm" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 bg-surface-container-low border-t border-outline-variant/20">
                <button className="w-full py-3 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
                  <Icon name="visibility" /> View Full Schedule
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-xl">Today's Timeline</h3>
                <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
                  <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold">List</button>
                  <button className="px-3 py-1 text-xs font-bold text-on-surface-variant">Timeline</button>
                </div>
              </div>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/20">
                {TIMELINE.map((item) => (
                  <div key={item.title} className="relative pl-10">
                    <div
                      className={`absolute left-0 top-1.5 w-6 h-6 rounded-full ring-4 ring-white flex items-center justify-center ${
                        item.current ? 'bg-primary-container' : 'bg-outline-variant/30'
                      }`}
                    >
                      {item.current && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">{item.time}</span>
                        <h4 className="font-bold text-base mt-1">{item.title}</h4>
                      </div>
                      {item.badges ? (
                        <div className="flex -space-x-2">
                          {item.badges.map((b) => (
                            <div
                              key={b}
                              className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${
                                b === 'AI' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-tertiary-fixed text-on-tertiary-fixed'
                              }`}
                            >
                              {b}
                            </div>
                          ))}
                        </div>
                      ) : item.tag ? (
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                            item.error ? 'bg-error/10 text-error uppercase tracking-tight' : 'bg-surface-container-high uppercase'
                          }`}
                        >
                          {item.tag}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 overflow-hidden">
              <div className="p-8 border-b border-outline-variant/20 flex justify-between items-center bg-surface-bright">
                <div>
                  <h3 className="font-bold text-xl">Newly Uploaded Reports</h3>
                  <p className="text-sm text-on-surface-variant">AI-Assisted anomaly detection enabled</p>
                </div>
                <button className="text-primary font-bold text-sm">View All Reports</button>
              </div>
              <div className="divide-y divide-outline-variant/20">
                {REPORTS.map((report) => (
                  <div key={report.title} className="p-6 hover:bg-surface-container-low transition-colors cursor-pointer flex gap-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        report.tone === 'error' ? 'bg-error/10 text-error' : 'bg-secondary/10 text-secondary'
                      }`}
                    >
                      <Icon name={report.icon} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-base">{report.title}</h4>
                        <span className="text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">{report.ago}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-3">{report.patient}</p>
                      <div className="flex gap-4">
                        <div
                          className={`px-3 py-2 rounded-lg flex items-center gap-3 ${
                            report.sub ? 'bg-error-container/20 border border-error/20' : 'bg-surface-container-low'
                          }`}
                        >
                          <span className={`font-bold text-sm ${report.sub ? 'text-error' : 'text-on-surface-variant'}`}>{report.badge}</span>
                          {report.sub && (
                            <span className="text-[10px] bg-error text-white px-1.5 rounded uppercase font-bold">{report.sub}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <button className="bg-surface-container-high p-2 rounded-full hover:bg-primary hover:text-white transition-all">
                        <Icon name="chevron_right" className="text-base" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="bg-surface-container-lowest rounded-[32px] border border-outline-variant/30 p-8 flex flex-col h-full">
              <h3 className="font-bold text-xl mb-6">Clinic Performance</h3>
              <div className="flex-1 flex flex-col justify-between">
                <div className="relative w-full h-48 bg-surface-container-low rounded-2xl overflow-hidden mb-6 flex items-end px-4 py-2 gap-2">
                  {[70, 85, 60, 90, 75, 95].map((fill, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group" style={{ height: `${fill}%` }}>
                      <div className="absolute inset-x-0 bottom-0 bg-primary rounded-t-lg transition-all group-hover:h-full" style={{ height: `${fill}%` }} />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">Patient Outcomes</span>
                    <span className="font-bold text-secondary">+2.4% MoM</span>
                  </div>
                  <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[82%]" />
                  </div>
                  <div className="flex justify-between items-center text-sm mt-4">
                    <span className="text-on-surface-variant">Avg. Consultation Time</span>
                    <span className="font-bold text-primary">18.5 min</span>
                  </div>
                  <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[65%]" />
                  </div>
                </div>
              </div>
              <button className="mt-8 py-3 border border-outline-variant/30 rounded-xl text-sm font-bold hover:bg-surface-container-low transition-colors">
                Deep Dive Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button className="w-14 h-14 bg-surface-container-lowest shadow-xl border border-outline-variant/30 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-110 active:scale-95" title="Write Prescription">
          <Icon name="prescriptions" />
        </button>
        <button className="w-14 h-14 bg-surface-container-lowest shadow-xl border border-outline-variant/30 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:scale-110 active:scale-95" title="View Records">
          <Icon name="folder_shared" />
        </button>
      </div>
    </DashboardLayout>
  );
}
