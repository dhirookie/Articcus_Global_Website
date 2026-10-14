'use client';
import Link from 'next/link';
import type { FormEventHandler, ChangeEventHandler } from 'react';
import { css } from '@/lib/styles';
import { ServiceChips, IndustryOptions } from './service-chips';
import type { LeadErrors } from './lead-schema';

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLFormElement>;
  onIndustryChange: (value: string) => void;
  errors: LeadErrors;
  pending: boolean;
  industry: string;
  contact: string;
}
export function ContactFields({
  onSubmit,
  onChange,
  onIndustryChange,
  errors,
  pending,
  industry,
  contact,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      onChange={onChange}
      id="brief-form"
      noValidate={true}
      style={css({ display: 'grid', gap: '36px' })}
    >
      <p className="field-hint">
        Full name, company and email are required. Choose at least one service
        or describe the problem. A phone number is required only if you choose
        phone or WhatsApp contact.
      </p>
      <fieldset aria-describedby="svc-error">
        <legend className="f-step">
          <span>1</span>What do you need help with?
        </legend>
        <ServiceChips />
        <p className="hint">
          Not sure yet? Leave this empty and describe the problem below.
        </p>
        <p className="err" id="svc-error">
          {errors.services}
        </p>
      </fieldset>
      <fieldset>
        <legend className="f-step">
          <span>2</span>About your business
        </legend>
        <div className="row2">
          <div className="field">
            <label htmlFor="f-industry">Industry</label>
            <div className="select-wrap">
              <select
                className="input"
                id="f-industry"
                name="industry"
                value={industry}
                onChange={(event) => onIndustryChange(event.target.value)}
              >
                <option value="">Choose your industry</option>
                <IndustryOptions />
              </select>
              <svg className="ic" aria-hidden="true">
                <use href="#i-chev"></use>
              </svg>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-size">Team size</label>
            <div className="select-wrap">
              <select className="input" id="f-size" name="size">
                <option value="">Choose a range</option>
                <option>1–9 people</option>
                <option>10–50 people</option>
                <option>51–200 people</option>
                <option>More than 200 people</option>
              </select>
              <svg className="ic" aria-hidden="true">
                <use href="#i-chev"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className="field" role="group" aria-labelledby="timing-lbl">
          <span className="field-lbl" id="timing-lbl">
            When would you like to start?
          </span>
          <div className="chips">
            <span className="ck">
              <input
                type="radio"
                name="timing"
                id="t-now"
                value="As soon as possible"
              />
              <label htmlFor="t-now">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
                As soon as possible
              </label>
            </span>
            <span className="ck">
              <input
                type="radio"
                name="timing"
                id="t-3"
                value="Within 3 months"
              />
              <label htmlFor="t-3">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
                Within 3 months
              </label>
            </span>
            <span className="ck">
              <input
                type="radio"
                name="timing"
                id="t-6"
                value="In 3 to 6 months"
              />
              <label htmlFor="t-6">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
                In 3 to 6 months
              </label>
            </span>
            <span className="ck">
              <input
                type="radio"
                name="timing"
                id="t-x"
                value="Just exploring"
              />
              <label htmlFor="t-x">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
                Just exploring
              </label>
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-problem">
            {"What's not working today? "}
            <span className="opt">(recommended)</span>
          </label>
          <textarea
            className="input"
            id="f-problem"
            name="problem"
            rows={4}
            placeholder="For example: orders come in on WhatsApp and we type them into Excel every evening, so stock never matches."
          ></textarea>
        </div>
        <div className="field">
          <label htmlFor="f-budget">
            {'Budget range '}
            <span className="opt">(optional)</span>
          </label>
          <input
            className="input"
            id="f-budget"
            name="budget"
            autoComplete="off"
            placeholder="A rough range helps us suggest the right first step"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="f-step">
          <span>3</span>How can we reach you?
        </legend>
        <div className="row2">
          <div className="field">
            <label htmlFor="f-name">
              Full name <span className="required-label">Required</span>
            </label>
            <input
              className="input"
              id="f-name"
              name="name"
              required
              maxLength={120}
              autoComplete="name"
              aria-describedby="f-name-error"
              aria-invalid={!!errors.name}
            />
            <p className="err" id="f-name-error">
              {errors.name}
            </p>
          </div>
          <div className="field">
            <label htmlFor="f-company">
              Company <span className="required-label">Required</span>
            </label>
            <input
              className="input"
              id="f-company"
              name="company"
              required
              maxLength={200}
              autoComplete="organization"
              aria-describedby="f-company-error"
              aria-invalid={!!errors.company}
            />
            <p className="err" id="f-company-error">
              {errors.company}
            </p>
          </div>
        </div>
        <div className="row2">
          <div className="field">
            <label htmlFor="f-email">
              Work email <span className="required-label">Required</span>
            </label>
            <input
              className="input"
              id="f-email"
              name="email"
              required
              maxLength={254}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-describedby="f-email-error"
              aria-invalid={!!errors.email}
            />
            <p className="err" id="f-email-error">
              {errors.email}
            </p>
          </div>
          <div className="field">
            <label htmlFor="f-phone">
              {'Phone or WhatsApp '}
              <span className="opt" id="phone-opt">
                {contact === 'Email' ? '(optional)' : '(required)'}
              </span>
            </label>
            <input
              className="input"
              id="f-phone"
              name="phone"
              required={contact !== 'Email'}
              maxLength={60}
              type="tel"
              autoComplete="tel"
              placeholder="+94 77 123 4567"
              aria-describedby="f-phone-error"
              aria-invalid={!!errors.phone}
            />
            <p className="err" id="f-phone-error">
              {errors.phone}
            </p>
          </div>
        </div>
        <div className="field" role="group" aria-labelledby="contact-lbl">
          <span className="field-lbl" id="contact-lbl">
            Best way to reach you
          </span>
          <div className="chips">
            <span className="ck">
              <input
                type="radio"
                name="contact"
                id="c-email"
                value="Email"
                defaultChecked={true}
              />
              <label htmlFor="c-email">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
                Email
              </label>
            </span>
            <span className="ck">
              <input
                type="radio"
                name="contact"
                id="c-phone"
                value="Phone call"
              />
              <label htmlFor="c-phone">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
                Phone call
              </label>
            </span>
            <span className="ck">
              <input type="radio" name="contact" id="c-wa" value="WhatsApp" />
              <label htmlFor="c-wa">
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
                WhatsApp
              </label>
            </span>
          </div>
        </div>
      </fieldset>
      <div style={css({ display: 'grid', gap: '12px' })}>
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          id="f-submit"
          disabled={pending}
        >
          {pending ? (
            'Sending…'
          ) : (
            <>
              Send my brief
              <svg className="ic arrow" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </>
          )}
        </button>
        <p className="fine">
          We use your details to respond to your enquiry.{' '}
          <Link href="/privacy">How we handle your information</Link>.
        </p>
      </div>
      <div hidden>
        <label htmlFor="f-website">Leave this empty</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="form-status" role="alert">
        {errors.form}
      </p>
    </form>
  );
}
