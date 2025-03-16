import { 
  users, 
  type User, 
  type InsertUser, 
  quizResults, 
  type QuizResult, 
  type InsertQuizResult 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResultsByUser(userId: number): Promise<QuizResult[]>;
  getQuizResultsByTable(tableNumber: number): Promise<QuizResult[]>;
  getQuizResultsByUserAndTable(userId: number, tableNumber: number): Promise<QuizResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizResults: Map<number, QuizResult>;
  currentUserId: number;
  currentQuizResultId: number;

  constructor() {
    this.users = new Map();
    this.quizResults = new Map();
    this.currentUserId = 1;
    this.currentQuizResultId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.currentQuizResultId++;
    const timestamp = new Date();
    const result: QuizResult = { 
      ...insertResult, 
      id, 
      timestamp
    };
    this.quizResults.set(id, result);
    return result;
  }

  async getQuizResultsByUser(userId: number): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  async getQuizResultsByTable(tableNumber: number): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(
      (result) => result.tableNumber === tableNumber
    );
  }

  async getQuizResultsByUserAndTable(userId: number, tableNumber: number): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(
      (result) => result.userId === userId && result.tableNumber === tableNumber
    );
  }
}

export const storage = new MemStorage();
