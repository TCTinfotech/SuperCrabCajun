import React from 'react';
import { Sparkles, Flame, HelpCircle } from 'lucide-react';
import { BOIL_STEPS } from '../../utils/constants';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: BOIL_STEPS.step1.title,
      desc: BOIL_STEPS.step1.description,
      options: BOIL_STEPS.step1.options,
      icon: <HelpCircle size={28} className="step-icon-svg" />
    },
    {
      num: '02',
      title: BOIL_STEPS.step2.title,
      desc: BOIL_STEPS.step2.description,
      options: BOIL_STEPS.step2.options.map(opt => opt.name),
      icon: <Sparkles size={28} className="step-icon-svg" />
    },
    {
      num: '03',
      title: BOIL_STEPS.step3.title,
      desc: BOIL_STEPS.step3.description,
      options: BOIL_STEPS.step3.options.map(opt => opt.spice > 0 ? `${opt.name} (${'🌶️'.repeat(opt.spice)})` : opt.name),
      icon: <Flame size={28} className="step-icon-svg" />
    }
  ];

  return (
    <section className="how-it-works section-padding">
      {/* Texture Background */}
      <div className="how-it-works-diagonal" />

      <div className="container">
        {/* Header */}
        <div className="how-it-works-header reveal">
          <span className="subtitle-elegant">Build Your Boil</span>
          <h2 className="section-title-clean">
            HOW WE MAKE MAGIC HAPPEN
          </h2>
          <div className="section-separator">
            <span className="separator-line"></span>
            <span className="separator-icon">🦀</span>
            <span className="separator-line"></span>
          </div>
          <p className="section-description">
            Creating the perfect seafood boil is an art. Customize your dining experience in three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="steps-grid">
          {steps.map((step, idx) => {
            return (
              <div
                key={step.num}
                className={`step-card glass-card reveal reveal-delay-${idx + 1}`}
              >
                <div className="step-card-header">
                  <span className="step-number">{step.num}</span>
                  <div className="step-icon-container">{step.icon}</div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>

                <div className="step-options-container">
                  <span className="options-heading">Options include:</span>
                  <div className="step-badge-group">
                    {step.options.map((opt) => (
                      <span 
                        key={opt} 
                        className="step-badge"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
