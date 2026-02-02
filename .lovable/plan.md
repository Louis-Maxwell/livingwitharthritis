

# Comprehensive Security Review

## Executive Summary

I've conducted a thorough security review of your Living With Arthritis project. While the application has several good security practices in place (input validation in edge functions, CORS restrictions, admin role verification), there are **12 security findings** that need attention, including **4 critical issues** that could expose sensitive user data.

---

## Critical Issues (Require Immediate Action)

### 1. Patient Medical Data Exposure
**Severity: CRITICAL**

The `appointments` table RLS policy allows anyone to view appointments where `user_id IS NULL`:
```sql
-- Current policy allows this leak:
qual: ((auth.uid() = user_id) OR (user_id IS NULL))
```

**Impact**: Anonymous users can potentially access patient names, emails, phone numbers, appointment types, and medical notes.

**Fix**: Remove the `OR (user_id IS NULL)` condition from the SELECT policy. If unauthenticated users need to book appointments, they should only be able to INSERT, not view existing records.

---

### 2. Donor Personal Information Exposure
**Severity: CRITICAL**

The `donations` table has the same vulnerability:
```sql
qual: ((auth.uid() = user_id) OR (user_id IS NULL))
```

**Impact**: Donor names, email addresses, locations, countries, and donation amounts could be exposed to anyone.

**Fix**: Remove the `OR (user_id IS NULL)` condition. Only authenticated donors or admins should view donation records.

---

### 3. Contact Inquiries Unprotected
**Severity: CRITICAL**

The `contact_inquiries` table has no SELECT policy for admins:
- Names, emails, phone numbers, and messages are INSERT-only
- Admins cannot view or manage inquiries through the application
- If RLS is bypassed, all data could be exposed

**Fix**: Add admin SELECT and UPDATE policies.

---

### 4. Fundraising Inquiries Unprotected
**Severity: CRITICAL**

Same issue as contact inquiries - no SELECT or UPDATE policies exist for the `fundraising_inquiries` table.

**Fix**: Add admin SELECT and UPDATE policies.

---

## High Priority Issues

### 5. Overly Permissive INSERT Policies
**Severity: HIGH**

Four tables have `WITH CHECK (true)` for INSERT, allowing unlimited record creation:
- `appointments`
- `contact_inquiries`
- `donations`
- `fundraising_inquiries`

**Impact**: Spammers could flood your database with fake entries (no rate limiting at database level).

**Recommendation**: While some of these need to be public (contact forms, donations), consider adding edge function rate limiting.

---

### 6. Missing Admin Access to Appointments
**Severity: HIGH**

Medical staff cannot view or manage patient appointments through the admin dashboard. The appointments table lacks admin policies.

**Fix**: Add SELECT, UPDATE, and DELETE policies for admin users.

---

### 7. Donations Table Missing UPDATE Policy
**Severity: HIGH**

No UPDATE policy exists on the `donations` table. This prevents:
- Payment webhooks from updating donation status
- Admins from correcting records

**Fix**: Add UPDATE policy for service role or admins.

---

## Medium Priority Issues

### 8. Edge Function CORS Hardcoded Origins
**Severity: MEDIUM**

Several edge functions have hardcoded ALLOWED_ORIGINS with an old project ID:
```typescript
const ALLOWED_ORIGINS = [
  "https://id-preview--3d3ed0e7-eb8c-4aef-b309-fc873c84a796.lovable.app", // OLD!
  // ...
];
```

**Impact**: Functions may not work from your current project URL or production domain.

**Fix**: Update to include:
- Your current preview URL: `https://id-preview--0b2fd6ca-4e21-4ac7-99fa-d741e996f45e.lovable.app`
- Your production domain: `https://livingwitharthritis.org.uk`

---

### 9. PayPal Checkout Uses Wildcard CORS
**Severity: MEDIUM**

The `paypal-checkout` function uses `Access-Control-Allow-Origin: "*"`:
```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  // ...
};
```

**Impact**: Less secure than origin-specific CORS; allows any website to call your PayPal endpoint.

**Fix**: Use origin-specific CORS like other functions.

