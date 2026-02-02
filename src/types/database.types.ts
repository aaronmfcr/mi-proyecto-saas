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
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            subscriptions: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    name: string
                    cost: number
                    billing_cycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly'
                    category: string
                    renewal_date: string
                    status: 'active' | 'cancelled' | 'paused'
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    name: string
                    cost?: number
                    billing_cycle?: 'monthly' | 'yearly' | 'weekly' | 'quarterly'
                    category?: string
                    renewal_date: string
                    status?: 'active' | 'cancelled' | 'paused'
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    name?: string
                    cost?: number
                    billing_cycle?: 'monthly' | 'yearly' | 'weekly' | 'quarterly'
                    category?: string
                    renewal_date?: string
                    status?: 'active' | 'cancelled' | 'paused'
                }
                Relationships: [
                    {
                        foreignKeyName: "subscriptions_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
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
    }
}
