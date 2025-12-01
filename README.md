# **HeliosHash DAO (HHDAO)** 🌞⚡

<div align="center">

**Bridging Real-World Infrastructure with On-Chain Governance**  
*A OneWorldProject Initiative — India*

[![CI Status](https://github.com/nutraz/HeliosHash-DAO/actions/workflows/ci.yml/badge.svg)](https://github.com/nutraz/HeliosHash-DAO/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Internet Computer](https://img.shields.io/badge/blockchain-Internet_Computer-orange.svg)](https://internetcomputer.org/)
[![RWA Focus](https://img.shields.io/badge/focus-Real_World_Assets-green.svg)](https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity)

**Live Platform:** [https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity](https://dapp.oneworldproject.io/daodetail/UrgamUSmartCity)  
**RWA NFT Collection:** [https://opensea.io/item/polygon/0xdaa7a0700607dc5130a54a8534dee0be2af61e30/6](https://opensea.io/collection/helioshash-rwa)

</div>

---

## 🎯 **Vision & Purpose**

**HeliosHash DAO is a fintech platform that tokenizes real-world infrastructure** — solar microgrids, modular data centers, and Bitcoin mining operations — enabling transparent, community-governed ownership and oversight.

We transform physical assets into **verifiable, income-generating digital tokens**, creating a seamless bridge between renewable energy infrastructure and decentralized finance through our unique **Multi-Layer Identity System**.

### **Core Problem We Solve**
- **Illiquidity of infrastructure assets** - Converting capex-intensive solar/mining hardware into tradable tokens
- **Opacity in RWA management** - Providing real-time, on-chain verification of asset performance and revenue
- **Barriers to impact investing** - Democratizing access to renewable energy projects through fractional ownership

### **Our Solution**
- **Real-Time Monitoring** - Live telemetry from physical assets to blockchain
- **Tokenized Ownership** - NFTs representing verifiable shares in infrastructure
- **DAO Governance** - Community-driven decision making on asset deployment
- **Transparent Yield** - On-chain verification of all revenue distribution

---

## 🔗 **The HHDAO Identity System**

Every physical asset in our network is represented through a multi-layered identity framework:

| Layer | Identifier Format | Purpose | Example |
|-------|------------------|---------|---------|
| **Physical Asset** | Hardware Serial/MAC | Immutable device fingerprint | `INV-SOLAR-7X8B9P` |
| **Platform ID** | Structured Composite | Human-readable management | `HHDAO-URGAM-DC-001` |
| **Blockchain Proof** | NFT `tokenId` + Contract | On-chain ownership verification | `Polygon:0xdaa7...1e30/6` |

**This system ensures:** 
- Every solar panel, mining rig, and data center has a verifiable digital twin
- Complete audit trail from physical hardware to on-chain token
- Seamless integration with OpenSea and other NFT marketplaces

---

## 🏗️ **Technical Architecture**

### **Blockchain Layer (Internet Computer)**
- **Canisters:** DAO governance, asset registry, treasury management
- **Language:** Motoko
- **Key Feature:** Direct on-chain hosting of frontend and APIs
- **Directory:** `/canisters/`

### **Frontend Layer (Next.js 14)**
- **Framework:** Next.js App Router with TypeScript
- **UI:** TailwindCSS + shadcn/ui components
- **Real-time Data:** WebSocket connections to asset telemetry
- **Directory:** `/apps/web/`

### **Mobile Layer (Flutter)**
- **Cross-platform:** Android, iOS, Linux
- **Features:** Push notifications for asset alerts, mobile governance voting
- **Directory:** `/apps/mobile/`

### **Bridge Layer (Solidity)**
- **Cross-chain:** Polygon ↔ ICP asset synchronization
- **Verification:** Proof generation for RWA authenticity
- **Directory:** `/contracts/`

### **Data Flow**
```
Physical Assets → IoT Sensors → Telemetry API → ICP Canisters → 
└→ Next.js Dashboard (Real-time Monitoring)
└→ Flutter Mobile (Notifications & Control)
└→ Polygon NFTs (Ownership Representation)
```

---

## 🚀 **Getting Started**

### **Prerequisites**
```bash
# Core dependencies
Node.js 18+ | DFX 0.21+ | Flutter 3.19+ | pnpm 8+

# Internet Computer setup
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### **Local Development**
```bash
# 1. Clone and setup
git clone https://github.com/nutraz/HeliosHash-DAO.git
cd HeliosHash-DAO

# 2. Automated environment setup
./scripts/dev-setup.sh

# 3. Start local ICP replica
dfx start --background --clean

# 4. Deploy canisters
dfx deploy

# 5. Launch development servers
pnpm dev                   # Next.js frontend (localhost:3002)
flutter run -d chrome      # Flutter web preview
```

### **Production Deployment**
```bash
# Vercel Deployment (Frontend)
cd apps/web
vercel --prod --env .env.vercel.production

# ICP Mainnet Deployment
dfx deploy --network ic

# Mobile App Deployment
flutter build apk --release  # Android
flutter build ipa --release  # iOS
```

---

## 📊 **Key Features**

### **Real-World Asset Monitoring**
- **Solar Generation Tracking:** Live kW output, efficiency metrics, weather correlation
- **Data Center Operations:** Uptime, temperature, power usage effectiveness (PUE)
- **Mining Infrastructure:** Hashrate, hardware health, reward verification
- **Yield Analytics:** Transparent revenue calculation per asset cluster

### **DAO Governance Framework**
- **Proposal System:** Fund allocation, asset acquisition, parameter changes
- **Tiered Voting:** NFT-based voting weights (Genesis, Solar, Compute tiers)
- **Treasury Management:** Multi-signature controls with transparent ledger
- **Community Initiatives:** Impact project funding proposals

### **Tokenization Engine**
- **RWA-Backed NFTs:** Polygon-based tokens with verifiable asset backing
- **Dynamic Metadata:** Auto-updating NFT traits based on asset performance
- **Cross-Chain Verification:** ICP-based proofs of physical asset existence
- **Secondary Markets:** OpenSea integration with verified collection status

### **Identity & Access**
- **Multi-Modal Login:** Internet Identity, NFID, Ethereum wallets
- **KYC/AML Options:** Compliance-ready identity verification
- **Role-Based Access:** Viewer, Member, Operator, Guardian tiers
- **Audit Trail:** Immutable log of all governance and management actions

---

## 🌍 **Deployment Roadmap**

### **Phase 1: Baghpat Pilot (Active)**
- **Location:** Baghpat, Uttar Pradesh
- **Assets:** 50kW solar array + 20 ASIC mining unit cluster
- **Status:** Fully operational with real-time monitoring
- **DAO Members:** 127 initial participants

### **Phase 2: Urgam Valley Smart Region (Q3 2024)**
- **Location:** Urgam Valley Special Economic Zone
- **Scale:** 2MW solar park + 200-rack modular data center
- **Innovation:** DAO-governed civic infrastructure
- **Community Impact:** Free energy for schools, healthcare centers

### **Phase 3: Mumbai HPC Hub (Q1 2025)**
- **Location:** Mumbai Industrial Corridor
- **Capacity:** Tier 3 micro data center + 500kW solar park
- **Focus:** High-performance computing for AI/ML workloads
- **Expansion:** National replication framework

---

## 🔧 **Module Reference**

| Module | Path | Status | Description |
|--------|------|--------|-------------|
| **Core DAO Logic** | `/canisters/dao/` | ✅ Production | Governance, proposals, voting |
| **Asset Registry** | `/canisters/assets/` | ✅ Production | RWA identity management |
| **UrgamU Dashboard** | `/apps/web/src/modules/UrgamUDelhi/` | ✅ Production | Smart city monitoring interface |
| **NFT Management** | `/apps/web/src/components/nft/` | ✅ Stable | Minting, display, metadata |
| **Telemetry Bridge** | `/canisters/telemetry/` | 🚧 Beta | Physical asset data ingestion |
| **Mobile Governance** | `/apps/mobile/lib/governance/` | ✅ Stable | On-the-go voting and alerts |

---

## 🎮 **Development Workflow**

### **Working with Canisters**
```bash
# Common DFX commands
dfx start --background           # Start local replica
dfx deploy                       # Deploy all canisters
dfx deploy canister_name         # Deploy specific canister
dfx generate                     # Generate frontend bindings
dfx canister call canister_name method '(args)'  # Call canister method

# Testing
dfx canister call dao get_proposals '()'
dfx canister call assets register '(record {serial="SOL-123"; location="URGAM"})'
```

### **Frontend Development**
```bash
cd apps/web
pnpm install                     # Install dependencies
pnpm dev                         # Start dev server (port 3002)
pnpm build                       # Production build
pnpm test                        # Run tests
```

### **Mobile Development**
```bash
cd apps/mobile
flutter pub get                  # Get dependencies
flutter run -d chrome            # Web preview
flutter run                      # Connected device
flutter build apk --release      # Production APK
```

---

## 🤝 **Contributing**

We welcome contributions! Please see our detailed guidelines:
- **Code Contributions:** `docs/CONTRIBUTING.md`
- **Security Reporting:** `docs/SECURITY.md`
- **Governance Participation:** Join our [Discord](https://discord.gg/oneworldproject)

**Quick Start for Contributors:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-idea`)
3. Commit changes (`git commit -m 'Add amazing idea'`)
4. Push to branch (`git push origin feature/amazing-idea`)
5. Open a Pull Request

---

## 🛠️ **Troubleshooting Guide**

| Issue | Solution | Documentation |
|-------|----------|---------------|
| **DFX not running** | `dfx start --background --clean` | [DFX Docs](https://internetcomputer.org/docs/current/developer-docs/setup/install) |
| **Canister ID mismatch** | Update `.env` files in `/apps/web/` | `docs/ENV_CONFIGURATION.md` |
| **Frontend build errors** | Clear Next.js cache: `rm -rf .next/` | `docs/FRONTEND_ISSUES.md` |
| **Mobile build issues** | Flutter clean: `flutter clean && flutter pub get` | `docs/MOBILE_BUILD.md` |
| **NFT metadata not updating** | Verify canister calls and OpenSea refresh | `docs/NFT_METADATA.md` |

**Critical Fixes Pending:** See `docs/CRITICAL_FIXES_TODO.md` for ongoing issues and solutions.

---

## 📚 **Documentation Hub**

- **Architecture Deep Dive:** `docs/ARCHITECTURE.md`
- **API Reference:** `docs/API.md`
- **Security Model:** `docs/SECURITY_CHECKLIST.md`
- **Deployment Guide:** `docs/DEPLOYMENT.md`
- **Asset Tokenization Process:** `docs/TOKENIZATION_GUIDE.md`
- **DAO Governance Rules:** `docs/GOVERNANCE_RULES.md`
- **Repository Cleanup Summary:** `docs/REPO_CLEANUP_SUMMARY.md`

---

## 📄 **License & Compliance**

**License:** Apache 2.0 - See `LICENSE` for full details.

**Compliance Notes:**
- RWA tokenization complies with applicable Indian regulations
- KYC/AML procedures implemented for DAO membership
- All energy infrastructure meets local and national standards
- Regular third-party audits of both smart contracts and physical assets

---

## 🌟 **Join the Solar Revolution**

HeliosHash DAO represents a new paradigm in infrastructure ownership — decentralized, transparent, and community-powered.

**Ready to contribute?**
- **Investors:** Acquire RWA-backed NFTs on [OpenSea](https://opensea.io/collection/helioshash-rwa)
- **Developers:** Fork our repo and build with us
- **Communities:** Propose your village for our next deployment
- **Partners:** Contact us at partnerships@oneworldproject.io

---

<div align="center">

**Made with ☀️ by the OneWorldProject Community**  
**Real Assets · Real Data · Real Impact**

[Website](https://oneworldproject.io) | [Dapp](https://dapp.oneworldproject.io) | [Twitter](https://twitter.com/OneWorldPrj) | [Discord](https://discord.gg/oneworldproject)

</div>
