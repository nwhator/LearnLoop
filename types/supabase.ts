export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          id: string
          study_set_id: string
          front: string
          back: string
          created_at: string
        }
        Insert: {
          id?: string
          study_set_id: string
          front: string
          back: string
          created_at?: string
        }
        Update: {
          id?: string
          study_set_id?: string
          front?: string
          back?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_study_set_id_fkey"
            columns: ["study_set_id"]
            isOneToOne: false
            referencedRelation: "study_sets"
            referencedColumns: ["id"]
          }
        ]
      }
      leaderboard: {
        Row: {
          rank: number
          updated_at: string | null
          user_id: string
          xp: number
        }
        Insert: {
          rank: number
          updated_at?: string | null
          user_id: string
          xp: number
        }
        Update: {
          rank?: number
          updated_at?: string | null
          user_id?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          reward_xp: number | null
          target_value: number
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reward_xp?: number | null
          target_value: number
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reward_xp?: number | null
          target_value?: number
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      moderation_items: {
        Row: {
          content_id: string
          created_at: string | null
          flagged_by: string | null
          id: string
          reason: string
          reviewed_at: string | null
          status: string
          type: string
        }
        Insert: {
          content_id: string
          created_at?: string | null
          flagged_by?: string | null
          id?: string
          reason: string
          reviewed_at?: string | null
          status?: string
          type: string
        }
        Update: {
          content_id?: string
          created_at?: string | null
          flagged_by?: string | null
          id?: string
          reason?: string
          reviewed_at?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_items_flagged_by_fkey"
            columns: ["flagged_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          id: string
          is_read: boolean
          recipient_id: string | null
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean
          recipient_id?: string | null
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean
          recipient_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          id: string
          study_set_id: string
          question: string
          options: Json
          correct_answer: string
          created_at: string
        }
        Insert: {
          id?: string
          study_set_id: string
          question: string
          options: Json
          correct_answer: string
          created_at?: string
        }
        Update: {
          id?: string
          study_set_id?: string
          question?: string
          options?: Json
          correct_answer?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_study_set_id_fkey"
            columns: ["study_set_id"]
            isOneToOne: false
            referencedRelation: "study_sets"
            referencedColumns: ["id"]
          }
        ]
      }
      study_sets: {
        Row: {
          category: string | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_public: boolean
          summary_notes: Json | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          summary_notes?: Json | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          summary_notes?: Json | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_sets_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_diagnostics: {
        Row: {
          id: string
          user_id: string
          study_set_id: string | null
          question_text: string
          ai_feedback: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          study_set_id?: string | null
          question_text: string
          ai_feedback: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          study_set_id?: string | null
          question_text?: string
          ai_feedback?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_diagnostics_study_set_id_fkey"
            columns: ["study_set_id"]
            isOneToOne: false
            referencedRelation: "study_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_diagnostics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_missions: {
        Row: {
          completed_at: string | null
          current_value: number | null
          id: string
          is_claimed: boolean | null
          is_completed: boolean | null
          mission_id: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          current_value?: number | null
          id?: string
          is_claimed?: boolean | null
          is_completed?: boolean | null
          mission_id?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          current_value?: number | null
          id?: string
          is_claimed?: boolean | null
          is_completed?: boolean | null
          mission_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_missions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_missions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          created_at: string | null
          current_xp: number | null
          last_activity_at: string | null
          level: number | null
          streak_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_xp?: number | null
          last_activity_at?: string | null
          level?: number | null
          streak_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_xp?: number | null
          last_activity_at?: string | null
          level?: number | null
          streak_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          initials: string | null
          is_banned: boolean | null
          last_activity_at: string | null
          level: number
          name: string
          status: string | null
          streak_count: number
          updated_at: string | null
          xp: number
          subscription_tier: string
          daily_credits: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id?: string
          initials?: string | null
          is_banned?: boolean | null
          last_activity_at?: string | null
          level?: number
          name: string
          status?: string | null
          streak_count?: number
          updated_at?: string | null
          xp?: number
          subscription_tier?: string
          daily_credits?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          initials?: string | null
          is_banned?: boolean | null
          last_activity_at?: string | null
          level?: number
          name?: string
          status?: string | null
          streak_count?: number
          updated_at?: string | null
          xp?: number
          subscription_tier?: string
          daily_credits?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_user_xp: {
        Args: {
          xp_amount: number
        }
        Returns: undefined
      }
      deduct_credit: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
