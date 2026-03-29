
// Ensure this Database type is the default export for Supabase client typing
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          initials: string | null
          level: number
          xp: number
          streak_count: number
          created_at: string
          updated_at: string | null
          preferences: {
            darkMode?: boolean;
            emailNotifs?: boolean;
            inAppAlerts?: boolean;
            [key: string]: any;
          } | null;
        }
        Insert: {
          id: string
          email: string
          name: string
          initials?: string | null
          level?: number
          xp?: number
          streak_count?: number
          created_at?: string
          updated_at?: string | null
          preferences?: {
            darkMode?: boolean;
            emailNotifs?: boolean;
            inAppAlerts?: boolean;
            [key: string]: any;
          } | null;
        }
        Update: {
          id?: string
          email?: string
          name?: string
          initials?: string | null
          level?: number
          xp?: number
          streak_count?: number
          created_at?: string
          updated_at?: string | null
          preferences?: {
            darkMode?: boolean;
            emailNotifs?: boolean;
            inAppAlerts?: boolean;
            [key: string]: any;
          } | null;
        }
      },
      study_sets: {
        Row: {
          id: string;
          creator_id: string | null;
          title: string;
          description: string | null;
          category: string | null;
          tags: string[] | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          title: string;
          description?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creator_id?: string | null;
          title?: string;
          description?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      },
      missions: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          reward_xp: number;
          type: "daily" | "weekly" | "achievement";
          target_value: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          reward_xp?: number;
          type: "daily" | "weekly" | "achievement";
          target_value: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          reward_xp?: number;
          type?: "daily" | "weekly" | "achievement";
          target_value?: number;
          is_active?: boolean;
          created_at?: string;
        };
      },
      user_missions: {
        Row: {
          id: string;
          user_id: string;
          mission_id: string;
          current_value: number;
          is_completed: boolean;
          is_claimed: boolean;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          mission_id: string;
          current_value?: number;
          is_completed?: boolean;
          is_claimed?: boolean;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          mission_id?: string;
          current_value?: number;
          is_completed?: boolean;
          is_claimed?: boolean;
          completed_at?: string | null;
        };
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// For Supabase client typing
