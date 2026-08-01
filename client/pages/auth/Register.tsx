import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { PatientDetailsForm } from '@/components/forms/PatientDetailsForm';
import { DoctorDetailsForm } from '@/components/forms/DoctorDetailsForm';
import { OtpVerification } from '@/components/forms/OtpVerification';
import type { Role } from '@/types/auth';

export interface RegistrationContact {
  email: string;
  mobile: string;
}

type Step = 1 | 2 | 3;

const ROLE_CARDS = [
  {
    key: 'patient' as Role,
    title: 'Patient',
    icon: 'person',
    iconBg: 'bg-primary-fixed-dim/20',
    iconHover: 'group-hover:bg-primary-container',
    iconColor: 'text-primary',
    description:
      'I want to track my health metrics, receive AI-driven insights, and manage my patient profile effortlessly.',
  },
  {
    key: 'doctor' as Role,
    title: 'Doctor',
    icon: 'medical_services',
    iconBg: 'bg-secondary-container/20',
    iconHover: 'group-hover:bg-secondary',
    iconColor: 'text-secondary',
    description:
      'I am a healthcare professional looking to manage patients, analyze protocols, and leverage medical AI diagnostics.',
  },
];

export default function Register() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role | null>(null);
  const [contact, setContact] = useState<RegistrationContact>({ email: '', mobile: '' });
  const navigate = useNavigate();

  const complete = () => navigate('/verification-pending');

  const handleDetailsSubmit = (data: RegistrationContact) => {
    setContact(data);
    setStep(3);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen font-body-md flex flex-col">
      <header className="h-20 px-gutter flex items-center justify-between border-b border-outline-variant/30 bg-white">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
            <Icon name="health_and_safety" className="text-white" filled />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            HealthSphere AI
          </span>
        </Link>
        <div className="flex flex-col items-end gap-1">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase">
            Step {step} of 3
          </span>
          <div className="w-48 h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className="progress-bar h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: `${step === 1 ? 33 : step === 2 ? 66 : 100}%` }}
            />
          </div>
        </div>
      </header>

      {step === 1 ? (
        <main className="flex-grow flex items-center justify-center py-section-gap px-gutter">
          <div className="max-w-[1200px] w-full flex flex-col items-center">
            <div className="text-center mb-12">
              <h1 className="font-display-lg text-display-lg text-on-surface mb-2">
                Create your account
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Select your role to get started with your clinical journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full max-w-4xl">
              {ROLE_CARDS.map((card) => {
                const selected = role === card.key;
                return (
                  <div
                    key={card.key}
                    onClick={() => setRole(card.key)}
                    className={`role-card glass-card rounded-xl p-card-padding cursor-pointer flex flex-col items-center text-center group transition-all ${
                      selected ? 'selected ring-2 ring-secondary border-secondary' : ''
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full ${card.iconBg} flex items-center justify-center mb-6 transition-colors ${card.iconHover} ${
                        selected ? 'group-hover:text-white' : ''
                      }`}
                    >
                      <Icon name={card.icon} className={`text-[32px] ${card.iconColor}`} />
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-3">{card.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {card.description}
                    </p>
                    <div className="mt-6 flex items-center justify-center h-8">
                      <div className={selected ? 'text-secondary' : 'hidden'}>
                        <Icon name="check_circle" filled />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-12 font-body-sm text-body-sm text-outline flex items-center gap-2">
              <Icon name="info" className="text-[18px]" />
              You can&apos;t change your role once the account is created.
            </p>
          </div>
        </main>
      ) : (
        <main className="flex-grow py-12 px-gutter">
          <div className="max-w-[1000px] mx-auto mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Account Details</h1>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                Step 2 of 3
              </span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-primary w-2/3 h-full transition-all duration-500 ease-out" />
            </div>
            <div className="flex justify-between mt-3 text-on-surface-variant font-label-md text-label-md">
              <span>Personal Info</span>
              <span className="text-primary font-bold">Account Verification</span>
              <span>Confirmation</span>
            </div>
          </div>
          {role === 'doctor' ? (
            <DoctorDetailsForm onBack={() => setStep(1)} onSubmit={handleDetailsSubmit} />
          ) : (
            <div className="max-w-[1000px] mx-auto">
              <PatientDetailsForm onBack={() => setStep(1)} onSubmit={handleDetailsSubmit} />
            </div>
          )}
        </main>
      )}

      {step === 3 && (
        <main className="flex-grow py-12 px-gutter">
          <div className="max-w-[1000px] mx-auto mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Verify Your Identity</h1>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
                Step 3 of 3
              </span>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mb-4 flex items-center gap-1 text-on-surface-variant font-label-md hover:text-primary transition-colors"
            >
              <Icon name="arrow_back" className="text-sm" />
              BACK TO ACCOUNT DETAILS
            </button>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-primary w-full h-full transition-all duration-500 ease-out" />
            </div>
            <div className="flex justify-between mt-3 text-on-surface-variant font-label-md text-label-md">
              <span className="text-secondary font-bold">Personal Info</span>
              <span className="text-secondary font-bold">Account Verification</span>
              <span className="text-primary font-bold">Confirmation</span>
            </div>
          </div>
          <OtpVerification email={contact.email} mobile={contact.mobile} onVerified={complete} />
        </main>
      )}

      {step === 1 && (
        <footer className="h-24 px-container-padding flex items-center justify-between bg-white border-t border-outline-variant/30 sticky bottom-0">
          <Link
            to="/login"
            className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-primary transition-colors"
          >
            <Icon name="arrow_back" />
            BACK TO LOGIN
          </Link>
          <button
            className="ai-action-btn px-10 py-4 rounded-full text-white font-headline-md text-[18px] shadow-lg flex items-center gap-3"
            disabled={!role}
            onClick={() => role && setStep(2)}
          >
            Continue
            <Icon name="arrow_forward" />
          </button>
        </footer>
      )}
    </div>
  );
}
