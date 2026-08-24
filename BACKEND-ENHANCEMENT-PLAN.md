# Backend Enhancement & Improvement Plan
**Living with Arthritis UK — Strategic Backend Optimization**

*Date: 2026-08-24*  
*Scope: Supabase PostgreSQL + Edge Functions Architecture*

---

## Current State Assessment

### ✅ Strengths
- **115 migrations** — comprehensive schema evolution tracking
- **32 edge functions** — well-distributed API layer
- **57 indexes** — good query optimization coverage
- **227 RLS policies** — robust security-first design
- **Rate limiting** — deployed on all critical endpoints
- **Data integrity** — foreign keys, constraints in place

### ⚠️ Gaps Identified

| Gap | Impact | Priority |
|-----|--------|----------|
| No materialized views for reporting | Slow analytics queries | Medium |
| Missing audit logging | Compliance/forensics blind spot | High |
| No data archiving strategy | DB bloat over time | Medium |
| Limited query performance monitoring | Unknown slow queries | High |
| No automated backups documented | Data loss risk | Critical |
| Missing API versioning strategy | Breaking changes risk | Medium |
| No request deduplication | Duplicate submissions possible | Medium |
| Limited caching strategy | Redundant DB queries | High |

---

## Priority 1: CRITICAL (Implement Today)

### 1.1 Audit Logging Infrastructure
**What**: Track all data mutations for compliance & forensics  
**Why**: GDPR/charity compliance, incident investigation, accountability  
**Files to create**:
- Migration: `audit_log` table + RLS policies
- Function: `audit_mutation_trigger()` to auto-log changes
- Table: Track who changed what, when, why

### 1.2 Automated Backup Verification
**What**: Validate Supabase backups are running + restorable  
**Why**: Data loss protection, business continuity  
**Files to create**:
- Migration: `backup_metadata` table
- Function: `verify_backup_health()` for scheduled checks
- Alert: Email on backup failure

### 1.3 Request Deduplication
**What**: Prevent duplicate donation/contact/form submissions  
**Why**: Financial accuracy, user experience, data quality  
**Files to create**:
- Migration: `request_idempotency_keys` table
- Middleware: Check before processing in edge functions
- Expiry: 24-hour window for duplicate detection

---

## Priority 2: HIGH (This Week)

### 2.1 Query Performance Monitoring
**What**: Identify slow queries, missing indexes, query plans  
**Why**: Scale database responsibly, optimize hot paths  
**Implementation**:
- Enable `pg_stat_statements` extension
- Create dashboard query views
- Alert on queries >1000ms
- Weekly performance report

### 2.2 Materialized Views for Analytics
**What**: Pre-compute common reporting queries  
**Why**: Instant analytics dashboard, 10x faster reports  
**Views to create**:
- `mv_campaign_metrics` — funds raised, beneficiaries, progress
- `mv_donor_analytics` — retention, LTV, acquisition
- `mv_seo_performance` — top pages, traffic, conversion
- `mv_content_performance` — views, engagement, dwell time

### 2.3 Caching Strategy
**What**: Implement Redis/app-level caching for hot data  
**Why**: Reduce DB load, instant user experience  
**Cache targets**:
- Blog articles (24h TTL)
- Testimonials (12h TTL)
- Campaign progress (5m TTL)
- Conditions/services metadata (7d TTL)

### 2.4 API Versioning & Backward Compatibility
**What**: Version edge functions, document breaking changes  
**Why**: Prevent mobile app breakage on updates  
**Implementation**:
- Add `api-version` header to all functions
- Maintain 2 versions in production
- Deprecation warnings 2 weeks ahead

---

## Priority 3: MEDIUM (Next 2 Weeks)

### 3.1 Data Archiving Strategy
**What**: Move cold data to archive tables/storage  
**Why**: Keep active DB lean, improve query performance  
**Archive targets**:
- Chat conversations >90 days
- Blog views >180 days
- Pain journal entries >1 year (user opt-in)

### 3.2 Incident Response Playbook
**What**: Document recovery procedures for common failures  
**Why**: Mean-time-to-recovery (MTTR), team preparedness  
**Procedures**:
- Database corruption recovery
- Lost RLS policy recovery
- Stripe webhook replay
- Email queue recovery

### 3.3 Automated Data Validation
**What**: Background jobs to verify data consistency  
**Why**: Catch corruption early, maintain data quality  
**Validations**:
- Orphaned foreign keys
- Duplicate entries in unique fields
- Missing required fields
- Image URL validity (returns 200)

