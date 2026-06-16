#!/bin/bash
# Build and deploy the wiki.
#
# Two workflows are supported. Pick one and edit the variables below.
#
#   Workflow A — direct authoring (simplest)
#     You write Markdown directly inside content/, commit it, and deploy.
#     Leave the SOURCE_DIR section commented out.
#
#   Workflow B — external vault sync
#     You keep your source notes in a separate folder (e.g. an Obsidian vault
#     in iCloud, Dropbox, or anywhere else) and mirror them into content/
#     before each build. Set SOURCE_DIR below and uncomment the rsync block.
#
# Usage: ./build.sh

set -e

WIKI_DIR="$(cd "$(dirname "$0")" && pwd)"
CONTENT_DIR="$WIKI_DIR/content"

# --- OPTIONAL: sync from an external source folder (Workflow B) ---------------
#
# SOURCE_DIR="/path/to/your/notes-vault"
# TARGET_SUBFOLDER="meetings-group-a"   # which content/ subfolder to mirror into
#
# echo "Syncing $SOURCE_DIR -> $CONTENT_DIR/$TARGET_SUBFOLDER ..."
# rsync -a --delete \
#   --exclude='.obsidian' \
#   --exclude='.DS_Store' \
#   --exclude='node_modules' \
#   "$SOURCE_DIR/" "$CONTENT_DIR/$TARGET_SUBFOLDER/"
#
# ------------------------------------------------------------------------------

# --- Build the site -----------------------------------------------------------
echo "Building Quartz site..."
npx quartz build

# --- Deploy -------------------------------------------------------------------
# Netlify is the default. To use a different host, comment the line below and
# replace it with your host's deploy command (Cloudflare Pages, GitHub Pages
# via `gh-pages`, rsync to a server, etc.). Quartz writes the built site to
# the `public/` directory — that is what you deploy.

echo "Deploying to Netlify..."
npx netlify deploy --prod --dir public

echo "Done."
