import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { format, startOfToday } from 'date-fns';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { useWindowSize } from '../hooks/useWindowSize';
import LoadingSpinner from './LoadingSpinner';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { buildBookingWhatsAppBody } from '../config/whatsapp';
import { CalendarCheck } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Home Cleaning',
  'Office Cleaning',
  'Deep Cleaning',
  'Move-in/Move-out Cleaning',
  'Carpet & Upholstery Cleaning',
  'Window Cleaning',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  serviceType: '',
  preferredDate: '',
  address: '',
  notes: '',
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  const phoneDigits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) errors.phone = 'Phone is required.';
  else if (phoneDigits.length < 9) errors.phone = 'Enter a valid phone number.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email.';
  if (!values.serviceType) errors.serviceType = 'Choose a service type.';
  if (!values.preferredDate) errors.preferredDate = 'Pick a preferred date.';
  else {
    const picked = new Date(values.preferredDate + 'T12:00:00');
    if (picked < startOfToday()) errors.preferredDate = 'Date cannot be in the past.';
  }
  if (!values.address.trim()) errors.address = 'Service address is required.';
  return errors;
}

/**
 * Premium booking form — client validation, loading state, confetti on success.
 */
export default function Booking() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const { width, height } = useWindowSize();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const minDateStr = format(startOfToday(), 'yyyy-MM-dd');

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    console.log('[Booking API simulation]', { ...form, submittedAt: new Date().toISOString() });
    setSubmitting(false);
    setForm(initialForm);
    setErrors({});
    setShowConfetti(true);
    toast.success('Booking received! We will contact you shortly.');
    window.setTimeout(() => setShowConfetti(false), 4500);
  };

  const fieldWrap =
    'relative rounded-2xl border border-white/30 bg-white/10 px-4 pt-5 pb-2 backdrop-blur-lg transition-all duration-300 focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-white/80 dark:focus-within:ring-offset-slate-900';

  return (
    <section
      id="booking"
      ref={ref}
      className="relative scroll-mt-24 bg-gradient-to-b from-slate-50 to-white py-24 dark:from-slate-950 dark:to-slate-900"
      aria-labelledby="booking-heading"
    >
      {showConfetti && width > 0 && height > 0 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={220}
          recycle={false}
          gravity={0.22}
          colors={['#2563eb', '#22c55e', '#38bdf8', '#a7f3d0', '#fff']}
        />
      )}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-green-400">
            <CalendarCheck className="h-4 w-4" aria-hidden />
            Book with confidence
          </p>
          <h2
            id="booking-heading"
            className="mt-3 font-display text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl"
          >
            Schedule your <span className="text-gradient">cleaning visit</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Tell us what you need — we will confirm details and arrive on time, every time.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-white/40 bg-white/20 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-10"
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(34,197,94,0.06))',
            }}
          />

          <div className="relative grid gap-6 sm:grid-cols-2">
            <div className={fieldWrap}>
              <input
                id="booking-name"
                name="name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                className="peer block w-full bg-transparent pt-1 text-slate-900 outline-none dark:text-white"
                placeholder=" "
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
                aria-label="Full name"
              />
              <label
                htmlFor="booking-name"
                className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-green-400"
              >
                Name
              </label>
              {errors.name && (
                <p id="err-name" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div className={fieldWrap}>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={onChange}
                autoComplete="tel"
                className="peer block w-full bg-transparent pt-1 text-slate-900 outline-none dark:text-white"
                placeholder=" "
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
                aria-label="Phone number"
              />
              <label
                htmlFor="booking-phone"
                className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-green-400"
              >
                Phone
              </label>
              {errors.phone && (
                <p id="err-phone" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className={`sm:col-span-2 ${fieldWrap}`}>
              <input
                id="booking-email"
                name="email"
                type="email"
                inputMode="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                className="peer block w-full bg-transparent pt-1 text-slate-900 outline-none dark:text-white"
                placeholder=" "
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
                aria-label="Email address"
              />
              <label
                htmlFor="booking-email"
                className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-green-400"
              >
                Email
              </label>
              {errors.email && (
                <p id="err-email" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div className={fieldWrap}>
              <select
                id="booking-service"
                name="serviceType"
                value={form.serviceType}
                onChange={onChange}
                className="peer block w-full bg-transparent pt-3 text-slate-900 outline-none dark:text-white"
                aria-invalid={!!errors.serviceType}
                aria-describedby={errors.serviceType ? 'err-service' : undefined}
                aria-label="Service type"
              >
                <option value="" disabled>
                  Select service
                </option>
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o} value={o} className="text-slate-900">
                    {o}
                  </option>
                ))}
              </select>
              <label
                htmlFor="booking-service"
                className="pointer-events-none absolute left-4 top-3 text-xs font-medium text-blue-600 dark:text-green-400"
              >
                Service type
              </label>
              {errors.serviceType && (
                <p id="err-service" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.serviceType}
                </p>
              )}
            </div>

            <div className={fieldWrap}>
              <input
                id="booking-date"
                name="preferredDate"
                type="date"
                min={minDateStr}
                value={form.preferredDate}
                onChange={onChange}
                className="peer block w-full bg-transparent pt-3 text-slate-900 outline-none dark:text-white"
                aria-invalid={!!errors.preferredDate}
                aria-describedby={errors.preferredDate ? 'err-date' : undefined}
                aria-label="Preferred date"
              />
              <label
                htmlFor="booking-date"
                className="pointer-events-none absolute left-4 top-3 text-xs font-medium text-blue-600 dark:text-green-400"
              >
                Preferred date
              </label>
              {errors.preferredDate && (
                <p id="err-date" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            <div className={`sm:col-span-2 ${fieldWrap}`}>
              <textarea
                id="booking-address"
                name="address"
                rows={3}
                value={form.address}
                onChange={onChange}
                className="peer block w-full resize-y bg-transparent pt-3 text-slate-900 outline-none dark:text-white"
                placeholder=" "
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'err-address' : undefined}
                aria-label="Service address"
              />
              <label
                htmlFor="booking-address"
                className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-green-400"
              >
                Address
              </label>
              {errors.address && (
                <p id="err-address" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.address}
                </p>
              )}
            </div>

            <div className={`sm:col-span-2 ${fieldWrap}`}>
              <textarea
                id="booking-notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={onChange}
                className="peer block w-full resize-y bg-transparent pt-3 text-slate-900 outline-none dark:text-white"
                placeholder=" "
                aria-label="Additional notes optional"
              />
              <label
                htmlFor="booking-notes"
                className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-green-400"
              >
                Additional notes (optional)
              </label>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 px-10 py-3.5 text-base font-bold text-white shadow-xl shadow-blue-600/35 transition-all duration-300 hover:scale-105 hover:shadow-glow disabled:pointer-events-none disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <LoadingSpinner onGradient label="Submitting booking" />
                  Sending…
                </>
              ) : (
                'Submit booking'
              )}
            </motion.button>
            <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
              <WhatsAppButton
                message={buildBookingWhatsAppBody(form)}
                className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center gap-2 rounded-2xl border-2 border-green-500 bg-green-500/10 px-8 py-3.5 text-base font-bold text-green-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-500/20 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-500/15"
                ariaLabel="Send booking request via WhatsApp"
              >
                <WhatsAppIcon size={24} className="shrink-0" />
                Send via WhatsApp
              </WhatsAppButton>
            </motion.div>
          </div>
          <p className="relative mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            WhatsApp opens in a new tab with your details filled in. You can edit the message before sending.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
