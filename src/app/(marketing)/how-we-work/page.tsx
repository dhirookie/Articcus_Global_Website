import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { css } from '@/lib/styles';
import { Cta } from '@/components/layout/cta';
import { Tabs, Tab, TabPanel, TabSelectButton } from '@/components/ui/tabs';

export const metadata = pageMetadata(
  'How we work · Articcus',
  'The six steps Articcus follows from the first discovery call to launch and long-term support.',
  '/how-we-work',
);

export default function HowWeWorkPage() {
  return (
    <>
      <main id="main">
        <section className="phero" aria-labelledby="page-title">
          <div className="wrap phero-inner">
            <div className="phero-copy">
              <p className="crumbs">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>How we work</span>
              </p>
              <p className="eyebrow">How we work</p>
              <h1 className="h1 sm" id="page-title">
                From first call to launch in six clear steps
              </h1>
              <p className="lead">No surprises on scope, price or timing.</p>
              <div className="phero-ctas">
                <Link className="btn btn-primary btn-lg" href="/contact#start">
                  Start with step one
                  <svg className="ic arrow" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="phero-art" aria-hidden="true">
              <svg className="arrows" viewBox="0 0 344 339">
                <use href="#arrows"></use>
              </svg>
              <span
                className="ft c3"
                style={css({ left: '0', top: '10px', '--r': '-8deg' })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-clock"></use>
                </svg>
              </span>
              <span
                className="ft c5"
                style={css({
                  left: '40px',
                  bottom: '6px',
                  '--r': '6deg',
                  '--dl': '-2s',
                })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-check"></use>
                </svg>
              </span>
              <span
                className="ft c6"
                style={css({
                  right: '0',
                  bottom: '30px',
                  '--r': '-5deg',
                  '--dl': '-4s',
                })}
                aria-hidden="true"
              >
                <svg className="ic" aria-hidden="true">
                  <use href="#i-doc"></use>
                </svg>
              </span>
            </div>
          </div>
        </section>
        <section className="sec" id="process" aria-labelledby="steps-title">
          <Tabs>
            <div className="wrap">
              <div className="sec-head reveal">
                <p className="eyebrow">Your project, step by step</p>
                <h2 className="h2" id="steps-title">
                  Click a step to see what happens
                </h2>
              </div>
              <div
                className="steps"
                role="tablist"
                aria-label="Project steps"
                id="steps"
              >
                <Tab
                  index={0}
                  type="button"
                  className="step-btn"
                  role="tab"
                  id="st-0"
                  aria-controls="sp-0"
                >
                  <span className="step-num">1</span>
                  <span className="step-title">Discovery call</span>
                  <span className="step-when">30 minutes, free</span>
                </Tab>
                <Tab
                  index={1}
                  type="button"
                  className="step-btn"
                  role="tab"
                  id="st-1"
                  aria-controls="sp-1"
                >
                  <span className="step-num">2</span>
                  <span className="step-title">Scope and estimate</span>
                  <span className="step-when">3–5 working days</span>
                </Tab>
                <Tab
                  index={2}
                  type="button"
                  className="step-btn"
                  role="tab"
                  id="st-2"
                  aria-controls="sp-2"
                >
                  <span className="step-num">3</span>
                  <span className="step-title">Proposal walkthrough</span>
                  <span className="step-when">Valid for 30 days</span>
                </Tab>
                <Tab
                  index={3}
                  type="button"
                  className="step-btn"
                  role="tab"
                  id="st-3"
                  aria-controls="sp-3"
                >
                  <span className="step-num">4</span>
                  <span className="step-title">Agreement and kickoff</span>
                  <span className="step-when">Within 2 working days</span>
                </Tab>
                <Tab
                  index={4}
                  type="button"
                  className="step-btn"
                  role="tab"
                  id="st-4"
                  aria-controls="sp-4"
                >
                  <span className="step-num">5</span>
                  <span className="step-title">Build in milestones</span>
                  <span className="step-when">Weekly updates</span>
                </Tab>
                <Tab
                  index={5}
                  type="button"
                  className="step-btn"
                  role="tab"
                  id="st-5"
                  aria-controls="sp-5"
                >
                  <span className="step-num">6</span>
                  <span className="step-title">Launch and support</span>
                  <span className="step-when">30-day warranty</span>
                </Tab>
              </div>
              <TabPanel
                index={0}
                className="step-panel"
                role="tabpanel"
                id="sp-0"
                aria-labelledby="st-0"
              >
                <div className="sp-main">
                  <span className="sp-when">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-clock"></use>
                    </svg>
                    30 minutes, free
                  </span>
                  <h3 className="h3">
                    We learn how your business really works
                  </h3>
                  <p>
                    You show us how work flows today, where it breaks and what
                    it costs.
                  </p>
                  <div className="sp-nav">
                    <TabSelectButton
                      index={1}
                      type="button"
                      className="btn btn-primary"
                    >
                      Next: Scope and estimate
                      <svg className="ic arrow" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                    </TabSelectButton>
                  </div>
                </div>
                <dl className="sp-side">
                  <div className="sp-box">
                    <dt>You get</dt>
                    <dd>A written summary within 24 hours.</dd>
                  </div>
                  <div className="sp-box">
                    <dt>Your part</dt>
                    <dd>Tell us what&apos;s not working.</dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel
                index={1}
                className="step-panel"
                role="tabpanel"
                id="sp-1"
                aria-labelledby="st-1"
              >
                <div className="sp-main">
                  <span className="sp-when">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-clock"></use>
                    </svg>
                    3–5 working days
                  </span>
                  <h3 className="h3">Our tech lead scopes the work properly</h3>
                  <p>
                    We estimate each part and list third-party costs separately,
                    so nothing is hidden.
                  </p>
                  <div className="sp-nav">
                    <TabSelectButton
                      index={0}
                      type="button"
                      className="btn btn-outline"
                    >
                      Back
                    </TabSelectButton>
                    <TabSelectButton
                      index={2}
                      type="button"
                      className="btn btn-primary"
                    >
                      Next: Proposal walkthrough
                      <svg className="ic arrow" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                    </TabSelectButton>
                  </div>
                </div>
                <dl className="sp-side">
                  <div className="sp-box">
                    <dt>You get</dt>
                    <dd>A costed estimate, never a guess.</dd>
                  </div>
                  <div className="sp-box">
                    <dt>Your part</dt>
                    <dd>Answer a few follow-up questions.</dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel
                index={2}
                className="step-panel"
                role="tabpanel"
                id="sp-2"
                aria-labelledby="st-2"
              >
                <div className="sp-main">
                  <span className="sp-when">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-clock"></use>
                    </svg>
                    Valid for 30 days
                  </span>
                  <h3 className="h3">We present the proposal live</h3>
                  <p>Scope, timeline and price, explained in plain language.</p>
                  <div className="sp-nav">
                    <TabSelectButton
                      index={1}
                      type="button"
                      className="btn btn-outline"
                    >
                      Back
                    </TabSelectButton>
                    <TabSelectButton
                      index={3}
                      type="button"
                      className="btn btn-primary"
                    >
                      Next: Agreement and kickoff
                      <svg className="ic arrow" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                    </TabSelectButton>
                  </div>
                </div>
                <dl className="sp-side">
                  <div className="sp-box">
                    <dt>You get</dt>
                    <dd>A clear written proposal.</dd>
                  </div>
                  <div className="sp-box">
                    <dt>Your part</dt>
                    <dd>Bring the decision makers.</dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel
                index={3}
                className="step-panel"
                role="tabpanel"
                id="sp-3"
                aria-labelledby="st-3"
              >
                <div className="sp-main">
                  <span className="sp-when">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-clock"></use>
                    </svg>
                    Within 2 working days
                  </span>
                  <h3 className="h3">We sign, then start fast</h3>
                  <p>
                    Once signed and the 40% advance is in, you meet your project
                    manager.
                  </p>
                  <div className="sp-nav">
                    <TabSelectButton
                      index={2}
                      type="button"
                      className="btn btn-outline"
                    >
                      Back
                    </TabSelectButton>
                    <TabSelectButton
                      index={4}
                      type="button"
                      className="btn btn-primary"
                    >
                      Next: Build in milestones
                      <svg className="ic arrow" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                    </TabSelectButton>
                  </div>
                </div>
                <dl className="sp-side">
                  <div className="sp-box">
                    <dt>You get</dt>
                    <dd>A named project manager and a kickoff date.</dd>
                  </div>
                  <div className="sp-box">
                    <dt>Your part</dt>
                    <dd>Sign, pay the advance and share access.</dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel
                index={4}
                className="step-panel"
                role="tabpanel"
                id="sp-4"
                aria-labelledby="st-4"
              >
                <div className="sp-main">
                  <span className="sp-when">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-clock"></use>
                    </svg>
                    Weekly updates
                  </span>
                  <h3 className="h3">You see progress every week</h3>
                  <p>
                    Weekly updates and a review at every milestone. Changes are
                    agreed in writing.
                  </p>
                  <div className="sp-nav">
                    <TabSelectButton
                      index={3}
                      type="button"
                      className="btn btn-outline"
                    >
                      Back
                    </TabSelectButton>
                    <TabSelectButton
                      index={5}
                      type="button"
                      className="btn btn-primary"
                    >
                      Next: Launch and support
                      <svg className="ic arrow" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                    </TabSelectButton>
                  </div>
                </div>
                <dl className="sp-side">
                  <div className="sp-box">
                    <dt>You get</dt>
                    <dd>Progress you can see every week.</dd>
                  </div>
                  <div className="sp-box">
                    <dt>Your part</dt>
                    <dd>Give feedback on time.</dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel
                index={5}
                className="step-panel"
                role="tabpanel"
                id="sp-5"
                aria-labelledby="st-5"
              >
                <div className="sp-main">
                  <span className="sp-when">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-clock"></use>
                    </svg>
                    30-day warranty
                  </span>
                  <h3 className="h3">
                    We launch, train your team and stay with you
                  </h3>
                  <p>
                    30 days of free fixes, then full ownership and optional
                    support.
                  </p>
                  <div className="sp-nav">
                    <TabSelectButton
                      index={4}
                      type="button"
                      className="btn btn-outline"
                    >
                      Back
                    </TabSelectButton>
                    <Link className="btn btn-primary" href="/contact#start">
                      Start with step one
                      <svg className="ic arrow" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                    </Link>
                  </div>
                </div>
                <dl className="sp-side">
                  <div className="sp-box">
                    <dt>You get</dt>
                    <dd>A live product, a trained team and full ownership.</dd>
                  </div>
                  <div className="sp-box">
                    <dt>Your part</dt>
                    <dd>Test, approve and roll it out.</dd>
                  </div>
                </dl>
              </TabPanel>
            </div>
          </Tabs>
        </section>
        <section
          className="sec"
          style={css({ paddingTop: '0' })}
          aria-labelledby="think-title"
        >
          <div className="wrap split">
            <div className="split-copy reveal">
              <p className="eyebrow">How we think</p>
              <h2 className="h2" id="think-title">
                We start with what the problem costs you, not with technology
              </h2>
              <p className="lead">
                We find where your business loses time and money, then recommend
                the smallest fix and build from there.
              </p>
              <ul className="checks">
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  Every idea tied to money made, saved or protected
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  A written summary within 24 hours of every meeting
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  Prices checked by our tech lead first
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  You pay for work you have seen
                </li>
                <li>
                  <span className="tick">
                    <svg className="ic" aria-hidden="true">
                      <use href="#i-check"></use>
                    </svg>
                  </span>
                  Honest referrals when it isn&apos;t our specialty
                </li>
              </ul>
            </div>
            <div className="memo-wrap reveal" style={css({ '--d': '1' })}>
              <figure
                className="memo"
                aria-label="Example of a discovery meeting summary"
              >
                <div className="memo-head">
                  <div>
                    <small>To: you · From: Articcus</small>
                    <strong>Summary of our meeting</strong>
                  </div>
                  <span className="memo-tag">Example</span>
                </div>
                <dl>
                  <div>
                    <dt>How it works today</dt>
                    <dd>
                      Orders arrive on WhatsApp and are typed into Excel at the
                      end of each day.
                    </dd>
                  </div>
                  <div>
                    <dt>Main challenges</dt>
                    <dd>
                      Stock never matches the sheet, and invoices go out two
                      days late.
                    </dd>
                  </div>
                  <div>
                    <dt>What it costs you</dt>
                    <dd>
                      About 15 staff hours a week, plus orders lost when
                      messages are missed.
                    </dd>
                  </div>
                  <div>
                    <dt>What success looks like</dt>
                    <dd>
                      Same-day invoices and a live stock count for every branch.
                    </dd>
                  </div>
                  <div>
                    <dt>Next step</dt>
                    <dd>A costed estimate from our tech lead by Friday.</dd>
                  </div>
                </dl>
                <p className="memo-foot">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-clock"></use>
                  </svg>
                  Sent within 24 hours of every discovery meeting
                </p>
              </figure>
            </div>
          </div>
        </section>
        <section className="sec tight-top" aria-labelledby="promise-title">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Our promises</p>
              <h2 className="h2" id="promise-title">
                What you can expect from us on every project
              </h2>
            </div>
            <div className="promises">
              <article className="promise reveal" style={css({ '--d': '0' })}>
                <span className="model-ic c1">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-clock"></use>
                  </svg>
                </span>
                <h3>Replies the same working day</h3>
                <p>Every message answered the same working day.</p>
              </article>
              <article className="promise reveal" style={css({ '--d': '1' })}>
                <span className="model-ic c6">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-doc"></use>
                  </svg>
                </span>
                <h3>Everything in writing</h3>
                <p>Prices, scope and changes confirmed by email.</p>
              </article>
              <article className="promise reveal" style={css({ '--d': '2' })}>
                <span className="model-ic c5">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-repeat"></use>
                  </svg>
                </span>
                <h3>Weekly updates</h3>
                <p>Progress every week, reviewed at each milestone.</p>
              </article>
              <article className="promise reveal" style={css({ '--d': '0' })}>
                <span className="model-ic c3">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-target"></use>
                  </svg>
                </span>
                <h3>No work before agreement</h3>
                <p>We start once the scope is signed.</p>
              </article>
              <article className="promise reveal" style={css({ '--d': '1' })}>
                <span className="model-ic c2">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-shield"></use>
                  </svg>
                </span>
                <h3>Your information stays yours</h3>
                <p>We never share one client’s work with another.</p>
              </article>
              <article className="promise reveal" style={css({ '--d': '2' })}>
                <span className="model-ic c4">
                  <svg className="ic" aria-hidden="true">
                    <use href="#i-users"></use>
                  </svg>
                </span>
                <h3>Honest referrals</h3>
                <p>Not our specialty? We refer you to someone who is.</p>
              </article>
            </div>
          </div>
        </section>
        <Cta />
      </main>
    </>
  );
}
