import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';

type View = 'patient' | 'doctor';

function spawnConfetti(color: string) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.backgroundColor = color;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = '-10px';
    particle.style.opacity = String(Math.random());
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(particle);

    const animation = particle.animate(
      [
        { transform: 'translate3d(0,0,0) rotate(0deg)', opacity: 1 },
        {
          transform: `translate3d(${(Math.random() - 0.5) * 200}px, ${window.innerHeight}px, 0) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 2000 + 1500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: Math.random() * 200,
      },
    );
    animation.onfinish = () => particle.remove();
  }
}

export default function VerificationPending() {
  const [view, setView] = useState<View>('patient');

  useEffect(() => {
    spawnConfetti('#4fdbc8');
  }, []);

  const toggle = (next: View) => {
    setView(next);
    spawnConfetti(next === 'patient' ? '#4fdbc8' : '#2563eb');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-on-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-container/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 w-full max-w-2xl px-6">
        <div className="glass-card rounded-3xl p-card-padding shadow-xl flex flex-col items-center text-center animate-entry">
          <div className="mb-12 flex items-center gap-2">
            <Icon name="medical_services" className="text-primary text-4xl" filled />
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
              HealthSphere AI
            </span>
          </div>

          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-secondary/10 rounded-full scale-125 animate-pulse" />
            <svg className="w-full h-full text-secondary fill-none stroke-[3]" viewBox="0 0 52 52">
              <circle className="opacity-20 stroke-current" cx="26" cy="26" r="25" />
              <path className="animate-checkmark stroke-current" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>

          <div className="mb-8 flex bg-surface-container-low p-1 rounded-full border border-outline-variant/30">
            {(
              [
                ['patient', 'Patient View'],
                ['doctor', 'Doctor View'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all ${
                  view === key ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {view === 'patient' ? (
            <div className="animate-entry">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                Registration Complete!
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Your account has been created successfully. Welcome to the future of healthcare.
              </p>
            </div>
          ) : (
            <div className="animate-entry">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                Submission Successful
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Registration submitted successfully. Your credentials are being verified by our
                clinical administration team. You will receive an email once your account is active.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3 bg-primary-container/5 border border-primary/10 rounded-xl p-4 max-w-sm mx-auto">
                <Icon name="verified_user" className="text-primary" />
                <span className="font-label-md text-label-md text-primary">
                  Verification usually takes 24-48 hours.
                </span>
              </div>
            </div>
          )}

          <div className="mt-12 w-full max-w-xs">
            <Link
              to="/login"
              className="group relative flex items-center justify-center gap-2 w-full bg-primary text-on-primary py-4 px-8 rounded-xl font-headline-md text-[18px] font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
            >
              Return to Login
              <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <p className="mt-8 font-body-sm text-body-sm text-outline">
            Need help? <a className="text-primary font-semibold hover:underline" href="#">Contact Support</a>
          </p>
        </div>
      </main>

      <div className="absolute inset-0 pointer-events-none opacity-10">
        {['monitor_heart', 'fitbit_jumping_jacks', 'strikethrough_s', 'stethoscope'].map((icon, i) => (
          <Icon
            key={icon}
            name={icon}
            className={`absolute text-6xl ${i % 2 === 0 ? 'top-20 left-[15%]' : 'bottom-40 left-[10%]'}`}
            style={{ animation: `float ${6 + i}s ease-in-out infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