---

## Implementation Checklist

### Today (Priority 1)

- [ ] **Audit Logging**
  - [ ] Create `audit_log` table migration
  - [ ] Create `audit_mutation_trigger()` function
  - [ ] Add trigger to all mutable tables
  - [ ] Test logging on a test update
  - [ ] Commit & deploy

- [ ] **Backup Verification**
  - [ ] Create `backup_metadata` table
  - [ ] Create `verify_backup_health()` function
  - [ ] Schedule daily checks (Supabase cron)
  - [ ] Set up failure alerts
  - [ ] Document recovery procedure

- [ ] **Request Deduplication**
  - [ ] Create `request_idempotency_keys` table
  - [ ] Update `create-donation-checkout` function
  - [ ] Update `submit-contact` function
  - [ ] Update `book-appointment` function
  - [ ] Test end-to-end

### This Week (Priority 2)

- [ ] **Query Monitoring**
  - [ ] Enable `pg_stat_statements` extension
  - [ ] Create monitoring dashboard queries
  - [ ] Set up alerts for slow queries
  - [ ] Weekly review process

- [ ] **Materialized Views**
  - [ ] Create each MV + refresh triggers
  - [ ] Add to RLS policies
  - [ ] Create refresh schedule
  - [ ] Verify data accuracy

- [ ] **Caching**
  - [ ] Evaluate Redis vs app-level cache
  - [ ] Implement for blog articles
  - [ ] Implement for campaign data
  - [ ] Monitor hit rates

- [ ] **API Versioning**
  - [ ] Add version headers to 5 core functions
  - [ ] Update client SDK/frontend
  - [ ] Document versioning policy
  - [ ] Create deprecation schedule

---

## Performance Targets

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Blog article load | ~200ms | <50ms | This week |
| Campaign dashboard | ~500ms | <100ms | This week |
| Donation checkout | ~800ms | <400ms | This week |
| Chat message latency | ~150ms | <50ms | This week |
| DB query P95 | Unknown | <100ms | This week |
| Backup health check | Manual | Automated | Today |
| Audit trail | None | Complete | Today |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   Web Frontend (React)                   │
├─────────────────────────────────────────────────────────┤
│                  Edge Functions (Deno)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Rate Limiting │ Auth │ Validation │ Versioning │   │
│  └──────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                   Supabase (PostgreSQL)                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Core Tables │ RLS Policies │ Indexes │ Triggers │   │
│  │ Audit Log │ Rate Limits │ Idempotency Keys │      │   │
│  └──────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│            Materialized Views & Cache Layer              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Analytics MVs │ Redis Cache │ Backup Metadata │   │
│  └──────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│             External Services & Storage                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Stripe │ Supabase Storage │ Unsplash CDN │        │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Estimated Effort

| Task | Effort | Owner | Timeline |
|------|--------|-------|----------|
| Audit Logging | 3h | Backend | Today |
| Backup Verification | 2h | Backend | Today |
| Request Dedup | 2h | Backend | Today |
| Query Monitoring | 1.5h | DevOps | This week |
| Materialized Views (×4) | 4h | Backend | This week |
| Caching Strategy | 3h | Backend | This week |
| API Versioning | 2h | Backend | This week |

**Total Priority 1-2: ~17.5 hours of focused backend work**

---

## Success Metrics

✅ **By end of day**:
- Audit logging active on all tables
- Backup verification automated
- Request deduplication prevents duplicates

✅ **By end of week**:
- Query monitoring dashboard live
- Campaign analytics <100ms
- Blog loads <50ms
- API versioning in place

✅ **Ongoing**:
- Zero duplicate submissions
- <1 second median dashboard load
- Backup failures alerted within 5 minutes
- Audit log queries <50ms

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Audit logging performance impact | Index on created_at, async logging |
| Backup restore time | Regular restore tests, document RPO/RTO |
| Cache invalidation bugs | Versioned cache keys, TTL fallback |
| API versioning confusion | Clear migration guide, deprecation warnings |

---

## Next Steps

1. **Approve this plan** — Confirm priorities align
2. **Execute Priority 1** — 7 hours of focused work
3. **Review results** — Performance metrics, data integrity
4. **Scale to Priority 2** — Weekly cadence
5. **Establish SLOs** — Document performance guarantees

**Ready to start building?** Let me know which Priority 1 task to tackle first.
