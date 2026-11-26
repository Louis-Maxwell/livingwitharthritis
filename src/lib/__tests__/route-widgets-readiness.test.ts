import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

// Route components can suspend after window.load. Keep optional in-flow
// controls in the same commit boundary so they cannot paint on a blank route
// and then move an entire document length when its chunk arrives.
describe('optional widgets wait for the lazy route commit', () => {
  const app = readFileSync('src/App.tsx', 'utf8');
  const routeTree = app.slice(app.indexOf('function AppWithSync()'), app.indexOf('const App = () =>'));
  const outerApp = app.slice(app.indexOf('const App = () =>'));
  it('keeps the in-flow controls inside AppWithSync after the route', () => {
    for (const control of ['MobileNextStepBar', 'ChatBotWidget', 'CookieBanner', 'MobileBottomNav']) {
      expect(routeTree.indexOf(`<${control}`)).toBeGreaterThan(routeTree.indexOf('<AnimatedRoutes />'));
      expect(outerApp).not.toContain(`<${control}`);
    }
  });
  it('retains the route suspense boundary and deferred loading', () => {
    expect(outerApp).toMatch(/<Suspense fallback=\{null\}>\s*<AppWithSync \/>/);
    expect(routeTree).toContain('<DeferredMount timeout={1200}>');
    expect(routeTree).toContain('<DeferredMount timeout={4000}>');
  });
});
