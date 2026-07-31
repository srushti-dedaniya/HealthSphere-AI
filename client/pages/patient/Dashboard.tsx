import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PATIENT_NAV } from '@/constants/navigation';
import { Icon } from '@/components/ui/Icon';

const DOCTOR_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkHmMI8w2ukJGkO4YFQMDm1Kk5rYkwoY-yGcVrhza5Dh1t3S6MYiAQKWCiJZaoO9k1Z9OmVMyCfTBsMNR-7eZS6WpWJvwnF7UFUcRAtZpQ6PnkoHw-Wnj-GY5-_RLieiRePikC1in5whJXxP3vvN0crvF38ziCIUU636ixASCjKOs7wSFg6ATI9HXUDuur5rDE5rSf-xGvGo3PQD-UvAJgRq9aDz55KnSpgWZt2Moy70UILF7SnJO3aw';

const CARDIOLOGIST =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDEN_1xkwWMz38ydkJAGkpdQzcD9hSjGkHIGn3d73FragGFDrTjEpzJX8IQZ-XPNYHtqdGHPhvb3wvi-CiqRkYr6InKJ8_eBhSYBjLf0RxEjNfiqUubKPlqCqYTLP4GcGY5nYyFymGM8fKBey7-zUSSknkfOakkcZ1z68Zm64ksphBQBy5MaNv7WotZpltYZ4EvefKND2cVfdmttbuSv0SEaXz27c_pihjtWBkzWOy7iY_t4HT35WwO7Q';

const MEDS = [
  { time: '08:00 AM', name: 'Lisinopril', dose: '10mg • Taken', done: true },
  { time: '12:30 PM', name: 'Metformin', dose: '500mg • Upcoming', active: true },
  { time: '08:00 PM', name: 'Atorvastatin', dose: '20mg • Evening', faded: true },
];

const REPORTS_ROWS = [
  ['Blood Chemistry Analysis', 'Oct 24, 2023', 'Normal Ranges', 'secondary'],
  ['Thyroid Panel (TSH)', 'Oct 12, 2023', 'Requires Review', 'tertiary'],
  ['Cardiology Stress Test', 'Sep 28, 2023', 'Excellent Recovery', 'secondary'],
] as const;

const BAR_H = [60, 45, 75, 50, 65, 85, 40];