---

### 10. Stripe Function Without Validation
**Severity: MEDIUM**

The `create-donation-checkout` function:
- Uses wildcard CORS
- Has minimal input validation (only checks `amount < 1`)
- Doesn't validate `fundType` or `currency` against allowed values

**Fix**: Add proper input validation matching `process-donation` function.

---

## Lower Priority Observations

### 11. Console Logging of Donation IDs
**Severity: LOW**

Edge functions log transaction IDs which is acceptable for debugging but should be reviewed for production:
```typescript
console.log("Donation processed:", donationRecord.id);
```

**Recommendation**: Consider reducing logging verbosity in production.

---

### 12. Auth Page Missing Error Handling
**Severity: LOW**

The Auth page checks `getSession()` before `onAuthStateChange()` listener is set up. While functional, it could miss rapid auth state changes.

**Recommendation**: Set up listener before checking session (already noted in best practices).

---

## Good Security Practices Found

Your project already implements several security best practices:

1. **Role-Based Access Control (RBAC)**: Properly separated `user_roles` table with `SECURITY DEFINER` function
2. **Admin Dashboard Protection**: Client-side redirect for non-admins (though needs server-side validation too)
3. **Edge Function Input Validation**: Comprehensive validation in `book-appointment`, `submit-contact`, `chat`, `process-donation`, `submit-fundraising`
4. **JWT Verification**: Chat function properly validates auth tokens using `getClaims()`
5. **Email Regex Validation**: All forms validate email format
6. **Length Limits**: All text inputs have max length constraints

---

## Recommended Fixes (Implementation Order)

### Phase 1: Critical Data Exposure (Do First)

**Database Migration Required:**

```sql
-- 1. Fix appointments SELECT policy
DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage appointments" ON appointments
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 2. Fix donations SELECT policy
DROP POLICY IF EXISTS "Users can view their own donations" ON donations;
CREATE POLICY "Users can view their own donations" ON donations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can update donations" ON donations
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- 3. Add admin access to contact_inquiries
CREATE POLICY "Admins can view contact inquiries" ON contact_inquiries
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact inquiries" ON contact_inquiries
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- 4. Add admin access to fundraising_inquiries
CREATE POLICY "Admins can view fundraising inquiries" ON fundraising_inquiries
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update fundraising inquiries" ON fundraising_inquiries
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
```

### Phase 2: Edge Function CORS Updates

Update the following files to add current project URLs:
- `supabase/functions/book-appointment/index.ts`
- `supabase/functions/chat/index.ts`
- `supabase/functions/submit-contact/index.ts`
- `supabase/functions/process-donation/index.ts`
- `supabase/functions/submit-fundraising/index.ts`
- `supabase/functions/paypal-checkout/index.ts`

Add these origins:
```typescript
const ALLOWED_ORIGINS = [
  "https://id-preview--0b2fd6ca-4e21-4ac7-99fa-d741e996f45e.lovable.app",
  "https://livingwitharthritis.org.uk",
  "https://www.livingwitharthritis.org.uk",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];
```

### Phase 3: Input Validation Enhancement

Update `create-donation-checkout` to match `process-donation` validation patterns.

---

## Summary Table

| Issue | Severity | Type | Status |
|-------|----------|------|--------|
| Patient data exposure | Critical | RLS Policy | Needs Fix |
| Donor data exposure | Critical | RLS Policy | Needs Fix |
| Contact inquiries unprotected | Critical | Missing Policy | Needs Fix |
| Fundraising inquiries unprotected | Critical | Missing Policy | Needs Fix |
| Permissive INSERT policies | High | RLS Policy | Review |
| No admin access to appointments | High | Missing Policy | Needs Fix |
| Missing donations UPDATE | High | Missing Policy | Needs Fix |
| Hardcoded CORS origins | Medium | Edge Function | Needs Fix |
| PayPal wildcard CORS | Medium | Edge Function | Needs Fix |
| Stripe validation incomplete | Medium | Edge Function | Needs Fix |
| Console logging | Low | Best Practice | Optional |
| Auth listener order | Low | Best Practice | Optional |

