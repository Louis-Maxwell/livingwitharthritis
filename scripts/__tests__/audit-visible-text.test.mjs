import { describe, it, expect } from 'vitest';
import { auditVisibleText } from '../lib/audit-visible-text.mjs';

describe('audit text parsing', () => {
  it('reads entities and quoted greater-than characters with an HTML parser', () => {
    expect(auditVisibleText('<h1 title="a > b">Living &amp; learning</h1>')).toBe('Living & learning');
  });
  it('does not count script, style or template text as visible audit content', () => {
    expect(auditVisibleText('<script>invisible</script><style>hidden</style><template>later</template><p>Visible</p>')).toBe('Visible');
  });
  it('handles malformed markup without stripping it as a sanitizer', () => {
    expect(auditVisibleText('<p>First <b>second</p><p>third')).toBe('First second third');
  });
});
