# Deploys the Ulil Albab portfolio (ulilhibi.my.id) to the served
# directory on the homeserver. Run manually or from Task Scheduler
# (gates must pass before anything reaches the live folder).
#
# Layout:
#   C:\srv\repos\ulilhibi   git clone of this repo (public — no token needed)
#   C:\srv\sites\hibi       served portfolio (dist mirror)
#
# The hub + main-site deploy lives in the nyaahibi repo
# (C:\srv\repos\hibi, ops\deploy.ps1 there) and mirrors dist-hub to
# C:\srv\sites\projects. The Caddyfile for ALL sites is in that repo's
# ops\ — this script only ever touches sites\hibi.

$ErrorActionPreference = 'Stop'

$repos = 'C:\srv\repos'
$sites = 'C:\srv\sites'

Write-Host '[1/4] Updating portfolio repo...'
git -C "$repos\ulilhibi" pull --ff-only
if ($LASTEXITCODE -ne 0) { throw 'git pull failed — is the working tree clean?' }

Push-Location "$repos\ulilhibi"
try {
    Write-Host '[2/4] Building portfolio...'
    bun install --frozen-lockfile
    if ($LASTEXITCODE -ne 0) { throw 'bun install failed — aborting deploy.' }
    bun run build        # vue-tsc gate + vite build (dist/)
    if ($LASTEXITCODE -ne 0) { throw 'build failed — aborting deploy.' }

    Write-Host '[3/4] Running SSR render gate...'
    bunx vite build --ssr test/render.test.ts --outDir node_modules\.tmp\ssr
    if ($LASTEXITCODE -ne 0) { throw 'portfolio SSR test build failed — aborting deploy.' }
    node node_modules\.tmp\ssr\render.test.js
    if ($LASTEXITCODE -ne 0) { throw 'portfolio SSR test failed — aborting deploy.' }
}
finally {
    Pop-Location
}

Write-Host '[4/4] Mirroring dist -> sites\hibi...'
robocopy "$repos\ulilhibi\dist" "$sites\hibi" /MIR /XD .git node_modules /NFL /NDL /NJH
if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE)" }
$global:LASTEXITCODE = 0   # robocopy 0-7 = success

Write-Host 'Deploy complete.'
