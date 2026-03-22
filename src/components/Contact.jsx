import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Send,
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { whatsappMessages } from '../config/whatsapp';

const social = [
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Invalid email.';
  if (!values.subject.trim()) errors.subject = 'Subject is required.';
  if (!values.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validateContact(form);
    setErrors(v);
    if (Object.keys(v).length) {
      toast.error('Please complete all fields correctly.');
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log('[Contact API simulation]', { ...form, at: new Date().toISOString() });
    setSending(false);
    setForm({ name: '', email: '', subject: '', message: '' });
    toast.success('Message sent! We will reply soon.');
  };

  const field =
    'relative rounded-2xl border border-white/30 bg-white/10 px-4 pt-5 pb-2 backdrop-blur-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900';

  return (
    <section
      id="contact"
      ref={ref}
      className="relative scroll-mt-24 bg-gradient-to-b from-slate-50 to-blue-50/40 py-24 dark:from-slate-950 dark:to-slate-900"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 id="contact-heading" className="font-display text-4xl font-extrabold sm:text-5xl">
              <span className="text-gradient">Get In Touch</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Prefer a quick chat? Reach us any weekday — we respond with the same care we bring to every clean.
            </p>

            <ul className="mt-10 space-y-4">
              <li>
                <a
                  href="tel:+251905077915"
                  className="group flex min-h-[44px] items-center gap-4 rounded-2xl border border-white/30 bg-white/10 p-4 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                  aria-label="Call us"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-green-500 text-white shadow-md">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Phone</p>
                    <p className="font-semibold text-slate-900 dark:text-white">+251 905 077 915</p>
                  </div>
                </a>
              </li>
              <li>
                <WhatsAppButton
                  message={whatsappMessages.contact}
                  className="group flex min-h-[44px] w-full items-center gap-4 rounded-2xl border border-green-500/35 bg-green-500/10 p-4 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-green-400/30 dark:bg-green-500/10"
                  ariaLabel="Chat on WhatsApp"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white shadow-md">
                    <WhatsAppIcon size={26} />
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">WhatsApp</p>
                    <p className="font-semibold text-slate-900 dark:text-white">Chat on WhatsApp</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">+251 905 077 915</p>
                  </div>
                </WhatsAppButton>
              </li>
              <li>
                <a
                  href="mailto:info@kemalselamfriends.com"
                  className="group flex min-h-[44px] items-center gap-4 rounded-2xl border border-white/30 bg-white/10 p-4 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                  aria-label="Email us"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</p>
                    <p className="font-semibold text-slate-900 dark:text-white">info@kemalselamfriends.com</p>
                  </div>
                </a>
              </li>
              <li className="flex min-h-[44px] items-center gap-4 rounded-2xl border border-white/30 bg-white/10 p-4 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-green-500 text-white shadow-md">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Location</p>
                  <p className="font-semibold text-slate-900 dark:text-white">Addis Ababa, Ethiopia</p>
                </div>
              </li>
              <li className="flex min-h-[44px] items-center gap-4 rounded-2xl border border-white/30 bg-white/10 p-4 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-green-400 text-white shadow-md">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Hours</p>
                  <p className="font-semibold text-slate-900 dark:text-white">Monday – Saturday, 8:00 AM – 6:00 PM</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-green-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-glow"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="rounded-3xl border border-white/40 bg-white/20 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Send a message</h3>
            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
              <div className={field}>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="peer block w-full bg-transparent pt-1 text-slate-900 outline-none dark:text-white"
                  placeholder=" "
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'c-err-name' : undefined}
                  aria-label="Your name"
                />
                <label
                  htmlFor="contact-name"
                  className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400"
                >
                  Name
                </label>
                {errors.name && (
                  <p id="c-err-name" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className={field}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="peer block w-full bg-transparent pt-1 text-slate-900 outline-none dark:text-white"
                  placeholder=" "
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'c-err-email' : undefined}
                  aria-label="Your email"
                />
                <label
                  htmlFor="contact-email"
                  className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400"
                >
                  Email
                </label>
                {errors.email && (
                  <p id="c-err-email" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className={field}>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="peer block w-full bg-transparent pt-1 text-slate-900 outline-none dark:text-white"
                  placeholder=" "
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'c-err-sub' : undefined}
                  aria-label="Subject"
                />
                <label
                  htmlFor="contact-subject"
                  className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400"
                >
                  Subject
                </label>
                {errors.subject && (
                  <p id="c-err-sub" className="mt-1 text-sm text-red-600">
                    {errors.subject}
                  </p>
                )}
              </div>
              <div className={field}>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  className="peer block w-full resize-y bg-transparent pt-3 text-slate-900 outline-none dark:text-white"
                  placeholder=" "
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'c-err-msg' : undefined}
                  aria-label="Message"
                />
                <label
                  htmlFor="contact-message"
                  className="pointer-events-none absolute left-4 top-5 text-slate-500 transition-all duration-300 peer-focus:-translate-y-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400"
                >
                  Message
                </label>
                {errors.message && (
                  <p id="c-err-msg" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 py-3.5 text-base font-bold text-white shadow-xl transition-all duration-300 hover:shadow-glow disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <LoadingSpinner onGradient label="Sending message" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" aria-hidden />
                    Send message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-16 overflow-hidden rounded-3xl border border-white/30 shadow-2xl"
        >
          <iframe
            title="Map showing Addis Ababa, Ethiopia — Kemal Selam Friends service area"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252301.86193463436!2d38.46628022487822!3d8.99632106216716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8468ec2c2230d553!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
            className="h-[320px] w-full border-0 grayscale-[20%] contrast-[1.05] sm:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
