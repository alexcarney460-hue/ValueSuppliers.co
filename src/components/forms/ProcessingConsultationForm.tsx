'use client';

import { ArrowRight } from 'lucide-react';
import FormSubmit from '@/components/FormSubmit';

const FACILITY_TYPES = [
  'Licensed Cannabis Grow',
  'Processing / Extraction Facility',
  'Commercial Greenhouse',
  'Craft Cultivator',
  'Other',
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1px solid var(--color-border, #E2E8F0)',
  fontSize: '0.88rem',
  color: 'var(--color-charcoal, #0F172A)',
  background: '#FAFAF9',
  outline: 'none',
  fontFamily: 'inherit',
};

export default function ProcessingConsultationForm() {
  return (
    <FormSubmit
      formType="processing_consultation"
      fields={['first_name', 'last_name', 'email', 'phone', 'company_name', 'facility_type', 'city', 'state', 'message']}
      successMessage="Consultation request received!"
    >
      {({ values, onChange, status }) => (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>First Name</label>
              <input type="text" required placeholder="First Name" value={values.first_name} onChange={(e) => onChange('first_name', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>Last Name</label>
              <input type="text" required placeholder="Last Name" value={values.last_name} onChange={(e) => onChange('last_name', e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div>
            <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>Email Address</label>
            <input type="email" required placeholder="you@example.com" value={values.email} onChange={(e) => onChange('email', e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>Phone Number</label>
            <input type="tel" required placeholder="(555) 000-0000" value={values.phone} onChange={(e) => onChange('phone', e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>Company / Facility Name</label>
            <input type="text" required placeholder="Your facility name" value={values.company_name} onChange={(e) => onChange('company_name', e.target.value)} style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>City</label>
              <input type="text" placeholder="City" value={values.city} onChange={(e) => onChange('city', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>State</label>
              <input type="text" placeholder="CA" value={values.state} onChange={(e) => onChange('state', e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div>
            <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>Facility Type</label>
            <select value={values.facility_type} onChange={(e) => onChange('facility_type', e.target.value)} style={inputStyle} required>
              <option value="">Select your facility type</option>
              {FACILITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="label-caps" style={{ display: 'block', marginBottom: 8, color: 'var(--color-charcoal)', fontSize: '0.68rem' }}>Tell Us About Your Operation</label>
            <textarea rows={5} required placeholder="Harvest size, timeline, any specific needs..." value={values.message} onChange={(e) => onChange('message', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <button type="submit" disabled={status === 'submitting'} style={{
            backgroundColor: 'var(--color-forest)', color: '#fff', border: 'none', borderRadius: 9999,
            padding: '14px 28px', fontFamily: "'Barlow', Arial, sans-serif", fontWeight: 700,
            fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'var(--shadow-forest)', opacity: status === 'submitting' ? 0.6 : 1,
          }}>
            {status === 'submitting' ? 'Sending...' : <>Request Consultation <ArrowRight size={14} /></>}
          </button>
        </>
      )}
    </FormSubmit>
  );
}
