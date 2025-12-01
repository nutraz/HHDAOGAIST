
import { User, Post, Proposal, Project, Notification, Story } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Rahul Kumar',
  handle: '@rahul_k',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
  role: 'Investor',
  rank: "Investor & Collaborator",
  communityRole: "Community Manager",
  stats: {
    projectsStarted: 3,
    projectsHelped: 12,
    membersAdded: 45,
    followers: 1240,
    following: 350,
    reputation: 98,
  },
  tokenBalance: 15000,
  stakingBalance: 5000,
  badges: ['Early Adopter', 'Green Validator'],
  identity: {
    aadhaarVerified: true,
    panVerified: true,
    retinaHash: '0x7f...3a2b',
    confidants: 2
  },
  nftCollection: [
    {
      id: 1,
      name: "Helios#Baghpat",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=baghpat&backgroundColor=10b981",
      projectId: 1,
      community: "1WP India - Layer A Pilot"
    },
    {
      id: 2,
      name: "HeliosHash#UrgamU SEZ",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=urgamu&backgroundColor=2563eb",
      projectId: 2,
      community: "1WP India - Layer B National Model"
    },
    {
      id: 3,
      name: "EV Charging Network",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=ev&backgroundColor=eab308",
      projectId: 3,
      community: "Sustainable Transport DAO"
    }
  ]
};

