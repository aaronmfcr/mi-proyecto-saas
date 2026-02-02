import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Loader2 } from 'lucide-react';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    cost: z.number({ message: 'Cost must be a number' }).min(0, 'Cost must be positive'),
    billing_cycle: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']),
    category: z.string().min(1, 'Category is required'),
    renewal_date: z.string().min(1, 'Renewal date is required'),
    status: z.enum(['active', 'cancelled', 'paused']),
});

type SubscriptionFormData = z.infer<typeof schema>;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SubscriptionFormData) => Promise<{ data: any; error: string | null }>;
}

export const SubscriptionModal = ({ isOpen, onClose, onSubmit }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SubscriptionFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            status: 'active',
            billing_cycle: 'monthly',
            category: 'General',
            name: '',
            cost: 0,
            renewal_date: ''
        }
    });

    if (!isOpen) return null;

    const handleFormSubmit: SubmitHandler<SubscriptionFormData> = async (data) => {
        const { error } = await onSubmit(data);
        if (!error) {
            reset();
            onClose();
        } else {
            alert(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-border-dark overflow-hidden transition-all scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-border-dark">
                    <h2 className="text-xl font-bold">New Subscription</h2>
                    <button type="button" onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white">
                        <X className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Application Name</label>
                        <input
                            {...register('name')}
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
                            placeholder="e.g. Netflix, AWS, Slack"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('cost', { valueAsNumber: true })}
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
                                placeholder="0.00"
                            />
                            {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Billing Cycle</label>
                            <select
                                {...register('billing_cycle')}
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Category</label>
                            <input
                                {...register('category')}
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
                                placeholder="e.g. Entertainment"
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">Renewal Date</label>
                            <input
                                type="date"
                                {...register('renewal_date')}
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                            {errors.renewal_date && <p className="text-red-500 text-xs mt-1">{errors.renewal_date.message}</p>}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Add Subscription'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