export default function PatientDashboard() {
  return (
    <DashboardLayout active="dashboard" nav={PATIENT_NAV} userName="Dr. Julianne Smith" userTitle="Oncology Lead" avatarSrc={DOCTOR_AVATAR} ctaLabel="New Analysis">
      <div className="p-gutter max-w-[1440px] mx-auto">
        <section className="mb-section-gap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display-lg text-display-lg text-on-surface">Good morning, Alex</h2>
              <div className="flex items-center gap-3 mt-2 text-primary">
                <Icon name="lightbulb" />
                <p className="font-body-md italic text-on-surface-variant">
                  Pro tip: Your resting heart rate has improved by 4% this week. Keep up the morning walks!
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-surface-container-high rounded-full font-label-md text-on-surface-variant">
                Last Update: 10m ago
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-label-md flex items-center gap-1">
                <Icon name="check_circle" className="text-sm" /> System Sync Active
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-8 space-y-gutter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30 flex flex-col items-center justify-center text-center">
                <p className="font-label-md text-on-surface-variant uppercase mb-4 tracking-widest">Health Score</p>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="8" />
                    <circle
                      className="text-secondary transition-all duration-1000"
                      cx="64"
                      cy="64"
                      fill="transparent"
                      r="56"
                      stroke="currentColor"
                      strokeDasharray="351.8"
                      strokeDashoffset="52.7"
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-lg text-headline-lg text-on-surface">85</span>
                    <span className="font-label-md text-on-surface-variant">/100</span>
                  </div>
                </div>
                <p className="mt-4 font-body-sm text-secondary font-bold">+2 pts from last month</p>
              </div>

              <div className="col-span-1 md:col-span-2 bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30 relative overflow-hidden ai-glow group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-tertiary/10 transition-colors" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 bg-tertiary/10 rounded-xl text-tertiary">
                    <Icon name="psychology" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">AI Health Insight</h3>
                    <p className="mt-2 text-on-surface-variant leading-relaxed">
                      Your glucose levels show a consistent pattern of stabilization after high-protein
                      breakfasts. We recommend maintaining this dietary rhythm to further optimize your
                      metabolic score.
                    </p>
                    <button className="mt-4 text-tertiary font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      View full analysis <Icon name="arrow_forward" className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">Medicine Reminder</h3>
                <button className="text-primary font-bold text-sm">Manage Prescriptions</button>
              </div>
              <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {MEDS.map((med) => (
                  <div
                    key={med.name}
                    className={`flex-shrink-0 w-48 p-4 rounded-xl border-l-4 ${
                      med.active
                        ? 'border-primary bg-primary-container/5 ring-1 ring-primary/20'
                        : 'border-secondary bg-surface-container-low'
                    } ${med.faded ? 'border-outline-variant opacity-60' : ''}`}
                  >
                    <p className={`text-[10px] font-bold uppercase mb-1 ${med.active ? 'text-primary' : 'text-on-surface-variant'}`}>{med.time}</p>
                    <p className="font-bold text-on-surface">{med.name}</p>
                    <p className="text-xs text-on-surface-variant">{med.dose}</p>
                  </div>
                ))}
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center text-outline-variant cursor-pointer hover:border-primary hover:text-primary transition-colors">
                  <Icon name="add" />
                </div>
              </div>
            </div>

            <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Health Statistics</h3>
                  <p className="text-body-sm text-on-surface-variant">Weekly glucose & metabolic trends</p>
                </div>
                <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
                  <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold">Week</button>
                  <button className="px-3 py-1 text-on-surface-variant text-xs font-bold hover:bg-white transition-colors">Month</button>
                </div>
              </div>
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-end justify-between px-2">
                  {BAR_H.map((h, i) => (
                    <div
                      key={i}
                      className={`w-[12%] rounded-t-lg transition-all ${
                        i === 5 ? 'bg-primary/20 hover:bg-primary/30 border-t-4 border-primary' : 'bg-primary/10 hover:bg-primary/20'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <path className="opacity-40" d="M 0 180 Q 200 80, 400 150 T 800 100 T 1200 120" fill="none" stroke="#004ac6" strokeWidth="4" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">Recent Reports</h3>
                <button className="text-primary font-bold text-sm flex items-center gap-1">
                  View Archive <Icon name="history" className="text-sm" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-outline-variant/30 text-on-surface-variant font-label-md uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="pb-4 font-bold">Report Name</th>
                      <th className="pb-4 font-bold">Date</th>
                      <th className="pb-4 font-bold">AI Summary</th>
                      <th className="pb-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-body-sm">
                    {REPORTS_ROWS.map(([name, date, summary, tone]) => (
                      <tr key={name} className="group hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-4 font-bold text-on-surface">{name}</td>
                        <td className="py-4 text-on-surface-variant">{date}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${tone === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'}`}>
                            {summary}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary/10 text-primary transition-colors">
                            <Icon name="download" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-gutter">
            <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">October 2023</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
                    <Icon name="chevron_left" />
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
                    <Icon name="chevron_right" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-on-surface-variant mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['24', '25', '26', '27', '28', '29', '1', '2', '3', '4', '5', '6', '7', '8'].map((d, i) => {
                  const highlight = d === '5';
                  const dot = d === '6';
                  return (
                    <span
                      key={i}
                      className={`h-8 flex items-center justify-center text-xs font-bold relative ${
                        i < 6 ? 'text-on-surface-variant/40' : ''
                      } ${highlight ? 'bg-primary text-white rounded-lg' : ''}`}
                    >
                      {d}
                      {dot && <span className="absolute bottom-1 w-1 h-1 bg-secondary rounded-full" />}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">Appointments</h3>
                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">3 Total</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-outline-variant/20 hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <img className="w-12 h-12 rounded-full object-cover" alt="Dr. Michael Chen" src={CARDIOLOGIST} />
                    <div>
                      <p className="font-bold text-on-surface">Dr. Michael Chen</p>
                      <p className="text-xs text-on-surface-variant">General Cardiology</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded font-bold">TOMORROW</span>
                        <span className="text-[10px] font-bold text-primary">09:30 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-outline-variant/20 hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <Icon name="biotech" />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Annual Physical</p>
                      <p className="text-xs text-on-surface-variant">Main Lab Complex</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded font-bold">OCT 12</span>
                        <span className="text-[10px] font-bold text-on-surface-variant">02:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                  <Icon name="event" className="text-sm" /> Book New Appointment
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[1.6/1] bg-gradient-to-br from-primary to-blue-900 p-6 text-white shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-xl italic">
                    HEALTH<span className="font-normal opacity-70">PLUS</span>
                  </p>
                  <Icon name="contactless" className="opacity-50" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Policy Holder</p>
                  <p className="font-bold text-lg tracking-wide">ALEXANDER R. THOMPSON</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60">ID Number</p>
                    <p className="font-bold">4421 • 9832 • 0092</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest opacity-60">Exp</p>
                    <p className="font-bold">12/26</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-tr from-primary to-tertiary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-50">
        <Icon name="chat_bubble" className="text-3xl" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-inverse-surface text-inverse-on-surface rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask AI Assistant
        </span>
      </button>
    </DashboardLayout>
  );
}
