"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Send, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Avenue des Champs-Élysées", "75008 Paris, France"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+33 1 23 45 67 89", "Mon-Sat: 10am - 8pm"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["contact@Raj MP Online.com", "support@Raj MP Online.com"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Monday - Saturday: 10am - 8pm", "Sunday: 12pm - 6pm"],
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" })
  }

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  }

  return (
    <div className="min-h-screen pt-[56px] overflow-hidden">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contact us"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 flex items-end">
          <motion.div 
            className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Get in Touch
            </p>
            <h1 className="mt-4 font-serif text-5xl font-light tracking-tight sm:text-6xl">
              Contact Us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact form and info */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-light tracking-tight">
                Send Us a Message
              </h2>
              <p className="mt-4 text-muted-foreground">
                We&apos;d love to hear from you. Fill out the form below and we&apos;ll 
                get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-8 rounded-2xl bg-primary/10 p-8 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary"
                  >
                    <Check className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="mt-6 font-serif text-2xl font-medium">Thank You!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Your message has been sent successfully. We&apos;ll be in touch shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                      <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                      <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium">Email</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium">Phone <span className="text-muted-foreground">(optional)</span></label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary">
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="returns">Returns & Exchanges</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary resize-none" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-medium text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? (<><div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />Sending...</>) : (<><Send className="h-5 w-5" />Send Message</>)}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div 
              className="lg:pl-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-light tracking-tight">Visit Our Flagship Store</h2>
              <p className="mt-4 text-muted-foreground">Experience our full collection and receive personalized styling consultations at our Paris flagship location.</p>

              <motion.div 
                className="mt-8 grid gap-6 sm:grid-cols-2"
                variants={containerVars}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {contactInfo.map((info) => (
                  <motion.div variants={itemVars} key={info.title} className="rounded-xl bg-secondary/50 p-6 transition-colors hover:bg-secondary">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-medium">{info.title}</h3>
                    <div className="mt-2 space-y-1">
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}
              >
                <h3 className="font-medium">Follow Us</h3>
                <div className="mt-4 flex gap-4">
                  {[
                    { icon: Instagram, href: "https://www.instagram.com/raj_mp.online/", label: "Instagram" },
                    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  ].map((social) => (
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground" aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div 
                className="mt-8 overflow-hidden rounded-2xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-video bg-secondary">
                  <Image src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" alt="Paris location" fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-background px-6 py-3 font-medium shadow-luxury transition-transform hover:scale-105">Open in Maps</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-secondary/50 py-16">
        <motion.div 
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="font-serif text-3xl font-light tracking-tight">Have Questions?</h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">Check out our frequently asked questions for quick answers about shipping, returns, sizing, and more.</p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-lg border border-foreground/20 px-8 py-4 font-medium transition-all hover:border-primary hover:text-primary">
            View FAQ
          </button>
        </motion.div>
      </section>
    </div>
  )
}
