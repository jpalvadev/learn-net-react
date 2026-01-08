import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { zodValidator } from '@tanstack/zod-form-adapter'; // npm i @tanstack/zod-form-adapter
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const genreSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});

// API function
async function createGenre(data: z.infer<typeof genreSchema>) {
    const response = await fetch('/api/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create genre');
    return response.json();
}

export function CreateGenreForm() {
    const queryClient = useQueryClient();

    // React Query mutation
    const mutation = useMutation({
        mutationFn: createGenre,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['genres'] });
            toast.success('Genre created successfully');
            form.reset();
        },
        onError: (error) => {
            toast.error('Failed to create genre', {
                description: error.message,
                action: {
                    label: 'Retry',
                    onClick: () => mutation.mutate(form.state.values),
                },
            });
        },
    });

    // TanStack Form
    const form = useForm({
        defaultValues: {
            name: '',
        },
        // validatorAdapter: zodValidator(),
        validationLogic: revalidateLogic(),
        validators: {
            onChange: genreSchema,
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.Field name="name">
                {(field) => (
                    <div>
                        <Input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Genre name"
                        />
                        {field.state.meta.errors && (
                            <p className="text-red-500">
                                {field.state.meta.errors[0]?.message}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create Genre'}
            </Button>
        </form>
    );
}
