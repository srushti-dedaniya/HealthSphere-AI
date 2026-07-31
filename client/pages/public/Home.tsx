import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const HERO_AVATARS = [
  {
    alt: 'Female cardiologist',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVHXgLUxVfK7CWZZR8mLy6-Tqlb1F1XSAJ2naWj7S71LVqJuFmaUFi62xlOvBjqOnSmCo_PHqQLUMzAYfvu8IjT8KJAD_3bS1B98A3NFaF7GxPp7DSAQmWZpAQIr5vmHAvhE9HsLbXuSY4rYxKtAfPYW6_92miIV9xbwW94umnBJ14NsEfufx1K6sTB7FnAKNUQqRhA3POYkoeH3KNk_IRaGBG4ALTsUGhQr3DYbnbl3y3hewx-hS4BQ',
  },
  {
    alt: 'Male medical researcher',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT1J27Wuuk2km7ziIWdDjCofqy70lWfmvuyaAie1Re37OIs5_mVSyyd_nXFkp0kMmMnSBSvCN5gM1y7xiHHp7F7cbOK0UQ-5r0I7mtueoIXqij16o2SIR7PUo-IbcvZnwfgyY08wJXWjiB-oSogBauXH6LAEkpNQDkJLMoJeMTjl3y_JnO1LxkfIomq0k_aPovQeAUZ3ii8EzNnP2IpYRUf_kCj4nLZmQw9udLxLYbvXlcVYQUNSb8KQ',
  },
  {
    alt: 'Medical administrator',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXcZ372CNwuB5Yrd7Sg2SaBFAKJIW7lQvxBjsFFNkUl15DgqyilwHyKmR0YZezDLq0JmM9P53H2ahsAJhucNj0iJvUsuZzccrg9B9ARPCZSD6Xq_FVHsXCegsTAYkmcfL_s4EzUbkV7bVNL1Cw-nMr1-qTGCkodqKIbJ_4yrXxgfGbN6zGQTIRZJbZCmfCGzwzz5qYSM0F6spsvbh_KRmPUK0jzJAUHTlIIFFpQRuAVUPzJFE9iFRzLQ',
  },
];

