#!/usr/bin/env bash
#
# Deployment script for https://lokeshburade007.github.io/
#
# This repo has two branches:
#   • main      → source code (this is what you edit)
#   • gh-pages  → built site (what GitHub Pages serves to the world)
#
# Usage:
#   ./deploy.sh                                   # Build & deploy (will commit pending changes with a default message)
#   ./deploy.sh "feat: add new project"           # Commit pending source changes with the given message, push, then deploy
#   ./deploy.sh --no-source                       # Skip the source commit/push step; only build & deploy gh-pages
#

set -euo pipefail

cd "$(dirname "$0")"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
RESET='\033[0m'

step()    { printf "${BLUE}→${RESET} %s\n" "$*"; }
ok()      { printf "${GREEN}✓${RESET} %s\n" "$*"; }
warn()    { printf "${YELLOW}!${RESET} %s\n" "$*"; }
fail()    { printf "${RED}✗${RESET} %s\n" "$*"; exit 1; }

SKIP_SOURCE=false
MSG=""

for arg in "$@"; do
  case "$arg" in
    --no-source) SKIP_SOURCE=true ;;
    -h|--help)
      grep -E '^#( |$)' "$0" | sed 's/^# \?//'
      exit 0
      ;;
    *) MSG="$arg" ;;
  esac
done

# 1. Ensure we're in a git repo with a clean enough state
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  fail "Not inside a git repo."
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  warn "You're on '$CURRENT_BRANCH', not 'main'. Continuing — but the source push will go to main only if you switch."
fi

# 2. Commit & push pending source changes (unless --no-source)
if [[ "$SKIP_SOURCE" == false ]]; then
  if [[ -n "$(git status --porcelain)" ]]; then
    if [[ -z "$MSG" ]]; then
      MSG="chore: portfolio updates ($(date +%Y-%m-%d))"
      warn "No commit message provided — using default: \"$MSG\""
    fi
    step "Staging all changes..."
    git add -A
    step "Committing: \"$MSG\""
    git commit -m "$MSG"
    step "Pushing source to origin/main..."
    git push origin "$CURRENT_BRANCH"
    ok "Source pushed."
  else
    ok "Working tree is clean — nothing to commit."
  fi
fi

# 3. Install deps if node_modules missing
if [[ ! -d node_modules ]]; then
  step "Installing dependencies (node_modules missing)..."
  npm install
fi

# 4. Build production bundle
step "Building production bundle (vite)..."
npm run build

# 5. Deploy dist/ to gh-pages branch
step "Deploying dist/ to gh-pages branch..."
npx gh-pages -d dist -m "deploy: $(date +%Y-%m-%d-%H:%M:%S)"

ok "Deployment finished."
printf "\n${GREEN}Live URL:${RESET} https://lokeshburade007.github.io/\n"
printf "${YELLOW}Note:${RESET}    GitHub Pages can take 30–60 seconds to refresh the CDN.\n\n"
