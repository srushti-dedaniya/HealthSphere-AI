import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface PatientDetailsFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

export function PatientDetailsForm({ onSubmit, onBack }: PatientDetailsFormProps) {
  const [file, setFile] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(onSubmit, 800);
  };

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
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all"
                placeholder="e.g. Alexander Thompson"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Email Address</label>
              <input
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all"
                placeholder="alex.thompson@healthsphere.ai"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Mobile Number</label>
              <input
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all"
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Date of Birth</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all"
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
              <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all" placeholder="••••••••" type="password" />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">Confirm Password</label>
              <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all" placeholder="••••••••" type="password" />
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
              <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:bg-white transition-all">
                <option value="aadhaar">Aadhaar Card</option>
                <option value="passport">International Passport</option>
                <option value="dl">Driver's License</option>
              </select>
            </div>
            <div
              className="border-2 border-dashed border-outline-variant/50 rounded-xl bg-surface p-10 text-center transition-all hover:border-primary group cursor-pointer"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="cloud_upload" className="text-4xl" filled />
                </div>
                <p className="font-headline-md text-headline-md mb-1">
                  {file ?? 'Drag and drop document'}
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
                onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0].name)}
              />
            </div>
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