export const stories: Story[] = [
  { id: 's1', user: { name: 'You', avatar: currentUser.avatar }, image: 'https://picsum.photos/200/300?random=1', viewed: false },
  { id: 's2', user: { name: 'Sarah Tech', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }, image: 'https://picsum.photos/200/300?random=2', viewed: false },
  { id: 's3', user: { name: 'Helios DAO', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helios' }, image: 'https://picsum.photos/200/300?random=3', viewed: true },
  { id: 's4', user: { name: 'Miner Mike', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' }, image: 'https://picsum.photos/200/300?random=4', viewed: false },
];

export const posts: Post[] = [
  {
    id: 'p1',
    author: {
      id: 'u2',
      name: 'Helios Official',
      handle: '@helios_dao',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helios',
      role: 'Admin',
      stats: { followers: 50000, following: 10, reputation: 100, projectsStarted: 0, projectsHelped: 0, membersAdded: 0 },
      tokenBalance: 0,
      stakingBalance: 0,
      badges: ['Official'],
      nftCollection: []
    },
    content: '☀️ Major Milestone Reached! The Baghpat Solar Plant has officially crossed 1MWh of total energy generation. This is a huge step for our decentralized energy grid. #RenewableEnergy #ICP #HeliosHash',
    image: 'https://picsum.photos/800/400',
    timestamp: '2h ago',
    likes: 1245,
    dislikes: 12,
    comments: 89,
    shares: 450,
    tags: ['milestone', 'energy'],
    type: 'milestone',
  },
  {
    id: 'p2',
    author: {
      id: 'u3',
      name: 'Sarah Engineer',
      handle: '@sarah_tech',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      role: 'Contractor',
      stats: { followers: 890, following: 400, reputation: 92, projectsStarted: 0, projectsHelped: 0, membersAdded: 0 },
      tokenBalance: 0,
      stakingBalance: 0,
      badges: ['Technical Lead'],
      nftCollection: []
    },
    content: 'Just finished the IoT sensor calibration for the new panel array. Real-time data streaming to the canister is looking stable with 99.9% uptime. 🛠️📊',
    timestamp: '4h ago',
    likes: 342,
    dislikes: 3,
    comments: 24,
    shares: 12,
    tags: ['technical', 'iot'],
    type: 'project_update',
  },
];

export const proposals: Proposal[] = [
  {
    id: 'prop-102',
    title: 'Expand Solar Array in Sector 4',
    description: 'Proposal to allocate 50,000 HHU tokens from the treasury to acquire additional land for Sector 4 expansion. Projected ROI increase of 12%.',
    status: 'Active',
    votesFor: 150000,
    votesAgainst: 12000,
    endDate: '2023-11-15',
    tags: ['Expansion', 'Treasury'],
  },
  {
    id: 'prop-101',
    title: 'Increase Staking Rewards for Long-term Holders',
    description: 'Adjust the APY curve to favor stakers locking tokens for >12 months.',
    status: 'Passed',
    votesFor: 450000,
    votesAgainst: 30000,
    endDate: '2023-10-01',
    tags: ['Tokenomics'],
  },
];

// Helper user for mock
const mockUsers = [
  currentUser,
  {...currentUser, id: 'u2', name: 'Site Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager'},
  {...currentUser, id: 'u3', name: 'Safety Officer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Safety'}
];

export const projects: Project[] = [
  {
    id: 1,
    name: "Helios#Baghpat",
    stage: "functioning",
    color: "green",
    size: "3 Acres",
    energySupply: "Village Community",
    surplus: "Local Grid",
    completion: 2, // Updated to 2%
    funding: "₹3 Cr Secured",
    fundingStats: {
      required: 0, // TBA for next phase
      secured: 30000000, // 3 Crore
      investors: 2, // Updated to 2
      minTicket: "₹5,000"
    },
    isLive: true,
    isPilot: true,
    tier: "Layer A - Pilot Zone",
    liveData: {
      panels: 42,
      currentOutput: 18.5,
      todayEnergy: 124.3,
      uptime: "99.8%",
      temperature: "28°C",
      co2Offset: "156 kg"
    },
    miningData: {
      hashrate: "450 TH/s",
      activeMiners: 5,
      powerConsumption: "15.2 kW",
      revenue: "0.0042 BTC/day",
      temperature: "65°C"
    },
    phases: [
      {
        id: 1,
        name: "Land Procurement & Pre-Construction",
        status: "completed",
        progress: 100,
        tasks: [
          { name: "Finalize Land Agreement (Lease/Equity)", status: "done" },
          { name: "Secure Permit to Dig", status: "done" },
          { name: "Electromechanical Documentation", status: "done" },
          { name: "BIM Model & Earthing Plans", status: "done" },
          { name: "Procurement Readiness", status: "done" }
        ],
        documents: ["Lease_Agreement.pdf", "Permit_to_Dig.pdf", "BIM_Model_v2.rvt"]
      },
      {
        id: 2,
        name: "Core Construction & System Integration",
        status: "active",
        progress: 35,
        tasks: [
          { name: "Land Preparation & Grading", status: "done" },
          { name: "Underground Infrastructure (Earthing/Foundations)", status: "in-progress" },
          { name: "HV/LV/ELV Cabling", status: "pending" },
          { name: "Solar Panel & Inverter Mounting", status: "pending" },
          { name: "Battery & Server Rack Deployment", status: "pending" },
          { name: "Cooling & Firefighting Systems", status: "pending" }
        ],
        documents: ["Site_Grading_Report.pdf"]
      },
      {
        id: 3,
        name: "Testing, Commissioning & Handover",
        status: "pending",
        progress: 0,
        tasks: [
          { name: "Test & Certify Installed Systems", status: "pending" },
          { name: "Energize Subsystems", status: "pending" },
          { name: "Integrated System Trials (IST)", status: "pending" },
          { name: "Enable Mining & Edge Operations", status: "pending" },
          { name: "Full Operational Handover", status: "pending" }
        ],
        documents: []
      }
    ],
    communityLevels: [
      { level: 1, available: 12, capacity: 12, voteWeight: 64, tierPriceUSDC: 3162.5 },
      { level: 2, available: 24, capacity: 24, voteWeight: 32, tierPriceUSDC: 1581.25 },
      { level: 3, available: 47, capacity: 47, voteWeight: 16, tierPriceUSDC: 841.28 },
      { level: 4, available: 94, capacity: 94, voteWeight: 8, tierPriceUSDC: 420.64 },
      { level: 5, available: 189, capacity: 189, voteWeight: 4, tierPriceUSDC: 209.21 },
      { level: 6, available: 378, capacity: 378, voteWeight: 2, tierPriceUSDC: 139.52 },
      { level: 7, available: 754, capacity: 756, voteWeight: 1, tierPriceUSDC: 69.76 }
    ],
    proposals: [
      {
        id: 'bgp-01',
        title: 'Baghpat Phase 3 Budget Release',
        description: 'Authorize release of funds for final testing equipment.',
        status: 'Active',
        votesFor: 8500,
        votesAgainst: 120,
        endDate: '2023-12-01',
        tags: ['Finance', 'Phase 3']
      }
    ],
    social: {
      rooms: [
        {
          id: 'r1',
          name: 'Site Engineering Sync',
          type: 'video',
          isActive: true,
          participants: [mockUsers[1], mockUsers[2]]
        },
        {
          id: 'r2',
          name: 'General Voice Chat',
          type: 'audio',
          isActive: false,
          participants: []
        }
      ],
      posts: [
        {
          id: 'pp1',
          author: mockUsers[1],
          content: 'Foundation pouring for Array B completed this morning. Curing process started. 🏗️',
          timestamp: '1h ago',
          likes: 24,
          dislikes: 0,
          comments: 3,
          shares: 0,
          tags: ['site-update', 'civil'],
          type: 'project_update',
          image: 'https://picsum.photos/600/300?grayscale',
          attachments: [
            { type: 'image', url: 'https://picsum.photos/600/300?grayscale' }
          ]
        },
        {
          id: 'pp2',
          author: mockUsers[2],
          content: 'Safety inspection scheduled for tomorrow at 10 AM. All personnel please ensure PPE is compliant.',
          timestamp: '3h ago',
          likes: 45,
          dislikes: 1,
          comments: 12,
          shares: 5,
          tags: ['safety', 'compliance'],
          type: 'general'
        }
      ],
      members: [
        { id: 'm1', name: 'Vikram Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram', role: 'Land Owner', isOnline: true },
        { id: 'm2', name: 'Rahul Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', role: 'Community Manager', isOnline: true },
        { id: 'm3', name: 'Participant 1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Participant1', role: 'Participant', isOnline: false, lastSeen: '2h ago' },
        { id: 'm4', name: 'Participant 2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Participant2', role: 'Participant', isOnline: false, lastSeen: '1d ago' },
        { id: 'u2', name: 'Site Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager', role: 'Site Admin', isOnline: true },
        { id: 'u3', name: 'Safety Officer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Safety', role: 'Safety', isOnline: true }
      ]
    },
    jobs: [
      { id: "j1", title: "Civil Engineer", type: "Contract", salary: "₹45k/mo", openings: 1, filled: 0 },
      { id: "j2", title: "Solar Installer", type: "Full-time", salary: "₹25k/mo", openings: 4, filled: 2 },
      { id: "j3", title: "Site Security", type: "Shift", salary: "₹15k/mo", openings: 3, filled: 3 },
      { id: "j4", title: "Mining Tech", type: "Contract", salary: "₹60k/mo", openings: 1, filled: 0 }
    ],
    dataBins: [
      { id: "b1", name: "Engineering Docs", type: "engineering", files: 12, lastUpdated: "2d ago" },
      { id: "b2", name: "Procurement Logs", type: "procurement", files: 45, lastUpdated: "1d ago" },
      { id: "b3", name: "Compliance & Safety", type: "compliance", files: 8, lastUpdated: "1w ago" },
      { id: "b4", name: "Mining Configs", type: "mining", files: 3, lastUpdated: "5h ago" }
    ],
    opportunities: [
      { type: "Community Manager", positions: 1 },
      { type: "Solar Technician", positions: 2 }
    ],
    detailedInfo: {
      location: "Baghpat, Uttar Pradesh",
      type: "India's first ICP-powered solar village DAO - Layer A Pilot",
      capacity: "3 Acres (15yr Lease)",
      technology: "Bifacial Solar Technology with MPPT",
      storage: "LiFePO4 Battery Bank - 40 kWh",
      architecture: "Natural building materials - Rammed earth walls",
      governance: "Web3 DAO with $HHU token",
      revenueModel: "Community energy sharing + Grid export + BTC Mining",
      partners: ["1WP DAO", "HeliosHash SubDAO", "Local Village Panchayat"],
      strategicRole: "Micro-scale proof-of-concept for replicable blueprint",
      milestones: [
        { date: "Jan 2024", event: "Project Initiated" },
        { date: "Mar 2024", event: "Solar Installation Complete" },
        { date: "May 2024", event: "DAO Launch & Token Distribution" },
        { date: "Nov 2024", event: "Full Community Integration" }
      ],
      impact: {
        co2Saved: "156 tons/year",
        householdsServed: "35",
        jobsCreated: "8",
        communityRevenue: "₹12L/year"
      }
    }
  },
  {
    id: 2,
    name: "HeliosHash#UrgamU",
    stage: "planning",
    color: "blue",
    size: "Special Energy Zone",
    energySupply: "12-Village Ecosystem",
    surplus: "National Grid + Bitcoin Mining",
    completion: 15,
    funding: "₹50 Cr (Target)",
    fundingStats: {
      required: 500000000,
      secured: 12000000,
      investors: 45,
      minTicket: "₹25,000"
    },
    isLive: false,
    isPilot: false,
    tier: "Layer B - Macro Scale",
    opportunities: [
      { type: "SEZ Status Application", positions: 1 },
      { type: "Infrastructure Planning", positions: 3 },
      { type: "Community Outreach", positions: 5 }
    ],
    detailedInfo: {
      location: "Urgam Valley, Chamoli, Uttarakhand",
      type: "Special Energy Zone - National Replication Model",
      capacity: "10 km infrastructure corridor",
      technology: "Solar + Advanced Renewable Technologies",
      governance: "SEZ Framework + Web3 DAO Integration",
      strategicRole: "Macro-scale national model for replication",
      partners: ["1WP DAO", "HeliosHash DAO", "State Government"],
      vision: "Self-sustained ecological energy zone dedicated to Kalpeshwar Mahadev"
    }
  },
  {
    id: 3,
    name: "EV Charging Network",
    stage: "tech-setup",
    color: "yellow",
    size: "2 MW",
    energySupply: "EV Charging Stations",
    surplus: "Community Center",
    completion: 65,
    funding: "₹1.2 Cr",
    fundingStats: {
      required: 12000000,
      secured: 8400000,
      investors: 22,
      minTicket: "₹10,000"
    },
    isLive: false,
    isPilot: false,
    opportunities: [
      { type: "Civil Engineer", positions: 1 },
      { type: "Funding Required", amount: "₹30L" }
    ]
  }
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'like', content: 'Sarah Engineer liked your post', timestamp: '5m ago', read: false },
  { id: 'n2', type: 'system', content: 'Governance Proposal #102 is ending soon', timestamp: '1h ago', read: false },
];
