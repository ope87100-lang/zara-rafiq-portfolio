import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Send, Mail, Loader2 } from 'lucide-react';
import { PROFILE } from '../../data/profile';

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters).')
    .max(80, 'Full name must be 80 characters or fewer.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(120, 'Email address must be 120 characters or fewer.'),
  subject: z
    .string()
    .trim()
    .min(3, 'Please enter a brief subject (at least 3 characters).')
    .max(120, 'Subject must be 120 characters or fewer.'),
  message: z
    .string()
    .trim()
    .min(15, 'Please write a message of at least 15 characters.')
    .max(1500, 'Message must be 1,500 characters or fewer.'),
  website: z.string().max(0).optional(), // Honeypot spam trap
});

type ContactFormValues = z.infer<typeof contactSchema>;

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'sent' }
  | { status: 'fallback_ready'; mailtoUrl: string }
  | { status: 'error'; message: string; mailtoUrl: string };

export function ContactForm() {
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' });
  const lastSubmittedHashRef = useRef<string>('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
      website: '',
    },
  });

  const messageValue = watch('message') || '';

  const buildMailtoUrl = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject}`);
    const body = encodeURIComponent(
      `Name: ${data.fullName}\nEmail: ${data.email}\n\n${data.message}`,
    );
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (data: ContactFormValues) => {
    // Honeypot check
    if (data.website && data.website.trim().length > 0) {
      return;
    }

    // Duplicate submission guard
    const hash = `${data.email}|${data.subject}|${data.message}`;
    if (lastSubmittedHashRef.current === hash && submission.status === 'sent') {
      return;
    }

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
    const mailtoUrl = buildMailtoUrl(data);

    // Truthful handling: if no remote form delivery endpoint is configured, do not show a fake "sent" message
    if (!endpoint || endpoint.trim() === '') {
      setSubmission({ status: 'fallback_ready', mailtoUrl });
      return;
    }

    setSubmission({ status: 'submitting' });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Delivery service returned status ${response.status}`);
      }

      lastSubmittedHashRef.current = hash;
      setSubmission({ status: 'sent' });
      reset();
    } catch {
      setSubmission({
        status: 'error',
        message:
          'Automated form delivery could not be reached. Please send your message directly using your email client below.',
        mailtoUrl,
      });
    }
  };

  const inputBase =
    'w-full rounded-xl bg-[#111110] border px-4 py-3 text-sm sm:text-base text-[#F5F5F4] placeholder:text-neutral-500 transition-colors duration-150 focus:outline-none focus:border-[#F7D928]';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-[#181816] border border-white/12 rounded-[28px] p-6 sm:p-8 space-y-5"
    >
      {/* Hidden honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave blank</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
            Full Name <span className="text-[#F7D928]" aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className={`${inputBase} ${errors.fullName ? 'border-red-400' : 'border-white/15'}`}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.fullName.message}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
            Email Address <span className="text-[#F7D928]" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-white/15'}`}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
          Subject <span className="text-[#F7D928]" aria-hidden="true">*</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="e.g., Entry-level E-commerce Assistant Opportunity"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={`${inputBase} ${errors.subject ? 'border-red-400' : 'border-white/15'}`}
          {...register('subject')}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.subject.message}</span>
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="message" className="block text-sm font-semibold text-white">
            Message <span className="text-[#F7D928]" aria-hidden="true">*</span>
          </label>
          <span className="text-xs text-neutral-400">{messageValue.length}/1500</span>
        </div>
        <textarea
          id="message"
          rows={5}
          placeholder="Share details about the role, team, or question..."
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputBase} resize-y min-h-[130px] ${
            errors.message ? 'border-red-400' : 'border-white/15'
          }`}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.message.message}</span>
          </p>
        )}
      </div>

      <div className="pt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submission.status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {submission.status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <span className="text-xs text-neutral-400">
          Direct email:{' '}
          <a href={`mailto:${PROFILE.email}`} className="text-[#F7D928] hover:underline">
            {PROFILE.email}
          </a>
        </span>
      </div>

      {/* Genuine delivery feedback states */}
      {submission.status === 'sent' && (
        <div
          role="status"
          className="rounded-2xl bg-[#202916] border border-[#729944]/40 p-4 text-sm text-[#e8f5d6] flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-[#9fd95b] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Message delivered successfully.</p>
            <p className="text-xs text-[#cfe0bb] mt-1">
              Thank you for reaching out. Zara Rafiq will review your message and reply via email.
            </p>
          </div>
        </div>
      )}

      {submission.status === 'fallback_ready' && (
        <div
          role="status"
          className="rounded-2xl bg-[#242214] border border-[#F7D928]/45 p-4 text-sm text-[#F5F5F4] space-y-3"
        >
          <div className="flex items-start gap-2.5">
            <Mail className="w-5 h-5 text-[#F7D928] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#F7D928]">
                Direct Email Delivery Ready
              </p>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                This static deployment does not have a live mail-relay endpoint (`VITE_CONTACT_ENDPOINT`) configured yet. Your validated message is ready to send directly through your email application:
              </p>
            </div>
          </div>
          <a
            href={submission.mailtoUrl}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#F7D928] hover:bg-[#e5c617] text-[#111111] font-semibold text-xs sm:text-sm transition-colors"
          >
            <Mail className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            <span>Open Email Client to Send to {PROFILE.email}</span>
          </a>
        </div>
      )}

      {submission.status === 'error' && (
        <div
          role="alert"
          className="rounded-2xl bg-[#2a1717] border border-red-400/40 p-4 text-sm text-red-100 space-y-3"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs sm:text-sm leading-relaxed">{submission.message}</p>
          </div>
          <a
            href={submission.mailtoUrl}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-full bg-white text-[#111111] font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors"
          >
            <Mail className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            <span>Send Directly via Email</span>
          </a>
        </div>
      )}
    </form>
  );
}
