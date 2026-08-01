const MAX_DOCUMENT_SIZE_MB = 5;
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * 1024 * 1024;

const ALLOWED_DOCUMENT_TYPES: Record<string, string[]> = {
  aadhaar: ['application/pdf', 'image/png', 'image/jpeg'],
  passport: ['application/pdf', 'image/png', 'image/jpeg'],
  dl: ['application/pdf', 'image/png', 'image/jpeg'],
  license: ['application/pdf', 'image/jpeg'],
  degree: ['application/pdf', 'image/png', 'image/jpeg'],
};

const ALLOWED_DOCUMENT_EXTENSIONS = ['pdf', 'png', 'jpg', 'jpeg'];

export const COUNTRY_CODE = '+91';

export function isValidMobileNumber(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return /^\d{10}$/.test(digits) && /^[6-9]/.test(digits);
}

export function normalizeMobileInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, 10);
}

export function validateDocument(file: File, kind: keyof typeof ALLOWED_DOCUMENT_TYPES): string | null {
  if (!file) return 'Upload a proper document.';

  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return `Upload a proper document (max ${MAX_DOCUMENT_SIZE_MB}MB).`;
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  const mimeType = (file.type || '').toLowerCase();

  const validExt = ALLOWED_DOCUMENT_EXTENSIONS.includes(extension);
  const validMime = ALLOWED_DOCUMENT_TYPES[kind]?.includes(mimeType);

  if (!validExt || !validMime) {
    return 'Upload a proper document (PDF, PNG or JPG).';
  }

  return null;
}

export function formatDocumentError(file: File | null, kind: keyof typeof ALLOWED_DOCUMENT_TYPES): string | null {
  return file ? validateDocument(file, kind) : 'Upload a proper document.';
}
