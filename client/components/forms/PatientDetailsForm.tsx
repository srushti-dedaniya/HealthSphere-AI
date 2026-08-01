import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import {
  COUNTRY_CODE,
  isValidMobileNumber,
  normalizeMobileInput,
  validateDocument,
} from '@/utils/validation';

interface PatientDetailsFormProps {
  onSubmit: (data: { email: string; mobile: string }) => void;
  onBack: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PatientDetailsForm({ onSubmit, onBack }: PatientDetailsFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState('aadhaar');
  const [docError, setDocError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !EMAIL_PATTERN.test(value)) {
      setEmailError('Enter a valid email address.');
    } else {
      setEmailError(null);
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeMobileInput(e.target.value);
    setMobile(value);
    if (value && !isValidMobileNumber(value)) {
      setMobileError('Enter a valid 10-digit mobile number.');
    } else {
      setMobileError(null);
    }
  };

  const handleDocTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDocType(e.target.value);
    setDocError(null);
  };

  const handleFileChange = (selected: File | null) => {
    setFile(selected);
    if (!selected) {
      setDocError('Upload a proper document.');
      return;
    }
    const error = validateDocument(selected, docType as 'aadhaar' | 'passport' | 'dl');
    setDocError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!EMAIL_PATTERN.test(email)) {
      setEmailError('Enter a valid email address.');
      valid = false;
    }
    if (!isValidMobileNumber(mobile)) {
      setMobileError('Enter a valid 10-digit mobile number.');
      valid = false;
    }
    const fileError = validateDocument(file as File, docType as 'aadhaar' | 'passport' | 'dl');
    if (fileError) {
      setDocError(fileError);
      valid = false;
    }

    if (!valid) return;

    setSubmitting(true);
    setTimeout(() => onSubmit({ email, mobile }), 800);
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-surface-container-low border rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all ${
      hasError ? 'border-error focus:ring-2 focus:ring-error/20' : 'border-outline-variant'
    }`;

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-card-padding">
      <form className="space-y-10" onSubmit={handleSubmit}>
        <section>
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Icon name="person" />
            <h2 className="font-headline-md text-headline-md">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Full Name</label>
              <input
                className={inputClass(false)}
                placeholder="e.g. Alexander Thompson"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Email Address</label>
              <input
                className={inputClass(!!emailError)}
                placeholder="alex.thompson@healthsphere.ai"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-error text-body-sm font-body-sm flex items-center gap-1 ml-1">
                  <Icon name="error" className="text-[16px]" />
                  {emailError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Mobile Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 bg-surface-container-high text-on-surface-variant font-body-md font-semibold tracking-wide">
                  {COUNTRY_CODE}
                </span>
                <input
                  className={`${inputClass(!!mobileError)} rounded-l-none border-l-0`}
                  placeholder="10-digit mobile number"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={handleMobileChange}
                />
              </div>
              {mobileError && (
                <p className="text-error text-body-sm font-body-sm flex items-center gap-1 ml-1">
                  <Icon name="error" className="text-[16px]" />
                  {mobileError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Date of Birth</label>
              <div className="relative">
                <input
                  className={inputClass(false)}
                  type="date"
                />
                <Icon
                  name="calendar_today"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Gender</label>
              <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all appearance-none">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Blood Group</label>
              <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all">
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                  <option key={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">
                Residential Address
              </label>
              <textarea
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all resize-none"
                placeholder="Enter your full residential address..."
                rows={3}
              />
            </div>
          </div>
        </section>

        <hr className="border-outline-variant/30" />

        <section>
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Icon name="security" />
            <h2 className="font-headline-md text-headline-md">Security Credentials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Password</label>
              <input className={inputClass(false)} placeholder="••••••••" type="password" />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Confirm Password</label>
              <input className={inputClass(false)} placeholder="••••••••" type="password" />
            </div>
          </div>
        </section>

        <hr className="border-outline-variant/30" />

        <section>
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Icon name="verified_user" />
            <h2 className="font-headline-md text-headline-md">Identity Verification</h2>
          </div>
          <div className="space-y-6">
            <div className="max-w-md space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">
                Document Type
              </label>
              <select
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all"
                value={docType}
                onChange={handleDocTypeChange}
              >
                <option value="aadhaar">Aadhaar Card</option>
                <option value="passport">International Passport</option>
                <option value="dl">Driver's License</option>
              </select>
            </div>
            <div
              className={`border-2 border-dashed rounded-xl bg-surface p-10 text-center transition-all hover:border-primary group cursor-pointer ${
                docError ? 'border-error' : 'border-outline-variant/50'
              }`}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="cloud_upload" className="text-4xl" filled />
                </div>
                <p className="font-headline-md text-headline-md mb-1">
                  {file?.name ?? 'Drag and drop document'}
                </p>
                <p className="text-on-surface-variant text-body-sm font-body-sm">
                  Supported formats: PDF, PNG, JPG (Max 5MB)
                </p>
                <span className="mt-6 px-6 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary/5 transition-colors">
                  Select Files
                </span>
              </div>
              <input
                className="hidden"
                id="file-input"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
            </div>
            {docError && (
              <p className="text-error text-body-sm font-body-sm flex items-center gap-1 ml-1">
                <Icon name="error" className="text-[16px]" />
                {docError}
              </p>
            )}
          </div>
        </section>

        <div className="space-y-3 pt-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" className="mt-1 rounded border-outline-variant text-primary focus:ring-primary h-4 w-4" />
            <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
              The uploaded document belongs to me and is accurate to the best of my knowledge.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" className="mt-1 rounded border-outline-variant text-primary focus:ring-primary h-4 w-4" />
            <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
              I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a> of HealthSphere AI.
            </span>
          </label>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-primary text-on-primary font-bold py-4 rounded-xl shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-on-primary border-t-transparent" />
                Processing Account...
              </>
            ) : (
              'Create Patient Account'
            )}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-10 py-4 font-bold text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all"
          >
            Back to Step 1
          </button>
        </div>
      </form>
    </div>
  );
}
