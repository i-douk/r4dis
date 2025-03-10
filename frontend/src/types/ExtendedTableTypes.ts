import type { Tables } from 'database/types';

export type ExtendedPodcast = Tables<'podcasts'> & {
    podcaster: {
        id: string
        username: string
        avatar_url: string
        created_at: string
        updated_at: string
    }
    followerscount: number
    followers: {
        id: string
        username: string
        avatar_url: string
        created_at: string
        updated_at: string
        following: {
            id: string
            created_at: string
            updated_at: string
            podcast_id: string
        }[]
    }[]
  };

export type ExtendedPodcaster = Tables<'podcasters'> & {
    subscriberscount: number
    podcasts: {
        id: string
        name: string
        description: string
        created_at: string
        updated_at: string
    }[]
    subscribers: {
        id: string  
        username: string
        avatar_url: string
        created_at: string
        updated_at: string
        subscription: { 
            id: string
            created_at: string
            updated_at: string
            podcaster_id: string
            user_id: string
        }
    }[]
};
