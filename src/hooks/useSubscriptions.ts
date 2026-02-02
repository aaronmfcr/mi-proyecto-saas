import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type InsertSubscription = Database['public']['Tables']['subscriptions']['Insert'];

export const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('subscriptions')
                .select('*')
                .order('renewal_date', { ascending: true });

            if (error) throw error;
            setSubscriptions(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const addSubscription = async (newSub: Omit<InsertSubscription, 'user_id'>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('subscriptions')
                .insert([{ ...newSub, user_id: user.id }])
                .select()
                .single();

            if (error) throw error;
            setSubscriptions((prev) => [...prev, data]);
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err instanceof Error ? err.message : 'An unknown error occurred' };
        }
    };

    const totalMonthlySpend = useMemo(() => {
        return subscriptions.reduce((total, sub) => {
            const cost = Number(sub.cost);
            if (sub.status !== 'active') return total;

            switch (sub.billing_cycle) {
                case 'yearly':
                    return total + cost / 12;
                case 'quarterly':
                    return total + cost / 3;
                case 'weekly':
                    return total + cost * 4;
                case 'monthly':
                default:
                    return total + cost;
            }
        }, 0);
    }, [subscriptions]);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return {
        subscriptions,
        loading,
        error,
        addSubscription,
        totalMonthlySpend,
        refresh: fetchSubscriptions,
    };
};
