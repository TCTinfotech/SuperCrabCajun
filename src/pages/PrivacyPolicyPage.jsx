import React from 'react';
import { ShieldCheck, FileText, Lock, Eye, Server, Cookie, UserCheck, ShieldAlert, RefreshCw, Mail, Phone, MapPin, Globe } from 'lucide-react';
import SEOHead from '../components/layout/SEOHead';
import { useScrollReveal } from '../utils/scrollReveal';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  useScrollReveal();

  return (
    <div className="privacy-policy-page">
      <SEOHead
        title="Privacy Policy | Super Crab Cajun"
        description="Privacy Policy for Super Crab Cajun. Learn how we collect, use, disclose, and safeguard your personal information when visiting our website."
        canonicalUrl="/privacy-policy"
      />

      {/* Hero Header Banner */}
      <section className="privacy-hero-banner">
        <div className="container banner-text reveal">
          <span className="banner-subtitle">Legal & Transparency</span>
          <h1 className="banner-title text-gradient">PRIVACY POLICY</h1>
          <p className="banner-desc banner-desc--light">
            At Super Crab Cajun, we respect your privacy and are committed to protecting the personal information you share with us.
          </p>
          <div className="policy-dates-badge">
            <span><strong>Effective Date:</strong> 8/1/2026</span>
            <span className="date-divider">•</span>
            <span><strong>Last Updated:</strong> 8/1/2026</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="privacy-content-section section-padding">
        <div className="container privacy-container">

          {/* Intro Card */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <ShieldCheck className="card-icon" size={28} />
              <h2>Our Privacy Commitment</h2>
            </div>
            <p className="privacy-intro-text">
              At <strong>Super Crab Cajun</strong> ("we," "our," or "us"), accessible from{' '}
              <a href="https://www.supercrabcajun.com/" target="_blank" rel="noopener noreferrer" className="privacy-link">
                https://www.supercrabcajun.com/
              </a>
              , we respect your privacy and are committed to protecting the personal information you share with us.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>

          {/* Section 1 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <Eye className="card-icon" size={26} />
              <h2>1. Information We Collect</h2>
            </div>
            <p>We may collect personal and non-personal information from you in various ways when you interact with our website:</p>
            
            <div className="policy-subgroup">
              <h3>Personal Data Provided Voluntarily</h3>
              <p>When you place an online order, make a reservation, subscribe to a newsletter, or contact us, we may collect personal details such as:</p>
              <ul className="policy-list">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Delivery address</li>
                <li>Billing details (processed securely via third-party payment processors)</li>
              </ul>
            </div>

            <div className="policy-subgroup">
              <h3>Automatically Collected Data</h3>
              <p>When you browse our website, our servers and third-party tools (such as web hosting and analytics providers) may automatically record standard technical data, including:</p>
              <ul className="policy-list">
                <li>IP address</li>
                <li>Browser type and operating system</li>
                <li>Device information</li>
                <li>Pages viewed, time spent, and referring URLs</li>
              </ul>
            </div>

            <div className="policy-subgroup">
              <h3>Cookies and Tracking Technologies</h3>
              <p>
                We may use cookies, web beacons, and similar tracking technologies to enhance user experience, analyze traffic, and remember your preferences.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <FileText className="card-icon" size={26} />
              <h2>2. How We Use Your Information</h2>
            </div>
            <p>We use the information we collect for various business purposes, including to:</p>
            <ul className="policy-list">
              <li>Process and fulfill online orders, reservations, or customer support requests.</li>
              <li>Communicate with you regarding orders, updates, promotional offers, or administrative notices.</li>
              <li>Improve, maintain, and optimize website functionality and user experience.</li>
              <li>Monitor traffic and usage patterns to protect against fraud or security risks.</li>
              <li>Comply with legal obligations and enforce our site policies.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <Server className="card-icon" size={26} />
              <h2>3. Sharing and Disclosure of Information</h2>
            </div>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your data under the following circumstances:</p>
            <ul className="policy-list">
              <li>
                <strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, processing payments, delivering food orders, or conducting analytics (e.g., Netlify hosting, payment gateways).
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law, subpoena, or government regulation, or to protect the safety, rights, or property of Super Crab Cajun, our users, or others.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <Globe className="card-icon" size={26} />
              <h2>4. Third-Party Links and Services</h2>
            </div>
            <p>
              Our website is hosted on Netlify and may contain links to external sites or third-party services (such as food delivery platforms or social media pages). We are not responsible for the privacy practices or content of third-party websites. We encourage you to review the privacy policies of any site you visit.
            </p>
          </div>

          {/* Section 5 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <Lock className="card-icon" size={26} />
              <h2>5. Data Security</h2>
            </div>
            <p>
              We implement reasonable technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </div>

          {/* Section 6 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <UserCheck className="card-icon" size={26} />
              <h2>6. Your Rights and Choices</h2>
            </div>
            <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
            <ul className="policy-list">
              <li>
                <strong>Access and Correction:</strong> Request a copy of the personal data we hold about you or ask us to correct inaccurate information.
              </li>
              <li>
                <strong>Deletion:</strong> Request the erasure of your personal information, subject to legal retention obligations.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from promotional emails at any time by clicking the "Unsubscribe" link or contacting us directly.
              </li>
              <li>
                <strong>Cookie Management:</strong> Adjust your web browser settings to block or delete cookies.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <ShieldAlert className="card-icon" size={26} />
              <h2>7. Children's Privacy</h2>
            </div>
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can remove it.
            </p>
          </div>

          {/* Section 8 */}
          <div className="privacy-card glass-card reveal">
            <div className="privacy-card-header">
              <RefreshCw className="card-icon" size={26} />
              <h2>8. Changes to This Privacy Policy</h2>
            </div>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the updated policy on this page with a revised "Last Updated" date.
            </p>
          </div>

          {/* Section 9 */}
          <div className="privacy-card glass-card contact-policy-card reveal">
            <div className="privacy-card-header">
              <Mail className="card-icon" size={26} />
              <h2>9. Contact Us</h2>
            </div>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>

            <div className="contact-details-grid">
              <div className="contact-detail-item">
                <span className="detail-label">Business Name:</span>
                <span className="detail-value">Super Crab Cajun</span>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label"><Globe size={18} /> Website:</span>
                <span className="detail-value">
                  <a href="https://www.supercrabcajun.com/" target="_blank" rel="noopener noreferrer">
                    https://www.supercrabcajun.com/
                  </a>
                </span>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label"><Mail size={18} /> Email:</span>
                <span className="detail-value">
                  <a href="mailto:info@supercrabcajun.com">info@supercrabcajun.com</a>
                </span>
              </div>
              <div className="contact-detail-item full-width">
                <span className="detail-label"><MapPin size={18} /> Address:</span>
                <span className="detail-value">3506 Palmer Hwy, Texas City, TX 77590, USA</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
