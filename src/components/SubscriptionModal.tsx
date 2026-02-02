import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Loader2 } from 'lucide-react';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    cost: z.coerce.number().min(0, 'Cost must be positive'),
    billing_cycle: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']),
    category: z.string().min(1, 'Category is required'),
    renewal_date: z.string().min(1, 'Renewal date is required'),
    status: z.enum(['active', 'cancelled', 'paused']).default('active'),
});

type FormData = z.infer<typeof schema>;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => Promise<{ data: any; error: string | null }>;
}

export const SubscriptionModal = ({ isOpen, onClose, onSubmit }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            status: 'active',
            billing_cycle: 'monthly',
            category: 'General'
        }
    });

    if (!isOpen) return null;

    const handleFormSubmit = async (data: FormData) => {
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
            <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-border-dark">
                    <h2 className="text-xl font-bold">New Subscription</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <X className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Application Name</label>
                        <input
                            {...register('name')}
                            className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. Netflix, AWS, Slack"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('cost')}
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="0.00"
                            />
                            {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Billing Cycle</label>
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
                            <label className="block text-sm font-medium mb-1.5">Category</label>
                            <input
                                {...register('category')}
                                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition-all"
                                placeholder="e.g. Entertainment"
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Renewal Date</label>
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
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
