# Edge protection and DDoS response

This application is a static Vite site. Request filtering and volumetric DDoS protection must therefore run at the hosting edge or CDN, before traffic reaches the origin.

## Required edge controls

Apply these controls at the CDN/WAF layer:

1. **Origin protection**
   - Keep the origin address private where the hosting provider supports it.
   - Accept origin traffic only from the CDN or hosting platform.
   - Enforce TLS from the visitor to the edge and from the edge to the origin.
   - Add a health-check path that does not expose application data.

2. **Allowlist and bot policy**
   - Allow normal browser traffic and verified search crawlers.
   - Allow the site's documented AI crawlers only when their traffic is verified by the provider's published method.
   - Challenge or block requests with malformed methods, impossible headers, invalid hostnames, or repeated authentication failures.
   - Do not rely on User-Agent strings alone for allowlisting.

3. **Adaptive limits**
   - Start with a baseline of 10 requests per client identity per minute on sensitive endpoints.
   - Use a composite identity: authenticated account, trusted session, IP range, ASN, country, path, response status, and request frequency.
   - Escalate when a client shows burstiness, path scanning, repeated 4xx/5xx responses, credential failures, or rapid origin changes.
   - Escalation sequence: observe -> challenge -> temporary block -> longer block with review.
   - Keep static HTML and assets on CDN cache so origin rate limits do not affect ordinary readers.

4. **High-risk endpoint rules**
   - Apply tighter limits and bot challenges to auth, admin, search, donation, contact, newsletter, and callback endpoints.
   - Never expose administrative endpoints through public caching.
   - Log rule ID, timestamp, request path, edge action, anonymised client identifier, and upstream status.

## Monitoring thresholds

Trigger an incident review when any of these occurs:

- Origin requests exceed 2x the trailing 7-day baseline for 5 minutes.
- 4xx or 5xx responses exceed 5% for 5 minutes.
- Authentication failures exceed 20 per account or IP in 10 minutes.
- More than 25 distinct paths are requested by one client identity in 60 seconds.
- Cache-hit ratio falls by 30% while edge traffic rises.

These thresholds are starting points. Tune them from real traffic and record changes in the incident log.

## DDoS response playbook

### Detect

1. Confirm the alert in CDN analytics and compare edge traffic with origin traffic.
2. Identify whether the event is volumetric, protocol-based, credential abuse, path scanning, or a normal traffic spike.
3. Preserve a short incident window of logs and rule matches.

### Contain

1. Enable the provider's managed DDoS mode or emergency protection profile.
2. Tighten adaptive limits for the affected paths.
3. Challenge or temporarily block the smallest matching scope: path, ASN, country, fingerprint, or abusive identity.
4. Increase cache coverage for public pages where safe.
5. Protect health checks and administrator access with an explicit allowlist.

### Recover

1. Remove emergency blocks gradually.
2. Confirm origin error rate, latency, cache-hit ratio, and login success rate have returned to baseline.
3. Check that search crawlers and normal visitors are no longer challenged.
4. Review false positives before permanently changing rules.

### Learn

Within 48 hours, record:

- Start and end time
- Affected paths and services
- Peak edge and origin rates
- Rules that fired
- False positives
- Provider actions and support case ID
- Permanent rule or architecture changes

## Ownership

The deployer or hosting administrator owns CDN/WAF configuration and provider escalation. Repository changes can document policy and safe defaults, but they cannot replace edge enforcement or the hosting provider's DDoS capacity.
