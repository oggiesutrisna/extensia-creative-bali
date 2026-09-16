#!/usr/bin/env bash
# ==============================================================================
# deploy.sh — One-command build, commit & push to trigger GitHub Actions Deploy
# Usage:
#   ./deploy.sh "Deskripsi perubahan"
# ==============================================================================

set -e

# Warna terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}🚀 Menjalankan Build & Push ke GitHub...${NC}"
echo -e "${BLUE}====================================================${NC}"

# 1. Compile CSS lokal untuk verifikasi
echo -e "\n${YELLOW}📦 [1/3] Menjalankan compile CSS lokal (npm run build)...${NC}"
npm run build

# 2. Ambil commit message dari argumen atau gunakan default
COMMIT_MSG="${1:-Update vexaPOS & landing page assets}"

echo -e "\n${YELLOW}📝 [2/3] Menambahkan dan mencatat perubahan ke Git...${NC}"
git add -A

if git diff-index --quiet HEAD --; then
  echo -e "${GREEN}ℹ️  Tidak ada perubahan baru untuk dicommit.${NC}"
else
  git commit -m "$COMMIT_MSG"
fi

# 3. Push ke remote GitHub (memicu GitHub Actions deploy ke VPS)
echo -e "\n${YELLOW}📤 [3/3] Mendorong perubahan ke GitHub (git push origin main)...${NC}"
git push origin main

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}✅ Berhasil push ke GitHub!${NC}"
echo -e "${GREEN}🤖 GitHub Actions sedang otomatis men-deploy ke VPS.${NC}"
echo -e "${GREEN}   Pantau statusnya di tab Actions di repositori GitHub.${NC}"
echo -e "${GREEN}====================================================${NC}"
