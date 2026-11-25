# ts-deepmerge 8 compatibility entry points

This local package adds a default-export alias for older prerender packages while keeping the named merge export. Both point to the same merge function from the normal npm package ts-deepmerge 8.0.0, installed as ts-deepmerge-upstream. No upstream runtime source is copied or edited.

Do not replace the upstream alias with a version below 8.0.0. Its reserved-key protections address GHSA-87mf-gv2c-c62c. The adapter does not change merge options or patch a module cache.

Sources:
- https://github.com/voodoocreation/ts-deepmerge/releases
- https://github.com/advisories/GHSA-87mf-gv2c-c62c
