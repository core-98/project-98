// Type definitions for AI News cache

// Define the AINewsCache type for type safety
export type AINewsCache = {
  id?: number;
  created_at?: string;
  report: string;
  search_results: string;
  last_updated: string;
};

// This file only exports types, no client is created here
// The actual Supabase client will be created in the API route
