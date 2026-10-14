'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { navigation, site } from '@/config/site';
import { serviceHref } from '@/data/service-details';
import { GROUPS, GROUP_IDS, SERVICES, type Service } from '@/data/catalogue';
import { Icon, Logo } from '@/components/ui/icon';

function ServiceLink({
  service,
  onNavigate,
}: {
  service: Service;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        className="mega-item"
        href={serviceHref(service.id)}
        onClick={onNavigate}
      >
        <span className={`mini-ic ${service.c}`}>
          <Icon name={service.icon} />
        </span>
        {service.name}
      </Link>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    setMega(false);
    setDrawer(false);
  };

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 8);
    const click = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setMega(false);
    };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (drawer) menuRef.current?.focus();
      else if (mega) megaRef.current?.focus();
      setMega(false);
      setDrawer(false);
    };
    const media = matchMedia('(min-width: 1081px)');
    const resize = () => {
      if (media.matches) setDrawer(false);
    };
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('click', click);
    document.addEventListener('keydown', escape);
    media.addEventListener('change', resize);
    return () => {
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('click', click);
      document.removeEventListener('keydown', escape);
      media.removeEventListener('change', resize);
    };
  }, [drawer, mega]);
  useEffect(() => {
    if (!drawer) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    drawerRef.current
      ?.querySelector<HTMLElement>('a, button, summary')
      ?.focus();
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [drawer]);

  function trapFocus(event: KeyboardEvent<HTMLElement>) {
    if (!drawer || event.key !== 'Tab') return;
    const candidates = [
      menuRef.current,
      ...Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a, button, summary',
        ) || [],
      ),
    ].filter(
      (element): element is HTMLElement =>
        !!element && element.getClientRects().length > 0,
    );
    const first = candidates[0],
      last = candidates.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  return (
    <>
      <header
        className={`site-header${scrolled ? ' scrolled' : ''}${drawer ? ' menu-open' : ''}`}
        id="site-header"
        ref={headerRef}
        onKeyDown={trapFocus}
      >
        <div className="wrap h-inner">
          <Link
            className="brand"
            href="/"
            aria-label="Articcus home"
            onClick={close}
          >
            <Logo />
          </Link>
          <nav className="nav" aria-label="Primary">
            <button
              type="button"
              className={`nav-link${pathname.startsWith('/services') ? ' is-current' : ''}`}
              id="mega-btn"
              ref={megaRef}
              aria-expanded={mega}
              aria-controls="mega"
              onClick={() => setMega(!mega)}
            >
              Services
              <Icon name="chev" className="ic chev" />
            </button>
            {navigation.map((item) => (
              <Link
                className="nav-link"
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="h-actions">
            <Link
              className="btn btn-outline"
              href="/contact#start"
              onClick={close}
            >
              Build a brief
            </Link>
            <Link
              className="btn btn-primary"
              href={site.discoveryHref}
              data-discovery
              onClick={close}
            >
              Request a call
            </Link>
            <button
              type="button"
              className="menu-btn"
              id="menu-btn"
              ref={menuRef}
              aria-expanded={drawer}
              aria-controls="drawer"
              aria-label={drawer ? 'Close menu' : 'Open menu'}
              onClick={() => {
                setDrawer(!drawer);
                setMega(false);
              }}
            >
              <Icon name="menu" className="ic i-open" />
              <Icon name="x" className="ic i-close" />
            </button>
          </div>
        </div>
        <div className="mega" id="mega" hidden={!mega}>
          <div className="wrap mega-inner">
            {GROUP_IDS.map((group) => (
              <div className="mega-col" key={group}>
                <h3>{GROUPS[group].name}</h3>
                <ul id={`mega-${group}`}>
                  {SERVICES.filter((service) => service.g === group).map(
                    (service) => (
                      <ServiceLink
                        service={service}
                        key={service.id}
                        onNavigate={close}
                      />
                    ),
                  )}
                </ul>
              </div>
            ))}
            <div className="mega-promo">
              <div>
                <strong>Not sure what you need?</strong>
                <p>Tell us the problem and we will suggest where to start.</p>
              </div>
              <div className="mega-promo-actions">
                <Link
                  className="btn btn-sky"
                  href={site.discoveryHref}
                  data-discovery
                  onClick={close}
                >
                  Request a discovery call
                  <Icon name="arrow" className="ic arrow" />
                </Link>
                <Link className="link-arrow" href="/services" onClick={close}>
                  Explore all services
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav
        className="drawer"
        id="drawer"
        aria-label="Mobile"
        hidden={!drawer}
        ref={drawerRef}
        onKeyDown={trapFocus}
      >
        <div className="wrap drawer-inner">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            onClick={close}
          >
            Home
          </Link>
          <details>
            <summary>
              Services
              <Icon name="chev" />
            </summary>
            <ul className="drawer-svcs" id="drawer-svcs">
              <li>
                <Link className="mega-item" href="/services" onClick={close}>
                  <span className="mini-ic c6">
                    <Icon name="grid" />
                  </span>
                  All services
                </Link>
              </li>
              {SERVICES.map((service) => (
                <ServiceLink
                  key={service.id}
                  service={service}
                  onNavigate={close}
                />
              ))}
            </ul>
          </details>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <div className="drawer-ctas">
            <Link
              className="btn btn-primary btn-lg"
              href={site.discoveryHref}
              data-discovery
              onClick={close}
            >
              Request a discovery call
            </Link>
            <a className="btn btn-outline btn-lg" href="tel:+94775701404">
              Call +94 77 570 1404
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
