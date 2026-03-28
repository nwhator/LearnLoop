export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
        }
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
