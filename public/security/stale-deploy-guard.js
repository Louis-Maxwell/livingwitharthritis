      (function () {
        var KEY = 'lwa:stale-reload-at', WINDOW_MS = 300000;
        window.addEventListener('error', function (e) {
          var t = e && e.target;
          if (!t || (t.tagName !== 'SCRIPT' && t.tagName !== 'LINK')) return;
          var url = t.src || t.href || '';
          if (url.indexOf('/assets/') === -1) return;
          try {
            var last = Number(sessionStorage.getItem(KEY) || 0);
            if (Date.now() - last < WINDOW_MS) return;
            sessionStorage.setItem(KEY, String(Date.now()));
          } catch (err) { return; /* no storage = no loop guard, so never auto-reload */ }
          var u = new URL(location.href);
          u.searchParams.set('_r', Date.now().toString(36));
          location.replace(u.toString());
        }, true);
      })();
