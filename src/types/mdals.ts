// ============================================
// MDALS - MUSIC-DRIVEN ADAPTIVE LEARNING SYSTEMS
// ============================================

export type MdalsSongSourceType = 'spotify' | 'apple' | 'youtube' | 'manual' | 'other';
export type MdalsLearningPlanStatus = 'active' | 'completed' | 'paused' | 'abandoned';
export type MdalsDomain = 'spiritual' | 'leadership' | 'business' | 'healing' | 'personal-growth' | 'relationships' | 'mental-health';

export interface MdalsSong {
  id: string;
  user_id: string;
  title: string;
  artist?: string;
  album?: string;
  source_type: MdalsSongSourceType;
  source_id?: string;
  source_url?: string;
  user_notes?: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface MdalsSongReference {
  type: 'scripture' | 'leadership' | 'psychology' | 'book' | 'principle';
  value: string;
  reason: string;
}

export interface MdalsSongInsight {
  id: string;
  song_id: string;
  summary: string;
  themes: string[];
  emotions: string[];
  domain_tags: MdalsDomain[];
  references: MdalsSongReference[];
  domain_preferences: string[];
  model_used?: string;
  created_at: string;
}

export interface MdalsLearningPlanDay {
  day: number;
  focus: string;
  references: string[];
  activities: string[];
  reflection: string;
  prayer_or_action: string;
}

export interface MdalsLearningPlan {
  id: string;
  user_id: string;
  song_id: string;
  title: string;
  goal_description?: string;
  duration_days: number;
  domain_preferences: string[];
  plan_json: MdalsLearningPlanDay[];
  status: MdalsLearningPlanStatus;
  current_day: number;
  started_at: string;
  completed_at?: string;
  model_used?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  song?: MdalsSong;
}

export interface MdalsSongWithInsight {
  song: {
    id: string;
    title: string;
    artist?: string;
    source_type: MdalsSongSourceType;
    source_url?: string;
    created_at: string;
  };
  insight_summary?: string;
  themes?: string[];
  plans_count: number;
}

// MDALS API Request/Response Types
export interface MdalsAnalyzeSongRequest {
  song: {
    title: string;
    artist?: string;
    album?: string;
    source_type: MdalsSongSourceType;
    source_id?: string;
    source_url?: string;
  };
  user_id?: string;
  domain_preferences?: string[];
  user_notes?: string;
  language?: string;
}

export interface MdalsAnalyzeSongResponse {
  success: boolean;
  song_id: string;
  insight_id: string;
  summary: string;
  themes: string[];
  emotions: string[];
  domain_tags: string[];
  references: MdalsSongReference[];
  error?: string;
}

export interface MdalsGeneratePlanRequest {
  user_id?: string;
  song_id: string;
  goal_description: string;
  duration_days?: number;
  domain_preferences?: string[];
}

export interface MdalsGeneratePlanResponse {
  success: boolean;
  plan_id: string;
  title: string;
  duration_days: number;
  goal_description: string;
  days: MdalsLearningPlanDay[];
  error?: string;
  status?: 'draft' | 'paused' | 'active' | 'completed';
}
