import { 
  users, faculty, banners, news, ipr, managementTeam, cellsCommittees, gallery,
  type User, type InsertUser, type Faculty, type InsertFaculty, type Banner, type InsertBanner,
  type News, type InsertNews, type Ipr, type InsertIpr, type ManagementTeam, type InsertManagementTeam,
  type CellsCommittees, type InsertCellsCommittees, type Gallery, type InsertGallery
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Faculty methods
  getFaculty(): Promise<Faculty[]>;
  getFacultyById(id: number): Promise<Faculty | undefined>;
  createFaculty(faculty: InsertFaculty): Promise<Faculty>;
  updateFaculty(id: number, faculty: Partial<InsertFaculty>): Promise<Faculty>;
  deleteFaculty(id: number): Promise<void>;

  // Banner methods
  getBanners(): Promise<Banner[]>;
  getBannerById(id: number): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner>;
  deleteBanner(id: number): Promise<void>;
  updateBannerPriority(id: number, priority: number): Promise<Banner>;

  // News methods
  getNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<InsertNews>): Promise<News>;
  deleteNews(id: number): Promise<void>;

  // IPR methods
  getIpr(): Promise<Ipr[]>;
  getIprById(id: number): Promise<Ipr | undefined>;
  createIpr(ipr: InsertIpr): Promise<Ipr>;
  updateIpr(id: number, ipr: Partial<InsertIpr>): Promise<Ipr>;
  deleteIpr(id: number): Promise<void>;

  // Management Team methods
  getManagementTeam(): Promise<ManagementTeam[]>;
  getManagementTeamById(id: number): Promise<ManagementTeam | undefined>;
  createManagementTeam(member: InsertManagementTeam): Promise<ManagementTeam>;
  updateManagementTeam(id: number, member: Partial<InsertManagementTeam>): Promise<ManagementTeam>;
  deleteManagementTeam(id: number): Promise<void>;

  // Cells & Committees methods
  getCellsCommittees(): Promise<CellsCommittees[]>;
  getCellsCommitteesById(id: number): Promise<CellsCommittees | undefined>;
  createCellsCommittees(cell: InsertCellsCommittees): Promise<CellsCommittees>;
  updateCellsCommittees(id: number, cell: Partial<InsertCellsCommittees>): Promise<CellsCommittees>;
  deleteCellsCommittees(id: number): Promise<void>;

  // Gallery methods
  getGallery(): Promise<Gallery[]>;
  getGalleryById(id: number): Promise<Gallery | undefined>;
  createGallery(item: InsertGallery): Promise<Gallery>;
  updateGallery(id: number, item: Partial<InsertGallery>): Promise<Gallery>;
  deleteGallery(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private faculty: Map<number, Faculty> = new Map();
  private banners: Map<number, Banner> = new Map();
  private news: Map<number, News> = new Map();
  private ipr: Map<number, Ipr> = new Map();
  private managementTeam: Map<number, ManagementTeam> = new Map();
  private cellsCommittees: Map<number, CellsCommittees> = new Map();
  private gallery: Map<number, Gallery> = new Map();
  private currentId: number = 1;

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Faculty methods
  async getFaculty(): Promise<Faculty[]> {
    return Array.from(this.faculty.values());
  }

  async getFacultyById(id: number): Promise<Faculty | undefined> {
    return this.faculty.get(id);
  }

  async createFaculty(insertFaculty: InsertFaculty): Promise<Faculty> {
    const id = this.currentId++;
    const faculty: Faculty = { 
      ...insertFaculty, 
      id, 
      createdAt: new Date() 
    };
    this.faculty.set(id, faculty);
    return faculty;
  }

  async updateFaculty(id: number, updateData: Partial<InsertFaculty>): Promise<Faculty> {
    const existing = this.faculty.get(id);
    if (!existing) throw new Error('Faculty not found');
    
    const updated: Faculty = { ...existing, ...updateData };
    this.faculty.set(id, updated);
    return updated;
  }

  async deleteFaculty(id: number): Promise<void> {
    this.faculty.delete(id);
  }

  // Banner methods
  async getBanners(): Promise<Banner[]> {
    return Array.from(this.banners.values()).sort((a, b) => a.priority - b.priority);
  }

  async getBannerById(id: number): Promise<Banner | undefined> {
    return this.banners.get(id);
  }

  async createBanner(insertBanner: InsertBanner): Promise<Banner> {
    const id = this.currentId++;
    const banner: Banner = { 
      ...insertBanner, 
      id, 
      createdAt: new Date() 
    };
    this.banners.set(id, banner);
    return banner;
  }

  async updateBanner(id: number, updateData: Partial<InsertBanner>): Promise<Banner> {
    const existing = this.banners.get(id);
    if (!existing) throw new Error('Banner not found');
    
    const updated: Banner = { ...existing, ...updateData };
    this.banners.set(id, updated);
    return updated;
  }

  async deleteBanner(id: number): Promise<void> {
    this.banners.delete(id);
  }

  async updateBannerPriority(id: number, priority: number): Promise<Banner> {
    return this.updateBanner(id, { priority });
  }

  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort((a, b) => 
      new Date(b.publishDate || b.createdAt!).getTime() - new Date(a.publishDate || a.createdAt!).getTime()
    );
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentId++;
    const news: News = { 
      ...insertNews, 
      id, 
      publishDate: new Date(),
      createdAt: new Date() 
    };
    this.news.set(id, news);
    return news;
  }

  async updateNews(id: number, updateData: Partial<InsertNews>): Promise<News> {
    const existing = this.news.get(id);
    if (!existing) throw new Error('News not found');
    
    const updated: News = { ...existing, ...updateData };
    this.news.set(id, updated);
    return updated;
  }

  async deleteNews(id: number): Promise<void> {
    this.news.delete(id);
  }

  // IPR methods
  async getIpr(): Promise<Ipr[]> {
    return Array.from(this.ipr.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getIprById(id: number): Promise<Ipr | undefined> {
    return this.ipr.get(id);
  }

  async createIpr(insertIpr: InsertIpr): Promise<Ipr> {
    const id = this.currentId++;
    const ipr: Ipr = { 
      ...insertIpr, 
      id, 
      createdAt: new Date() 
    };
    this.ipr.set(id, ipr);
    return ipr;
  }

  async updateIpr(id: number, updateData: Partial<InsertIpr>): Promise<Ipr> {
    const existing = this.ipr.get(id);
    if (!existing) throw new Error('IPR not found');
    
    const updated: Ipr = { ...existing, ...updateData };
    this.ipr.set(id, updated);
    return updated;
  }

  async deleteIpr(id: number): Promise<void> {
    this.ipr.delete(id);
  }

  // Management Team methods
  async getManagementTeam(): Promise<ManagementTeam[]> {
    return Array.from(this.managementTeam.values());
  }

  async getManagementTeamById(id: number): Promise<ManagementTeam | undefined> {
    return this.managementTeam.get(id);
  }

  async createManagementTeam(insertMember: InsertManagementTeam): Promise<ManagementTeam> {
    const id = this.currentId++;
    const member: ManagementTeam = { 
      ...insertMember, 
      id, 
      createdAt: new Date() 
    };
    this.managementTeam.set(id, member);
    return member;
  }

  async updateManagementTeam(id: number, updateData: Partial<InsertManagementTeam>): Promise<ManagementTeam> {
    const existing = this.managementTeam.get(id);
    if (!existing) throw new Error('Management team member not found');
    
    const updated: ManagementTeam = { ...existing, ...updateData };
    this.managementTeam.set(id, updated);
    return updated;
  }

  async deleteManagementTeam(id: number): Promise<void> {
    this.managementTeam.delete(id);
  }

  // Cells & Committees methods
  async getCellsCommittees(): Promise<CellsCommittees[]> {
    return Array.from(this.cellsCommittees.values());
  }

  async getCellsCommitteesById(id: number): Promise<CellsCommittees | undefined> {
    return this.cellsCommittees.get(id);
  }

  async createCellsCommittees(insertCell: InsertCellsCommittees): Promise<CellsCommittees> {
    const id = this.currentId++;
    const cell: CellsCommittees = { 
      ...insertCell, 
      id, 
      createdAt: new Date() 
    };
    this.cellsCommittees.set(id, cell);
    return cell;
  }

  async updateCellsCommittees(id: number, updateData: Partial<InsertCellsCommittees>): Promise<CellsCommittees> {
    const existing = this.cellsCommittees.get(id);
    if (!existing) throw new Error('Cell/Committee not found');
    
    const updated: CellsCommittees = { ...existing, ...updateData };
    this.cellsCommittees.set(id, updated);
    return updated;
  }

  async deleteCellsCommittees(id: number): Promise<void> {
    this.cellsCommittees.delete(id);
  }

  // Gallery methods
  async getGallery(): Promise<Gallery[]> {
    return Array.from(this.gallery.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getGalleryById(id: number): Promise<Gallery | undefined> {
    return this.gallery.get(id);
  }

  async createGallery(insertItem: InsertGallery): Promise<Gallery> {
    const id = this.currentId++;
    const item: Gallery = { 
      ...insertItem, 
      id, 
      createdAt: new Date() 
    };
    this.gallery.set(id, item);
    return item;
  }

  async updateGallery(id: number, updateData: Partial<InsertGallery>): Promise<Gallery> {
    const existing = this.gallery.get(id);
    if (!existing) throw new Error('Gallery item not found');
    
    const updated: Gallery = { ...existing, ...updateData };
    this.gallery.set(id, updated);
    return updated;
  }

  async deleteGallery(id: number): Promise<void> {
    this.gallery.delete(id);
  }
}

export const storage = new MemStorage();