function HeroChart() {
  return (
    <div className="h-32 w-full bg-surface-container-low rounded-xl relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-24 flex items-end">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d="M0 80 Q 20 20, 40 50 T 80 10 T 100 60"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 80 Q 20 20, 40 50 T 80 10 T 100 60 L 100 100 L 0 100 Z"
            fill="url(#grad1)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-container-padding flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed rounded-full text-on-primary-fixed mb-6 animate-pulse">
              <Icon name="auto_awesome" className="text-sm" />
              <span className="font-label-md text-label-md">v2.0 Now Enterprise Ready</span>
            </div>
            <h1 className="font-display-lg text-display-lg mb-6 leading-[1.05]">
              <span className="block">AI-Powered Healthcare</span>
              <span className="ai-gradient-text">for the Future.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto lg:mx-0">
              Harness the power of enterprise-grade clinical intelligence. Automate reports, monitor
              patients in real-time, and drive predictive outcomes with HealthSphere.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button variant="ai" size="lg" onClick={() => navigate('/register')}>
                Deploy Intelligence
                <Icon name="arrow_forward" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToId('case-studies')}>
                View Case Studies
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {HERO_AVATARS.map((avatar) => (
                  <div
                    key={avatar.alt}
                    className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white overflow-hidden"
                  >
                    <img className="w-full h-full object-cover" alt={avatar.alt} src={avatar.src} />
                  </div>
                ))}
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Trusted by 500+ Medical Institutions
              </p>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-2xl">
            <div className="floating relative z-20">
              <div className="glass-card rounded-[32px] p-card-padding">
                <div className="flex items-center justify-between mb-8 border-b border-outline-variant/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                      <Icon name="monitoring" className="text-on-secondary-container" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-sm leading-none mb-1">
                        Patient Analysis
                      </h3>
                      <p className="font-label-md text-label-md text-secondary">
                        Real-time Status: Optimal
                      </p>
                    </div>
                  </div>
                  <Icon name="more_vert" className="text-outline" />
                </div>
                <div className="space-y-6">
                  <HeroChart />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-highest/50 p-4 rounded-xl border border-outline-variant/20">
                      <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                        Stability Index
                      </p>
                      <p className="font-headline-md text-headline-md text-primary">98.4%</p>
                    </div>
                    <div className="bg-surface-container-highest/50 p-4 rounded-xl border border-outline-variant/20">
                      <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                        AI Confidence
                      </p>
                      <p className="font-headline-md text-headline-md text-secondary">High</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] -z-10" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-section-gap bg-surface scroll-mt-20" id="features">
        <div className="max-w-[1440px] mx-auto px-container-padding">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg mb-4">
              Precision Intelligence for Modern Clinics
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              HealthSphere AI integrates directly into your workflow to eliminate bottlenecks and
              enhance decision-making through automated medical cognition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              {
                icon: 'description',
                bg: 'bg-primary-fixed',
                hoverBg: 'group-hover:bg-primary-container',
                color: 'text-primary',
                hoverColor: 'group-hover:text-on-primary-container',
                title: 'AI Report Summary',
                body: 'Convert hours of medical transcripts and imaging data into concise, actionable summaries in seconds with 99.9% semantic accuracy.',
                link: 'Learn more',
              },
              {
                icon: 'timer',
                bg: 'bg-secondary-fixed',
                hoverBg: 'group-hover:bg-secondary',
                color: 'text-secondary',
                hoverColor: 'group-hover:text-on-secondary',
                title: '24/7 Monitoring',
                body: 'Continuous AI observation detects subtle biomarker shifts before they become critical, providing a persistent safety net for your patients.',
                link: 'View monitoring',
              },
              {
                icon: 'calendar_today',
                bg: 'bg-tertiary-fixed',
                hoverBg: 'group-hover:bg-tertiary-container',
                color: 'text-tertiary',
                hoverColor: 'group-hover:text-on-tertiary-container',
                title: 'Seamless Booking',
                body: 'Intelligent scheduling that predicts patient load and optimizes clinician availability, reducing wait times by up to 45%.',
                link: 'Explore booking',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-card-padding rounded-[24px] shadow-sm border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 ${feature.hoverBg} transition-colors`}
                >
                  <Icon
                    name={feature.icon}
                    className={`${feature.color} ${feature.hoverColor} transition-colors`}
                  />
                </div>
                <h3 className="font-headline-md text-headline-md mb-4">{feature.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {feature.body}
                </p>
                <a className="font-label-md text-label-md text-primary flex items-center gap-1 group-hover:gap-3 transition-all" href="#features">
                  {feature.link} <Icon name="arrow_forward" className="text-sm" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="py-section-gap bg-surface-container-low overflow-hidden scroll-mt-20" id="demo">
        <div className="max-w-[1440px] mx-auto px-container-padding flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1">
            <div className="glass-card rounded-[32px] overflow-hidden border border-white/40">
              <div className="bg-primary-container p-6 flex items-center justify-between">
                <h4 className="text-white font-headline-md text-headline-md">
                  Interactive AI Diagnostic
                </h4>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/40" />
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center">
                      <Icon name="person" className="text-on-surface-variant" />
                    </div>
                    <div className="bg-surface-container-high/50 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                      <p className="font-body-sm text-body-sm text-on-surface">
                        Summarize the recent cardiology findings for Patient ID: 8829-X.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div className="bg-primary-container/10 p-4 rounded-2xl rounded-tr-none max-w-[80%] border border-primary/20">
                      <p className="font-body-sm text-body-sm text-on-surface">
                        Based on the latest MRI and ECG data from 08:30 AM:
                      </p>
                      <ul className="mt-2 space-y-1 list-disc list-inside opacity-80">
                        <li>No signs of myocardial ischemia.</li>
                        <li>Ejection fraction stable at 58%.</li>
                        <li>Recommended: Continue current dosage.</li>
                      </ul>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center">
                      <Icon name="auto_awesome" className="text-white" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-2 flex-1 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-3/4 rounded-full" />
                      </div>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Processing complete
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] rounded-full uppercase font-bold tracking-widest">
                        Normal Rhythm
                      </span>
                      <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] rounded-full uppercase font-bold tracking-widest">
                        Follow-up: 6mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <h2 className="font-display-lg text-display-lg mb-6">Cognitive Insight on Demand</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Stop hunting through file folders. Our proprietary LLM (Large Life-science Model) is
              trained specifically on medical literature and your clinic&apos;s own encrypted history
              to provide contextual answers instantly.
            </p>
            <ul className="space-y-4">
              {[
                'HIPAA-Compliant Encrypted Processing',
                'Multi-modal Analysis (Text, Image, Bio-signals)',
                'Seamless EMR Integration',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Icon name="check_circle" className="text-primary" />
                  <span className="font-body-md text-body-md">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-section-gap bg-surface-container-lowest border-y border-outline-variant/30 scroll-mt-20"
        id="stats"
      >
        <div className="max-w-[1440px] mx-auto px-container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['99.9%', 'Report Accuracy'],
              ['1M+', 'Reports Processed'],
              ['40%', 'Efficiency Gain'],
              ['50ms', 'Analysis Latency'],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="font-display-lg text-display-lg text-primary mb-2">{value}</p>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-section-gap bg-surface scroll-mt-20" id="case-studies">
        <div className="max-w-[1440px] mx-auto px-container-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed/30 text-secondary rounded-full mb-6">
              <Icon name="analytics" className="text-sm" />
              <span className="font-label-md text-label-md">Proven Outcomes</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-4">Case Studies</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Real-world evidence from independently published AI-in-healthcare deployments — peer-reviewed
              studies and published results from leading hospitals and health systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              {
                icon: 'local_hospital',
                org: 'Cedars-Sinai Medical Center',
                tag: 'Radiology',
                metric: '−2.8 days',
                metricLabel: 'shorter length of stay (PE)',
                body: 'With Aidoc\'s AI triage for intracranial hemorrhage, C-spine fractures, pulmonary embolism and large vessel occlusion, Cedars-Sinai cut inpatient length of stay by 1.3 days (ICH) and 2.8 days (PE), decreased turnaround time by 10–35%, and flagged 4.2% of ICH detections that were initially missed. Published in an official Aidoc/Cedars-Sinai case study.',
                source: 'Cedars-Sinai × Aidoc case study (PDF)',
                sourceUrl: 'https://5748396.fs1.hubspotusercontent-na1.net/hubfs/5748396/Cedar%20Sinai%20Medical%20Center%20Case%20Study%20Aidoc.pdf',
              },
              {
                icon: 'monitor_heart',
                org: 'Viz.ai LVO Stroke',
                tag: 'Stroke · 24/7 Monitoring',
                metric: '44%',
                metricLabel: 'faster time to stroke diagnosis',
                body: 'The peer-reviewed VALIDATE study analyzed 14,116 acute stroke consultations across 166 facilities. AI-based LVO detection and care coordination cut time from patient arrival to interventionalist contact by 39.5 minutes (44.13% reduction), helping get patients to endovascular therapy faster.',
                source: 'Frontiers in Stroke, 2024 (peer-reviewed)',
                sourceUrl: 'https://www.frontiersin.org/journals/stroke/articles/10.3389/fstro.2024.1381930/full',
              },
              {
                icon: 'health_and_safety',
                org: 'Qure.ai qXR · India TB Program',
                tag: 'Public Health · Chest X-ray',
                metric: '+15.8%',
                metricLabel: 'increase in TB case yield from AI',
                body: 'PATH\'s TB REACH program screened 10,481 people in Nagpur, India using Qure.ai\'s qXR. Of 2,303 flagged presumptive, roughly a 15.8% increase in overall TB yield was attributable to AI alone — cases radiologists had not deemed presumptive. Published in PLOS Digital Health.',
                source: 'PLOS Digital Health, 2023 (peer-reviewed)',
                sourceUrl: 'https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000404',
              },
            ].map((cs) => (
              <div
                key={cs.org}
                className="bg-white p-card-padding rounded-[24px] shadow-sm border border-outline-variant/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center group-hover:bg-primary-container transition-colors">
                    <Icon name={cs.icon} className="text-primary group-hover:text-on-primary-container" />
                  </div>
                  <span className="px-3 py-1 bg-surface-container-low rounded-full text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    {cs.tag}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-1">{cs.org}</h3>
                <p className="font-display-lg text-display-lg text-primary mb-1">{cs.metric}</p>
                <p className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-4">
                  {cs.metricLabel}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-1">{cs.body}</p>
                <a
                  href={cs.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label-md text-label-md text-primary flex items-center gap-1 group-hover:gap-3 transition-all"
                >
                  Read case study <Icon name="arrow_forward" className="text-sm" />
                </a>
                <a
                  href={cs.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                >
                  Source: {cs.source} <Icon name="open_in_new" className="text-xs" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Company Section */}
      <section className="py-section-gap bg-surface-container-low scroll-mt-20" id="about">
        <div className="max-w-[1440px] mx-auto px-container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed rounded-full text-on-primary-fixed mb-6">
                <Icon name="groups" className="text-sm" />
                <span className="font-label-md text-label-md">About HealthSphere AI</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg mb-6">
                Built by clinicians and engineers who believe machines should be the safety net, not
                the surgeon.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                HealthSphere AI began as a research collaboration between a hematology department and
                a machine-learning team. Today we power clinical intelligence for 500+ medical
                institutions, combining a proprietary Large Life-science Model with your clinic&apos;s own
                encrypted history — never trained on your data without consent, never leaving your
                compliance boundary.
              </p>
              <ul className="space-y-4">
                {[
                  'Founded 2020 · San Francisco, CA',
                  'HIPAA & SOC 2 Type II compliant infrastructure',
                  'Auditable AI — every insight links back to source data',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-primary" />
                    <span className="font-body-md text-body-md">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              {[
                ['shield', 'Privacy First', 'Encrypted processing with AES-256 and zero-retention on raw patient data.'],
                ['speed', 'Clinical Speed', 'Insights in under 50ms, surfaced inside the workflows you already use.'],
                ['verified', 'Always Auditable', 'Every recommendation traces to its source report, image, or biosignal.'],
                ['groups', 'Clinician-Led', 'Built in collaboration with doctors, nurses, and hospital administrators.'],
              ].map(([icon, title, body]) => (
                <div key={title} className="bg-white p-6 rounded-2xl border border-outline-variant/30 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-secondary-fixed rounded-xl flex items-center justify-center mb-4">
                    <Icon name={icon} className="text-secondary" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-lg mb-2">{title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap px-container-padding relative scroll-mt-20">
        <div className="max-w-4xl mx-auto glass-card rounded-[40px] p-card-padding lg:p-16 text-center overflow-hidden relative">
          <h2 className="font-headline-lg text-headline-lg mb-6">
            Ready to Elevate Your Standard of Care?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Join the 500+ clinics that have already digitized their intuition with HealthSphere AI.
            Start your enterprise trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="ai" size="lg" onClick={() => navigate('/register')}>
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToId('case-studies')}>
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-6 font-label-md text-label-md text-on-surface-variant">
            No credit card required. Enterprise volume discounts available.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-16 border-t border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-container-padding">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center">
                  <Icon name="medical_services" className="text-on-primary-container text-[18px]" filled />
                </div>
                <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
                  HealthSphere AI
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 max-w-xs">
                Advanced clinical intelligence for forward-thinking healthcare providers. Precision,
                speed, and trust.
              </p>
              <div className="flex gap-4">
                {['alternate_email', 'public', 'rss_feed'].map((icon) => (
                  <a
                    key={icon}
                    className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:text-primary transition-all"
                    href="#"
                  >
                    <Icon name={icon} className="text-[20px]" />
                  </a>
                ))}
              </div>
            </div>
            {[
              ['Product', ['AI Reports', 'Monitoring', 'Diagnostics', 'Integrations']],
              ['Company', ['About Us', 'Privacy Policy', 'Security', 'Careers']],
              ['Resources', ['Documentation', 'Case Studies', 'Support', 'API Status']],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h5 className="font-label-md text-label-md uppercase tracking-widest text-on-surface mb-6">
                  {title}
                </h5>
                <ul className="space-y-4">
                  {(links as string[]).map((link) => (
                    <li key={link}>
                      <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h5 className="font-label-md text-label-md uppercase tracking-widest text-on-surface mb-6">
                Location
              </h5>
              <div className="h-24 w-full rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover"
                  alt="San Francisco"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5v8fYZgr3zjwEtkM3OlvaQLRqqDf0nK2EwPVSnH_mRKo8hLuUUGRrI_uRwA5raOen567Y6UACNo7u2vZoJJ1HtCZ3YPmFdJ6HMgOJ7a8ur5NhLxsjJmz4Rvzdt_QihNXpx27M1tkVJHfDLgx1z4iaXtdvM0FfjFQursWNq1nSSOXeRTR6O67PNvURi4VoOwtPYkAyBWTvltCATR76D2NfcOSQfEUvn5NjbbkDTEWqLx6kO9fNLPpZbw"
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 italic">
                HQ: San Francisco, CA
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-label-md text-label-md text-on-surface-variant">
              © 2024 HealthSphere AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
                Terms
              </a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
