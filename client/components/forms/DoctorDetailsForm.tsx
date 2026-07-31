import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

interface DoctorDetailsFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

function DragZone({ icon, onFile }: { icon: string; onFile: (name: string) => void }) {
  const [file, setFile] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (name: string) => {
    setFile(name);
    onFile(name);
  };

  return (
    <div
      className={`drag-dash rounded-xl p-8 flex flex-col items-center justify-center bg-surface hover:bg-primary/5 transition-colors cursor-pointer group ${
        dragging ? 'bg-primary/10' : ''
      }`}
      onClick={() => document.getElementById(`upload-${icon}`)?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f.name);
      }}
    >
      <Icon
        name={file ? 'check_circle' : icon}
        className={`${file ? 'text-secondary' : 'text-outline group-hover:text-primary'} transition-colors text-3xl mb-2`}
      />
      <p className="font-body-sm text-on-surface-variant text-center">
        {file ? (
          <span className="text-secondary font-medium">{file}</span>
        ) : (
          <>
            Drag and drop or <span className="text-primary font-medium">browse</span>
          </>
        )}
      </p>
      <p className="text-[10px] text-outline mt-1 uppercase tracking-tight">Max size 5MB</p>
      <input
        className="hidden"
        id={`upload-${icon}`}
        type="file"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0].name)}
      />
    </div>
  );
}

export function DoctorDetailsForm({ onSubmit, onBack }: DoctorDetailsFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(onSubmit, 800);
  };

  return (
    <div className="w-full max-w-[960px] mx-auto bg-white border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden">
      <form className="p-card-padding" onSubmit={handleSubmit}>
        <div className="mb-8 flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
          <Icon name="info" className="text-primary" filled />
          <p className="font-body-sm text-primary">
            Doctor accounts require verification before activation. Our medical compliance team
            typically reviews applications within 24-48 business hours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-2">
            <h2 className="font-label-md text-on-surface-variant uppercase tracking-widest mb-4">
              Professional Profile
            </h2>
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Full Name</label>
            <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="Dr. Julianne Smith" type="text" />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Email Address</label>
            <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="j.smith@medical-center.com" type="email" />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Mobile Number</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-high text-on-surface-variant font-body-sm">
                +1
              </span>
              <input className="w-full px-4 py-3 rounded-r-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="(555) 000-0000" type="tel" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Hospital/Clinic Name</label>
            <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="St. Mary's General Hospital" type="text" />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Medical Specialization</label>
            <select className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md appearance-none">
              <option value="">Select Specialization</option>
              {['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Radiology'].map((s) => (
                <option key={s} value={s.toLowerCase()}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-label-md text-on-surface-variant">Years of Exp.</label>
              <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="10" type="number" />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-on-surface-variant">City</label>
              <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="San Francisco" type="text" />
            </div>
          </div>

          <div className="col-span-2 pt-4">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-label-md text-on-surface-variant uppercase tracking-widest">
                Professional Verification
              </h2>
              <Icon name="verified_user" className="text-primary text-sm" />
            </div>
          </div>
          <div className="col-span-2 space-y-2">
            <label className="font-label-md text-on-surface-variant">
              Medical Registration Number (NPI / MCI / GMC)
            </label>
            <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="REG-8829-XJ-01" type="text" />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Medical License (PDF/JPG)</label>
            <DragZone icon="upload_file" onFile={() => {}} />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Medical Degree (Scan)</label>
            <DragZone icon="school" onFile={() => {}} />
          </div>

          <div className="col-span-2 pt-4">
            <h2 className="font-label-md text-on-surface-variant uppercase tracking-widest mb-4">
              Security Credentials
            </h2>
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Password</label>
            <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="••••••••" type="password" />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant">Confirm Password</label>
            <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary/20 transition-all font-body-md" placeholder="••••••••" type="password" />
          </div>

          <div className="col-span-2 pt-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" />
              <span className="font-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                I hereby certify that all information provided is accurate and corresponds to my
                official medical credentials.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" />
              <span className="font-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a> regarding professional data handling.
              </span>
            </label>
          </div>

          <div className="col-span-2 pt-8 flex justify-between items-center">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 rounded-lg border border-outline-variant text-on-surface-variant font-medium hover:bg-surface-container-high transition-all flex items-center gap-2"
            >
              <Icon name="arrow_back" className="text-sm" />
              Previous
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-3 rounded-lg step-gradient text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit for Verification
                  <Icon name="rocket_launch" className="text-sm" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
