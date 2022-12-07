# LetterBolt Renderer

🚧 - WIP - 🚧

- [X] Render Pages (with children) from Notion automatically as consistent blocks
    - [ ] Option to render children or not
- [ ] Process and render Notion blocks optimized for Letterbolt (separate endpoint)
    - [ ] Provide minimal block data (objective: as less processing on Letterbolt frontend as possible)
        - [ ] Fully render test page with this approach.
- [X] Fetch page properties separately
- [X] Caching with Cloudflare Cache API
    - [X] Instant response (`stale-while-revalidate` headers)
    - [X] Background cache refresh (`ctx.waitUntil`)

Notion renderer optimized for newsletters that runs on edge.

This is the core of an upcoming product by DevClad called LetterBolt, a premium newsletter experience for Notion.

## Why (by) DevClad?

I plan on making this a day-0 revenue product and push it at the forefront of the "workspace" platform of DevClad. This way I can dogfood DevClad's workspace and team capabilites with a real-world product.
