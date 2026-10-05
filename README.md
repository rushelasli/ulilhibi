# ulilhibi — Ulil Albab portfolio

Personal profile site for **Ulil Albab** → <https://ulilhibi.my.id>.

Split out of the NyaaHibi hub repo ([rushelasli/nyaahibi](https://github.com/rushelasli/nyaahibi))
in Oct 2026: this repo owns the portfolio app only, every project card
links out to the hub (`project.nyaahibi.web.id/<slug>`), and the legacy
`/projects/*` mirrors retired with the split (old URLs fall back to `/`).

## Stack

- Vue 3 + Composition API + TypeScript, vue-router (single home route)
- Vite 8 + Bun, Tailwind CSS v4 + shadcn-vue / reka-ui
- `vue-i18n` (Indonesian + English), `@lucide/vue` icons

## Quick start

```bash
bun install

bun run dev      # → http://localhost:5173/
bun run build    # type-check + build → dist/
bun run preview  # preview the build
```

## Gates (run before every commit)

```bash
# 1. type-check + build (+ built CSS for the class gate)
bun run build

# 2. SSR render gate
bunx vite build --ssr test/render.test.ts --outDir node_modules/.tmp/ssr
node node_modules/.tmp/ssr/render.test.js

# 3. id/en flat-key parity (counts + set equality)
bun -e 'const f=async p=>(await Bun.file(p).json()); const flat=(o,x="")=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==="object"?flat(v,x+k+"."):[x+k]); const a=flat(await f("src/locales/en.json")),b=flat(await f("src/locales/id.json")); console.log(a.length,b.length,a.filter(k=>!b.includes(k)).length+b.filter(k=>!a.includes(k)).length)'

# 4. every class token used in the SFCs/locales exists in the built CSS
python3 ops/check_classes.py
```

## Deploy

One script on the homeserver — builds, runs the SSR gate, mirrors
`dist/` to `C:\srv\sites\hibi`:

```powershell
ops\deploy.ps1
```

Box runbook (Cloudflare tunnel, Caddy, scheduling) lives in the hub
repo's [`ops/README.md`](https://github.com/rushelasli/nyaahibi/blob/main/ops/README.md).

## License

MIT
