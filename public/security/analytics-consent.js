      (function () {
        var GA_ID = 'G-ZLLSD3PXZ9';
        // The router reads this exact configured target, never a second ID literal.
        Object.defineProperty(window, '__LWA_GA4_ID__', { value: GA_ID, writable: false, configurable: false });
        var loaded = false;

        function hasAnalyticsConsent() {
          try {
            var raw = localStorage.getItem('lwa_cv3');
            // A current structured choice wins over any stale legacy flag.
            if (raw !== null) {
              var choice = JSON.parse(raw);
              return !!choice && choice.a === true;
            }
            return localStorage.getItem('cookie-consent') === 'accepted';
          } catch (e) { return false; }
        }

        function loadAnalytics() {
          // Recheck even for explicit calls/events; their names are not consent.
          if (loaded || !hasAnalyticsConsent()) return;
          loaded = true;

          // GA4 — send_page_view:false; the SPA router sends page_view itself.
          window.dataLayer = window.dataLayer || [];
          window.gtag = function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          // Do not let automatic events inherit search queries, contact data or fragments.
          var safeLocation = new URL(window.location.href);
          safeLocation.username = ''; safeLocation.password = '';
          safeLocation.search = ''; safeLocation.hash = '';
          var privatePath = false;
          try {
            // Match the central URL policy, including encoded contact identifiers.
            var decodedPath = decodeURIComponent(safeLocation.pathname);
            privatePath = /[^\s/@]+@[^\s/@]+\.[^\s/@]+/.test(decodedPath) || /\+?\d[\d ()-]{8,}\d/.test(decodedPath);
          } catch (e) { privatePath = true; }
          if (privatePath) safeLocation.pathname = '/';
          var safeReferrer = '';
          try { safeReferrer = new URL(document.referrer).origin + '/'; } catch (e) {}
          window.gtag('config', GA_ID, {
            send_page_view: false,
            page_location: safeLocation.href,
            page_referrer: safeReferrer
          });
          var ga = document.createElement('script');
          ga.async = true;
          ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
          (document.head || document.documentElement).appendChild(ga);

          // Evarist analytics
          window.evarist = window.evarist || function () {
            (window.evarist.q = window.evarist.q || []).push(arguments);
          };
          var ev = document.createElement('script');
          ev.src = 'https://app.evarist.ai/script.js';
          ev.setAttribute('data-evarist', '11C6BZx6hg');
          (document.head || document.documentElement).appendChild(ev);

          window.__ANALYTICS_READY__ = true;
          window.dispatchEvent(new Event('analytics-ready'));
        }

        window.__loadAnalytics = loadAnalytics;
        window.addEventListener('cookie-consent-accepted', loadAnalytics);
        if (hasAnalyticsConsent()) loadAnalytics();
      })();
