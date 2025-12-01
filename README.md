# **HeliosHash DAO** ⚡

<div align="center">

<img src="https://raw.githubusercontent.com/nutraz/HeliosHash-DAO/main/assets/icons/hhdaologo.svg" alt="HeliosHash DAO Logo" width="120" style="margin-bottom: 10px;" />

**From Sunlight to Sovereignty. One Block at a Time.**  
*A OneWorldProject Initiative — India*

[![CI Status](https://github.com/nutraz/HeliosHash-DAO/actions/workflows/ci.yml/badge.svg)](https://github.com/nutraz/HeliosHash-DAO/actions/workflows/ci.yml)
[![Security Audit](https://github.com/nutraz/HeliosHash-DAO/actions/workflows/security.yml/badge.svg)](https://github.com/nutraz/HeliosHash-DAO/actions/workflows/security.yml)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

**Live Platform:** [https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity](https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity)  
**RWA NFT Collection:**([https://opensea.io/collection/helioshash-rwa](https://opensea.io/item/polygon/0xdaa7a0700607dc5130a54a8534dee0be2af61e30/6)

</div>

---

## 🎯 **Vision & Purpose**

**HeliosHash DAO transforms sunlight into digital sovereignty** — bridging solar microgrids, modular data centers, and Bitcoin mining into transparent, community-governed assets. We create **verifiable digital twins** of real-world infrastructure through our Multi-Layer Identity System.

### **🌞 The Solar → Sovereignty Pipeline**
```
Sunlight → Solar Panels → Clean Energy → Compute/Mining → On-Chain Value → Community Governance
```

### **🔗 Our Identity System**
Every physical asset gets three unique identifiers:

| Layer | Identifier | Purpose | Verification |
|-------|------------|---------|--------------|
| **Physical** | Hardware Serial/MAC | Device fingerprint | Immutable |
| **Platform** | `HHDAO-{LOC}-{TYPE}-{#}` | Human-readable management | Dapp Dashboard |
| **Blockchain** | NFT `tokenId` + Contract | On-chain ownership | OpenSea/Polygonscan |

---

## 🏗️ **Technical Architecture**

### **Blockchain Layer (Internet Computer)**
- **Canisters:** DAO governance, asset registry, treasury
- **Directory:** `/canisters/`
- **Core Feature:** On-chain hosting of frontend + APIs

### **Frontend Layer (Next.js 14)**
- **Framework:** Next.js App Router + TypeScript
- **UI:** TailwindCSS + shadcn/ui
- **Directory:** `/apps/web/`

### **Mobile Layer (Flutter)**
- **Cross-platform:** Android, iOS, Linux
- **Directory:** `/apps/mobile/`

### **Bridge Layer (Solidity)**
- **Cross-chain:** Polygon ↔ ICP asset sync
- **Directory:** `/contracts/`

---

## 🚀 **Quick Start**

```bash
# Clone and setup
git clone https://github.com/nutraz/HeliosHash-DAO.git
cd HeliosHash-DAO

# Automated setup
./scripts/dev-setup.sh

# Manual setup
pnpm install
dfx start --background --clean
dfx deploy
pnpm dev
```

**Visit:** [http://localhost:3002](http://localhost:3002)

---

## 📊 **Core Features**

### **Real-World Asset Monitoring**
- Live solar generation tracking
- Data center health metrics
- Mining performance analytics
- Transparent yield dashboards

### **DAO Governance**
- Proposal creation & voting
- NFT-tiered voting weights
- Treasury transparency
- Community impact funding

### **Tokenization Engine**
- RWA-backed NFTs on Polygon
- Dynamic metadata updates
- Cross-chain verification
- OpenSea integration

---

## 🌍 **Deployment Phases**

### **Phase 1: Baghpat Pilot** ✅
- 50kW solar + 20 ASIC mining cluster
- Real-time monitoring active

### **Phase 2: Urgam Valley Smart Region** 🚧
- 2MW solar park + modular data center
- DAO-governed civic infrastructure

### **Phase 3: Mumbai HPC Hub** 📅
- Tier 3 data center + 500kW solar
- AI/ML compute focus

---

## 🛠️ **Development**

### **Web Frontend**
```bash
cd apps/web
pnpm install
pnpm dev  # localhost:3002
```

### **Mobile App**
```bash
cd apps/mobile
flutter pub get
flutter run
```

### **ICP Backend**
```bash
dfx start --background
dfx deploy
dfx generate
```

---

## 🔗 **Critical Links**

- **Live Dapp:** [https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity](https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity)
- **NFT Collection:** [OpenSea - HeliosHash RWA](https://opensea.io/collection/helioshash-rwa)
- **Documentation:** `docs/` directory
- **Contributing:** `docs/CONTRIBUTING.md`
- **Security:** `docs/SECURITY_CHECKLIST.md`

---

<div align="center">

**From Sunlight to Sovereignty. One Block at a Time.**  
**Made with ☀️ by the OneWorldProject Community**

[Website](https://oneworldproject.io) | [Twitter](https://twitter.com/OneWorldPrj) | [Discord](https://discord.gg/oneworldproject)

</div>ss
