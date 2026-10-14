'use client';
import { BriefAction } from '@/features/brief/brief-action';
import { Tabs, Tab, TabPanel } from '@/components/ui/tabs';

export function Personas() {
  return (
    <>
      <Tabs>
        <div className="ptabs">
          <div
            className="ptab-list"
            role="tablist"
            aria-label="Choose your role"
            aria-orientation="vertical"
            id="ptabs"
          >
            <Tab
              index={0}
              type="button"
              className="ptab"
              role="tab"
              id="pt-0"
              aria-controls="pp-0"
            >
              Owners and directors
            </Tab>
            <Tab
              index={1}
              type="button"
              className="ptab"
              role="tab"
              id="pt-1"
              aria-controls="pp-1"
            >
              Finance teams
            </Tab>
            <Tab
              index={2}
              type="button"
              className="ptab"
              role="tab"
              id="pt-2"
              aria-controls="pp-2"
            >
              Operations and logistics
            </Tab>
            <Tab
              index={3}
              type="button"
              className="ptab"
              role="tab"
              id="pt-3"
              aria-controls="pp-3"
            >
              Sales and customer service
            </Tab>
            <Tab
              index={4}
              type="button"
              className="ptab"
              role="tab"
              id="pt-4"
              aria-controls="pp-4"
            >
              Startups and overseas teams
            </Tab>
          </div>
          <div>
            <TabPanel
              index={0}
              className="ppanel"
              role="tabpanel"
              id="pp-0"
              aria-labelledby="pt-0"
              tabIndex={0}
            >
              <div className="pcard c6">
                <div>
                  <p className="pq-lbl">What we often hear</p>
                  <blockquote>
                    “I only find out how we really did at month end.”
                  </blockquote>
                </div>
                <div>
                  <p className="pb-lbl">What we build</p>
                  <div className="pchips">
                    <span>Dashboards</span>
                    <span>ERP</span>
                    <span>Custom portal</span>
                  </div>
                </div>
              </div>
              <div className="pcopy">
                <h3 className="h3">
                  See the whole business without chasing reports
                </h3>
                <p>
                  Sales, stock and cash in one live view, without the
                  spreadsheets.
                </p>
                <ul className="checks">
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Live dashboards for sales, stock and cash
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    One system instead of Excel and WhatsApp
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    A long-term partner who knows your business
                  </li>
                </ul>
                <div>
                  <BriefAction
                    services={['dash', 'erp', 'webapp']}
                    mode="navigate"
                    industry=""
                    className="btn btn-primary"
                  >
                    Build a brief for this
                    <svg className="ic arrow" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </BriefAction>
                </div>
              </div>
            </TabPanel>
            <TabPanel
              index={1}
              className="ppanel"
              role="tabpanel"
              id="pp-1"
              aria-labelledby="pt-1"
              tabIndex={0}
            >
              <div className="pcard c3">
                <div>
                  <p className="pq-lbl">What we often hear</p>
                  <blockquote>
                    “Invoices go out late and nothing reconciles.”
                  </blockquote>
                </div>
                <div>
                  <p className="pb-lbl">What we build</p>
                  <div className="pchips">
                    <span>Automation</span>
                    <span>Integrations</span>
                    <span>Dashboards</span>
                  </div>
                </div>
              </div>
              <div className="pcopy">
                <h3 className="h3">
                  Close the month faster, with numbers that match
                </h3>
                <p>
                  Automate the repetitive work and connect sales to accounting.
                </p>
                <ul className="checks">
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Invoices and reminders that run themselves
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Sales and payments flowing into accounting
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Reports on time, with numbers that match
                  </li>
                </ul>
                <div>
                  <BriefAction
                    services={['automation', 'integration', 'dash']}
                    mode="navigate"
                    industry=""
                    className="btn btn-primary"
                  >
                    Build a brief for this
                    <svg className="ic arrow" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </BriefAction>
                </div>
              </div>
            </TabPanel>
            <TabPanel
              index={2}
              className="ppanel"
              role="tabpanel"
              id="pp-2"
              aria-labelledby="pt-2"
              tabIndex={0}
            >
              <div className="pcard c2">
                <div>
                  <p className="pq-lbl">What we often hear</p>
                  <blockquote>
                    “Our drivers and reps report by phone call.”
                  </blockquote>
                </div>
                <div>
                  <p className="pb-lbl">What we build</p>
                  <div className="pchips">
                    <span>Mobile app</span>
                    <span>Web portal</span>
                    <span>Integrations</span>
                  </div>
                </div>
              </div>
              <div className="pcopy">
                <h3 className="h3">
                  Know where every order, driver and item is
                </h3>
                <p>Apps for the field and a live view for the office.</p>
                <ul className="checks">
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Driver apps with proof of delivery
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Live tracking and accurate stock
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Fewer calls to the field
                  </li>
                </ul>
                <div>
                  <BriefAction
                    services={['mobile', 'webapp', 'integration']}
                    mode="navigate"
                    industry=""
                    className="btn btn-primary"
                  >
                    Build a brief for this
                    <svg className="ic arrow" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </BriefAction>
                </div>
              </div>
            </TabPanel>
            <TabPanel
              index={3}
              className="ppanel"
              role="tabpanel"
              id="pp-3"
              aria-labelledby="pt-3"
              tabIndex={0}
            >
              <div className="pcard c5">
                <div>
                  <p className="pq-lbl">What we often hear</p>
                  <blockquote>“Leads fall through the cracks.”</blockquote>
                </div>
                <div>
                  <p className="pb-lbl">What we build</p>
                  <div className="pchips">
                    <span>Website</span>
                    <span>Online store</span>
                    <span>CRM</span>
                    <span>AI assistant</span>
                  </div>
                </div>
              </div>
              <div className="pcopy">
                <h3 className="h3">
                  Win more enquiries and answer them faster
                </h3>
                <p>Get found online and never miss a lead or question.</p>
                <ul className="checks">
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    A website and online store that sell
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    A CRM that tracks every lead
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    An AI assistant for everyday questions
                  </li>
                </ul>
                <div>
                  <BriefAction
                    services={['website', 'ecom', 'erp', 'ai']}
                    mode="navigate"
                    industry=""
                    className="btn btn-primary"
                  >
                    Build a brief for this
                    <svg className="ic arrow" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </BriefAction>
                </div>
              </div>
            </TabPanel>
            <TabPanel
              index={4}
              className="ppanel"
              role="tabpanel"
              id="pp-4"
              aria-labelledby="pt-4"
              tabIndex={0}
            >
              <div className="pcard c4">
                <div>
                  <p className="pq-lbl">What we often hear</p>
                  <blockquote>
                    “We can’t hire developers fast enough.”
                  </blockquote>
                </div>
                <div>
                  <p className="pb-lbl">What we build</p>
                  <div className="pchips">
                    <span>Dedicated developers</span>
                    <span>UI/UX design</span>
                    <span>Web app</span>
                  </div>
                </div>
              </div>
              <div className="pcopy">
                <h3 className="h3">
                  Add skilled developers without the hiring wait
                </h3>
                <p>Extend your team, or hand us a fixed-price build.</p>
                <ul className="checks">
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Dedicated developers, billed monthly
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Fixed-price builds, quoted in USD
                  </li>
                  <li>
                    <span className="tick">
                      <svg className="ic" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                    </span>
                    Prototypes you can test first
                  </li>
                </ul>
                <div>
                  <BriefAction
                    services={['devs', 'uiux', 'webapp']}
                    mode="navigate"
                    industry=""
                    className="btn btn-primary"
                  >
                    Build a brief for this
                    <svg className="ic arrow" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </BriefAction>
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </>
  );
}
