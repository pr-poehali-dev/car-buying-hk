const HONEYPOT_FIELD = 'website_url';
const MIN_SUBMIT_TIME = 3000;
const MAX_SUBMIT_TIME = 600000;
const RATE_LIMIT_STORAGE_KEY = 'form_submissions';
const MAX_SUBMISSIONS_PER_HOUR = 10;

interface FormSubmissionRecord {
  timestamp: number;
  ip?: string;
}

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 200);
};

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length < 10 || cleaned.length > 11) return false;
  
  if (cleaned.length === 11 && !cleaned.startsWith('7') && !cleaned.startsWith('8')) return false;
  
  const repeatingPattern = /^(\d)\1+$/;
  if (repeatingPattern.test(cleaned)) return false;
  
  return true;
};

export const checkRateLimit = (): boolean => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const submissions: FormSubmissionRecord[] = stored ? JSON.parse(stored) : [];
    
    const oneHourAgo = Date.now() - 3600000;
    const recentSubmissions = submissions.filter(s => s.timestamp > oneHourAgo);
    
    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      return false;
    }
    
    return true;
  } catch {
    return true;
  }
};

export const recordSubmission = (): void => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const submissions: FormSubmissionRecord[] = stored ? JSON.parse(stored) : [];
    
    const oneHourAgo = Date.now() - 3600000;
    const recentSubmissions = submissions.filter(s => s.timestamp > oneHourAgo);
    
    recentSubmissions.push({ timestamp: Date.now() });
    
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(recentSubmissions));
  } catch {
    console.warn('Could not record submission');
  }
};

export const validateFormTiming = (formOpenTime: number): boolean => {
  const submitTime = Date.now() - formOpenTime;
  
  if (submitTime < MIN_SUBMIT_TIME) {
    console.warn('Form submitted too quickly - possible bot');
    return false;
  }
  
  // Remove max time check - allow any time for legitimate users
  return true;
};

export const createHoneypot = () => ({
  fieldName: HONEYPOT_FIELD,
  defaultValue: '',
});

export const checkHoneypot = (value: string): boolean => {
  return value === '';
};

export const validateFormData = (data: {
  phone: string;
  brand?: string;
  model?: string;
  year?: string;
  city?: string;
  condition?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!validatePhone(data.phone)) {
    errors.push('Некорректный номер телефона');
  }
  
  if (data.brand && data.brand.length > 50) {
    errors.push('Слишком длинное название марки');
  }
  
  if (data.model && data.model.length > 50) {
    errors.push('Слишком длинное название модели');
  }
  
  if (data.year) {
    const year = parseInt(data.year);
    const currentYear = new Date().getFullYear();
    if (year < 1950 || year > currentYear + 1) {
      errors.push('Некорректный год выпуска');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const encryptFormData = (data: any): string => {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return JSON.stringify(data);
  }
};

export const generateFormToken = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};