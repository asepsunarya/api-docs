import type { ObjectId } from 'mongodb';

export type SiteKey = 'default' | string;

export interface ApiDocsSettings {
  _id?: ObjectId;
  siteKey: SiteKey;
  title: string;
  description: string;
  logoUrl?: string;
  primaryColor?: string;
  updatedAt: Date;
}

export interface OpenApiSource {
  _id?: ObjectId;
  siteKey: SiteKey;
  name: string;
  sourceUrl: string;
  schemaJson?: unknown;
  isActive: boolean;
  lastSyncedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocPageRecord {
  _id?: ObjectId;
  siteKey: SiteKey;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NavLinkRecord {
  _id?: ObjectId;
  siteKey: SiteKey;
  label: string;
  url: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
