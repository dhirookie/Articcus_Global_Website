import Link from 'next/link';
import { css } from '@/lib/styles';
import { site } from '@/config/site';
import {
  HeroProvider,
  HeroTabs,
  HeroFrame,
  HeroDescription,
  HeroUrl,
  HeroViewport,
  ShowcasePanel,
} from '@/features/home/hero-showcase';

export function HeroContent() {
  return (
    <>
      <HeroProvider>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-top">
            <span
              className="ft c1"
              style={css({ left: '3%', top: '2%', '--r': '-8deg' })}
              aria-hidden="true"
            >
              <svg className="ic">
                <use href="#i-globe"></use>
              </svg>
            </span>
            <span
              className="ft c2"
              style={css({
                left: '7%',
                top: '40%',
                '--r': '6deg',
                '--dl': '-2s',
              })}
              aria-hidden="true"
            >
              <svg className="ic">
                <use href="#i-phone"></use>
              </svg>
            </span>
            <span
              className="ft c3"
              style={css({
                left: '2.5%',
                top: '78%',
                '--r': '-4deg',
                '--dl': '-4s',
              })}
              aria-hidden="true"
            >
              <svg className="ic">
                <use href="#i-chart"></use>
              </svg>
            </span>
            <span
              className="ft c4"
              style={css({
                right: '4%',
                top: '0',
                '--r': '7deg',
                '--dl': '-1s',
              })}
              aria-hidden="true"
            >
              <svg className="ic">
                <use href="#i-bolt"></use>
              </svg>
            </span>
            <span
              className="ft c5"
              style={css({
                right: '2%',
                top: '38%',
                '--r': '-6deg',
                '--dl': '-3s',
              })}
              aria-hidden="true"
            >
              <svg className="ic">
                <use href="#i-spark"></use>
              </svg>
            </span>
            <span
              className="ft c6"
              style={css({
                right: '6.5%',
                top: '76%',
                '--r': '4deg',
                '--dl': '-5s',
              })}
              aria-hidden="true"
            >
              <svg className="ic">
                <use href="#i-shield"></use>
              </svg>
            </span>
            <div className="wrap hero-copy">
              <h1 className="h1" id="hero-title">
                Replace spreadsheets and manual work with systems built around
                your business
              </h1>
              <p className="lead">
                Articcus builds websites, business software and automations for
                growing teams. Start with a clear scope, review progress at
                agreed milestones, and choose the ongoing support you need.
              </p>
              <div className="hero-ctas">
                <Link
                  className="btn btn-primary btn-lg"
                  href={site.discoveryHref}
                  data-discovery
                >
                  Request a discovery call
                  <svg className="ic arrow" aria-hidden="true">
                    <use href="#i-arrow"></use>
                  </svg>
                </Link>
                <Link className="btn btn-outline btn-lg" href="/solutions">
                  Explore solution examples
                </Link>
              </div>
              <ul className="hero-trust" aria-label="What to expect">
                <li>Based in Colombo</li>
                <li>Agreed scope and milestones</li>
                <li>Support planned before launch</li>
              </ul>
            </div>
            <div className="wrap tags-wrap">
              <p className="tags-lbl" id="tags-lbl">
                Illustrative product interfaces
              </p>
              <HeroTabs />
            </div>
          </div>
          <div className="wrap show-wrap">
            <div className="show-bg" aria-hidden="true"></div>
            <HeroFrame>
              <HeroDescription />
              <div className="shot-bar" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <HeroUrl />
                <span className="spacer"></span>
              </div>
              <HeroViewport>
                <div className="stage">
                  <ShowcasePanel index={0} className="v v-web">
                    <div className="vw-nav">
                      <span className="vw-logo">
                        <i></i>Your Business
                      </span>
                      <span className="vw-links">
                        <span>Home</span>
                        <span>Products</span>
                        <span>About</span>
                        <span>Contact</span>
                      </span>
                      <span className="vw-cta">Order now</span>
                    </div>
                    <div className="vw-hero">
                      <div className="vw-copy">
                        <span className="vw-open">
                          <i></i>Open today, 8:00 to 18:00
                        </span>
                        <p className="vw-h">
                          Your products, one tap away from your customers
                        </p>
                        <p className="vw-p">
                          Browse the range, ask a question on WhatsApp and order
                          from any phone.
                        </p>
                        <div className="vw-btns">
                          <span className="b1">Browse products</span>
                          <span className="b2">Get directions</span>
                        </div>
                      </div>
                      <div className="vw-grid">
                        <div className="vw-prod c3">
                          <span className="shape"></span>
                          <b>Product one</b>
                          <em>In stock</em>
                        </div>
                        <div className="vw-prod c4">
                          <span className="shape"></span>
                          <b>Product two</b>
                          <em>In stock</em>
                        </div>
                        <div className="vw-prod c5">
                          <span className="shape"></span>
                          <b>Product three</b>
                          <em>In stock</em>
                        </div>
                        <div className="vw-prod c6">
                          <span className="shape"></span>
                          <b>Product four</b>
                          <em>2 left</em>
                        </div>
                      </div>
                    </div>
                    <div className="vw-chat up" style={css({ '--k': '1' })}>
                      <div className="vw-chat-h">
                        <i></i>
                        <span>
                          <b>Chat with us</b>
                          <em>We usually reply within minutes</em>
                        </span>
                      </div>
                      <p className="msg in">Hi! Do you deliver on weekends?</p>
                      <p className="msg out">
                        Yes, on Saturdays from 9 to 1. Shall I place an order
                        for you?
                      </p>
                    </div>
                    <div className="vw-strip">
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        Enquiry forms
                      </span>
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        WhatsApp chat
                      </span>
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        Google Maps
                      </span>
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        Built for phones first
                      </span>
                    </div>
                  </ShowcasePanel>

                  <ShowcasePanel index={1} className="v v-portal">
                    <aside className="vp-side">
                      <span className="vp-logo">
                        <i></i>Dealer portal
                      </span>
                      <ul>
                        <li className="on">Orders</li>
                        <li>Products</li>
                        <li>Invoices</li>
                        <li>Dealers</li>
                        <li>Reports</li>
                      </ul>
                    </aside>
                    <div className="vp-main">
                      <div className="vp-top">
                        <div>
                          <p className="vp-h">Orders</p>
                          <p className="vp-sub">
                            Every dealer order in one place, updated as it
                            happens
                          </p>
                        </div>
                        <div className="vp-actions">
                          <span className="ghost">Export</span>
                          <span className="solid">+ New order</span>
                        </div>
                      </div>
                      <div className="vp-kpis">
                        <div>
                          <em>New</em>
                          <b>12</b>
                        </div>
                        <div>
                          <em>Packed</em>
                          <b>18</b>
                        </div>
                        <div>
                          <em>Dispatched</em>
                          <b>23</b>
                        </div>
                        <div>
                          <em>Awaiting payment</em>
                          <b>5</b>
                        </div>
                      </div>
                      <div className="vp-table">
                        <div className="vp-row hd">
                          <span>Order</span>
                          <span>Dealer</span>
                          <span>Items</span>
                          <span>Placed</span>
                          <span>Status</span>
                        </div>
                        <div className="vp-row fresh">
                          <b>#1048</b>
                          <span>City Hardware</span>
                          <span>14</span>
                          <span>09:12</span>
                          <span className="st c6">New</span>
                        </div>
                        <div className="vp-row">
                          <b>#1047</b>
                          <span>Lakeside Stores</span>
                          <span>6</span>
                          <span>08:55</span>
                          <span className="st c3">Packed</span>
                        </div>
                        <div className="vp-row">
                          <b>#1046</b>
                          <span>Metro Mart</span>
                          <span>22</span>
                          <span>08:31</span>
                          <span className="st c5">Dispatched</span>
                        </div>
                        <div className="vp-row">
                          <b>#1045</b>
                          <span>Hill Country Traders</span>
                          <span>9</span>
                          <span>Yesterday</span>
                          <span className="st c5">Dispatched</span>
                        </div>
                        <div className="vp-row">
                          <b>#1044</b>
                          <span>Harbour Supplies</span>
                          <span>17</span>
                          <span>Yesterday</span>
                          <span className="st c2">Awaiting payment</span>
                        </div>
                      </div>
                    </div>
                  </ShowcasePanel>

                  <ShowcasePanel index={2} className="v v-mobile">
                    <div className="vm-phone">
                      <div className="vm-screen">
                        <div className="vm-status">
                          <span>9:41</span>
                          <span>Driver app</span>
                        </div>
                        <p className="vm-h">Today&apos;s route</p>
                        <p className="vm-sub">12 stops, 7 completed</p>
                        <div className="vm-prog">
                          <i></i>
                        </div>
                        <ul className="vm-stops">
                          <li className="done">
                            <span className="dot">
                              <svg className="ic">
                                <use href="#i-check"></use>
                              </svg>
                            </span>
                            <b>City Hardware</b>
                            <em>Delivered, photo saved</em>
                          </li>
                          <li className="done">
                            <span className="dot">
                              <svg className="ic">
                                <use href="#i-check"></use>
                              </svg>
                            </span>
                            <b>Lakeside Stores</b>
                            <em>Delivered, signed</em>
                          </li>
                          <li className="now">
                            <span className="dot"></span>
                            <b>Metro Mart</b>
                            <em>Arriving in 6 min</em>
                          </li>
                          <li>
                            <span className="dot"></span>
                            <b>Harbour Supplies</b>
                            <em>Next stop</em>
                          </li>
                        </ul>
                        <span className="vm-btn">
                          Capture proof of delivery
                        </span>
                      </div>
                    </div>
                    <div className="vm-map">
                      <div className="vm-map-h">
                        <b>Live tracking</b>
                        <span className="pill">
                          <i></i>3 drivers on the road
                        </span>
                      </div>
                      <div className="vm-map-body">
                        <svg viewBox="0 0 510 270" preserveAspectRatio="none">
                          <path
                            className="route"
                            d="M40 225 C120 215 140 140 215 140 S330 70 465 50"
                          ></path>
                          <path
                            className="route-done"
                            d="M40 225 C120 215 140 140 215 140"
                          ></path>
                          <circle
                            cx="40"
                            cy="225"
                            r="8"
                            fill="var(--c5)"
                          ></circle>
                          <circle
                            cx="465"
                            cy="50"
                            r="9"
                            fill="var(--deep)"
                          ></circle>
                          <circle
                            r="9"
                            fill="var(--c2)"
                            stroke="#fff"
                            strokeWidth="3"
                          >
                            <animateMotion
                              id="drive"
                              dur="9s"
                              repeatCount="indefinite"
                              path="M215 140 S330 70 465 50"
                            ></animateMotion>
                          </circle>
                        </svg>
                      </div>
                    </div>
                    <div className="vm-feats">
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        Works offline
                      </span>
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        Photo and signature proof
                      </span>
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        Live location
                      </span>
                      <span>
                        <svg className="ic">
                          <use href="#i-check"></use>
                        </svg>
                        Android and iOS
                      </span>
                    </div>
                  </ShowcasePanel>

                  <ShowcasePanel index={3} className="v v-auto">
                    <div className="va-top">
                      <p className="va-h">New order workflow</p>
                      <span className="pill">
                        <i></i>Runs on every order
                      </span>
                    </div>
                    <ol className="va-flow">
                      <li style={css({ '--k': '0' })}>
                        <span className="va-ic c1">
                          <svg className="ic">
                            <use href="#i-msg"></use>
                          </svg>
                        </span>
                        <b>Order received</b>
                        <em>From WhatsApp, a web form or email</em>
                        <span className="va-ok">
                          <svg className="ic">
                            <use href="#i-check"></use>
                          </svg>
                        </span>
                      </li>
                      <li style={css({ '--k': '1' })}>
                        <span className="va-ic c4">
                          <svg className="ic">
                            <use href="#i-doc"></use>
                          </svg>
                        </span>
                        <b>Invoice created</b>
                        <em>Sent to accounting automatically</em>
                        <span className="va-ok">
                          <svg className="ic">
                            <use href="#i-check"></use>
                          </svg>
                        </span>
                      </li>
                      <li style={css({ '--k': '2' })}>
                        <span className="va-ic c3">
                          <svg className="ic">
                            <use href="#i-layers"></use>
                          </svg>
                        </span>
                        <b>Stock updated</b>
                        <em>The warehouse sees it at once</em>
                        <span className="va-ok">
                          <svg className="ic">
                            <use href="#i-check"></use>
                          </svg>
                        </span>
                      </li>
                      <li style={css({ '--k': '3' })}>
                        <span className="va-ic c5">
                          <svg className="ic">
                            <use href="#i-send"></use>
                          </svg>
                        </span>
                        <b>Customer notified</b>
                        <em>SMS and email with the delivery date</em>
                        <span className="va-ok">
                          <svg className="ic">
                            <use href="#i-check"></use>
                          </svg>
                        </span>
                      </li>
                    </ol>
                    <div className="va-log">
                      <p>Activity log</p>
                      <p className="va-line up" style={css({ '--k': '0' })}>
                        <span>09:12:04</span>Order #1048 received from WhatsApp
                      </p>
                      <p className="va-line up" style={css({ '--k': '1' })}>
                        <span>09:12:05</span>Invoice INV-2291 created and sent
                        to accounting
                      </p>
                      <p className="va-line up" style={css({ '--k': '2' })}>
                        <span>09:12:05</span>Stock updated for 14 items
                      </p>
                      <p className="va-line up" style={css({ '--k': '3' })}>
                        <span>09:12:06</span>Confirmation sent to the customer
                      </p>
                    </div>
                  </ShowcasePanel>

                  <ShowcasePanel index={4} className="v v-dash">
                    <div className="vd-top">
                      <p className="vd-h">Management dashboard</p>
                      <span className="pill">
                        <i></i>Live
                      </span>
                      <span className="vd-range">Last 12 weeks</span>
                    </div>
                    <div className="vd-kpis">
                      <div>
                        <em>Orders this week</em>
                        <b>1,284</b>
                        <small className="g">▲ 8% on last week</small>
                      </div>
                      <div>
                        <em>Outstanding invoices</em>
                        <b>46</b>
                        <small className="r">▲ 5 overdue</small>
                      </div>
                      <div>
                        <em>Items below reorder level</em>
                        <b>7</b>
                        <small className="r">Needs action</small>
                      </div>
                      <div>
                        <em>Average delivery time</em>
                        <b>1.6 days</b>
                        <small className="g">▼ 0.3 days</small>
                      </div>
                    </div>
                    <div className="vd-body">
                      <div className="vd-card">
                        <div className="vd-card-h">
                          <b>Orders per week</b>
                          <span>All branches</span>
                        </div>
                        <div className="vd-bars">
                          <i style={css({ '--h': '48%', '--i': '0' })}></i>
                          <i style={css({ '--h': '55%', '--i': '1' })}></i>
                          <i style={css({ '--h': '51%', '--i': '2' })}></i>
                          <i style={css({ '--h': '60%', '--i': '3' })}></i>
                          <i style={css({ '--h': '58%', '--i': '4' })}></i>
                          <i style={css({ '--h': '66%', '--i': '5' })}></i>
                          <i style={css({ '--h': '63%', '--i': '6' })}></i>
                          <i style={css({ '--h': '71%', '--i': '7' })}></i>
                          <i style={css({ '--h': '69%', '--i': '8' })}></i>
                          <i style={css({ '--h': '77%', '--i': '9' })}></i>
                          <i style={css({ '--h': '82%', '--i': '10' })}></i>
                          <i
                            className="now"
                            style={css({ '--h': '88%', '--i': '11' })}
                          ></i>
                        </div>
                      </div>
                      <div className="vd-card">
                        <div className="vd-card-h">
                          <b>Needs attention</b>
                          <span>Today</span>
                        </div>
                        <ul className="vd-list">
                          <li className="c2">
                            7 items are below their reorder level
                          </li>
                          <li className="c3">
                            5 invoices are more than 30 days overdue
                          </li>
                          <li className="c6">
                            Branch 2 orders are down on last week
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ShowcasePanel>

                  <ShowcasePanel index={5} className="v v-ai">
                    <div className="vai-chat">
                      <div className="vai-h">
                        <i>
                          <svg className="ic">
                            <use href="#i-spark"></use>
                          </svg>
                        </i>
                        <span>
                          <b>Company assistant</b>
                          <em>Answers from your own documents</em>
                        </span>
                      </div>
                      <div className="vai-body">
                        <p className="bub u up" style={css({ '--k': '0' })}>
                          Can a dealer return unopened stock after 30 days?
                        </p>
                        <div className="bub a up" style={css({ '--k': '1' })}>
                          Only with approval. Unopened stock can be returned
                          within 30 days for full credit. After that, the sales
                          manager has to approve the return.
                          <div className="src">
                            <span>Returns policy.pdf, page 2</span>
                            <span>Dealer terms.docx</span>
                          </div>
                        </div>
                        <p className="bub u up" style={css({ '--k': '2' })}>
                          Draft a reply to Metro Mart about their return
                          request.
                        </p>
                        <span className="typing up" style={css({ '--k': '3' })}>
                          <i></i>
                          <i></i>
                          <i></i>
                        </span>
                      </div>
                      <div className="vai-input">
                        Ask about prices, policies or stock
                        <span>
                          <svg className="ic">
                            <use href="#i-send"></use>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="vai-kb">
                      <b>Knowledge base</b>
                      <ul style={css({ display: 'grid', gap: '10px' })}>
                        <li>
                          <i className="c3">
                            <svg className="ic">
                              <use href="#i-doc"></use>
                            </svg>
                          </i>
                          Price list 2026.xlsx
                        </li>
                        <li>
                          <i className="c2">
                            <svg className="ic">
                              <use href="#i-doc"></use>
                            </svg>
                          </i>
                          Returns policy.pdf
                        </li>
                        <li>
                          <i className="c6">
                            <svg className="ic">
                              <use href="#i-doc"></use>
                            </svg>
                          </i>
                          Dealer terms.docx
                        </li>
                        <li>
                          <i className="c5">
                            <svg className="ic">
                              <use href="#i-doc"></use>
                            </svg>
                          </i>
                          Product catalogue.pdf
                        </li>
                      </ul>
                      <p>
                        The assistant updates itself when these files change.
                      </p>
                    </div>
                  </ShowcasePanel>
                </div>
              </HeroViewport>
            </HeroFrame>
          </div>
        </section>
      </HeroProvider>
    </>
  );
}
