

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  rank?: string;
  communityRole?: string;
  stats: {
    projectsStarted: number;
    projectsHelped: number;
    membersAdded: number;
    followers: number;
    following: number;
    reputation: number;
  };
  tokenBalance: number;
  stakingBalance: number;
  badges: string[];
  nftCollection: NFT[];
  identity?: {
    aadhaarVerified: boolean;
    panVerified: boolean;
    retinaHash?: string;
    confidants: number;
  };
}

export interface NFT {
  id: number;
  name: string;
  image: string;
  projectId: number;
  community: string;
}

export interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  viewed: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  video?: string; // Added video support
  timestamp: string;
  likes: number;
  dislikes: number; // Added dislikes
  comments: number;
  shares: number;
  tags: string[];
  type: 'general' | 'project_update' | 'governance' | 'milestone';
}

export interface ProjectPost extends Post {
  attachments?: { type: 'image' | 'video' | 'file'; url: string }[];
}

export interface ConferenceRoom {
  id: string;
  name: string;
  type: 'video' | 'audio';
  participants: User[];
  isActive: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Passed' | 'Rejected' | 'Pending';
  votesFor: number;
  votesAgainst: number;
  endDate: string;
  tags: string[];
}

export interface ProjectPhase {
  id: number;
  name: string;
  status: 'completed' | 'active' | 'pending';
  progress: number;
  tasks: { name: string; status: 'done' | 'in-progress' | 'pending' }[];
  documents: string[];
}

export interface MiningStats {
  hashrate: string;
  activeMiners: number;
  powerConsumption: string;
  revenue: string;
  temperature: string;
}

export interface CommunityLevel {
  level: number;
  available: number;
  capacity: number;
  voteWeight: number; // PTS
  tierPriceUSDC: number;
}

export interface JobRole {
  id: string;
  title: string;
  type: string;
  salary: string;
  openings: number;
  filled: number;
}

export interface DataBin {
  id: string;
  name: string;
  type: 'engineering' | 'procurement' | 'mining' | 'compliance';
  files: number;
  lastUpdated: string;
}

export interface ProjectSocial {
  rooms: ConferenceRoom[];
  posts: ProjectPost[];
  members: ChatUser[];
}

export interface Project {
  id: number;
  name: string;
  stage: string;
  color: 'green' | 'blue' | 'yellow' | 'orange';
  size: string;
  energySupply: string;
  surplus: string;
  completion: number;
  funding: string;
  fundingStats?: {
    required: number;
    secured: number;
    investors: number;
    minTicket: string;
  };
  isLive: boolean;
  isPilot: boolean;
  tier?: string;
  imageUrl?: string;
  liveData?: {
    panels: number;
    currentOutput: number;
    todayEnergy: number;
    uptime: string;
    temperature: string;
    co2Offset?: string;
  };
  miningData?: MiningStats;
  phases?: ProjectPhase[];
  communityLevels?: CommunityLevel[];
  jobs?: JobRole[];
  dataBins?: DataBin[];
  proposals?: Proposal[];
  social?: ProjectSocial;
  opportunities: {
    type: string;
    positions?: number;
    amount?: string;
  }[];
  detailedInfo?: {
    location: string;
    type: string;
    capacity: string;
    technology?: string;
    storage?: string;
    architecture?: string;
    governance?: string;
    revenueModel?: string;
    partners?: string[];
    strategicRole?: string;
    vision?: string;
    milestones?: { date: string; event: string }[];
    impact?: { [key: string]: string };
  };
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  content: string;
  timestamp: string;
  read: boolean;
}

// Application Forms Types
export type ApplicationRole = 'landowner' | 'contractor' | 'entrepreneur' | 'citizen';

export interface IdentityVerification {
  aadhaar: string;
  pan: string;
  mobile: string;
  retinaScan: boolean;
  confidants: string[];
}

export interface LandOwnerProfile {
  landType: 'Agricultural' | 'Commercial' | 'Industrial' | 'Residential';
  sizeAcres: number;
  coordinates: string;
  hasAccessRoad: boolean;
  gridProximityMeters: number;
  partnershipModel: 'Lease' | 'Co-develop' | 'Full Ownership';
}

export interface ContractorProfile {
  category: 'Solar EPC' | 'Civil' | 'Electrical' | 'Mining' | 'IoT' | 'Maintenance';
  experienceYears: number;
  teamSize: number;
  regions: string[];
  certifications: string[];
}

export interface EntrepreneurProfile {
  projectCategory: string;
  description: string;
  impactEstimate: string;
  govtLandType?: 'Panchayat' | 'Forest' | 'Revenue' | 'Municipal';
  supportNeeded: string[];
}

export interface ApplicationData {
  role: ApplicationRole;
  identity: IdentityVerification;
  landDetails?: LandOwnerProfile;
  contractorDetails?: ContractorProfile;
  entrepreneurDetails?: EntrepreneurProfile;
  citizenInterest?: string;
  files: { [key: string]: File | null };
}
