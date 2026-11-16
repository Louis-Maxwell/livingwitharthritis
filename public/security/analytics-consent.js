      (function () {
        var GA_ID = 'G-ZLLSD3PXZ9';
        var loaded = false;

        function hasAnalyticsConsent() {
          try {
            if (localStorage.getItem('cookie-consent') === 'accepted') return true;
            var raw = localStorage.getItem('lwa_cv3');
            if (!raw) return false;
            return JSON.parse(raw).a === true;
          } catch (e) { return false; }
        }

        function loadAnalytics() {
          if (loaded) return;
          loaded = true;

          // GA4 — send_page_view:false; the SPA router sends page_view itself.
          window.dataLayer = window.dataLayer || [];
          window.gtag = function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          // Do not let automatic events inherit search queries, contact data or fragments.
          var safeLocation = new URL(window.location.href);
          safeLocation.search = ''; safeLocation.hash = '';
          if (/@|%40/i.test(safeLocation.pathname)) safeLocation.pathname = '/';
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
