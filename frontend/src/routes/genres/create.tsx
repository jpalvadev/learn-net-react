import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/genres/create')({
    component: CreateGenrePage,
});

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    PROJECT_STATUSES,
    projectSchema,
} from '@/modules/genres/types/genre.type';
import { toast } from 'sonner';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import { XIcon } from 'lucide-react';

function CreateGenrePage() {
    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            status: 'draft' as const,
            notifications: {
                email: false,
                sms: false,
                push: false,
            },
            users: [{ email: '' }],
        },
        resolver: zodResolver(projectSchema),
    });

    const {
        fields: users,
        append: addUser,
        remove: removeUser,
    } = useFieldArray({
        control: form.control,
        name: 'users',
        // rules: {
        //   maxLength: 5,
        //   minLength: 1,
        // },
    });

    async function createGenre(
        unsafeData: z.infer<typeof projectSchema>
    ): Promise<Record<string, boolean>> {
        const data = projectSchema.safeParse(unsafeData);
        if (!data.success) {
            return { success: false };
        }
        return { success: true };
    }

    async function onSubmit(data: z.infer<typeof projectSchema>) {
        console.log('Form submitted:', data);
        const res = await createGenre(data);

        if (res.success) {
            form.reset();
            toast('Genre created successfully', {
                description: JSON.stringify(data, null, 2),
                className: 'whitespace-pre-wrap font-mono',
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo'),
                },
            });
        } else {
            toast.error('Error creating genre', {
                description: JSON.stringify(res, null, 2),
            });
        }
    }

    return (
        <div className="container px-4 mx-auto my-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name}>
                                        Description
                                    </FieldLabel>
                                    <FieldDescription>
                                        Be as specific as possible
                                    </FieldDescription>
                                </FieldContent>
                                <Textarea
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="status"
                        control={form.control}
                        render={({
                            field: { onChange, onBlur, ...field },
                            fieldState,
                        }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Status
                                </FieldLabel>

                                <Select {...field} onValueChange={onChange}>
                                    <SelectTrigger
                                        onBlur={onBlur}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PROJECT_STATUSES.map((status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                            >
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <FieldSet>
                        <FieldContent>
                            <FieldLegend>Notifications</FieldLegend>
                            <FieldDescription>
                                Select how you would like to receive
                                notifications.
                            </FieldDescription>
                        </FieldContent>

                        <FieldGroup data-slot="checkbox-group">
                            <Controller
                                name="notifications.email"
                                control={form.control}
                                render={({
                                    field: { value, onChange, ...field },
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        orientation="horizontal"
                                    >
                                        <Checkbox
                                            {...field}
                                            checked={value}
                                            onCheckedChange={onChange}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <FieldContent>
                                            <FieldLabel htmlFor={field.name}>
                                                Email
                                            </FieldLabel>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                name="notifications.sms"
                                control={form.control}
                                render={({
                                    field: { value, onChange, ...field },
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        orientation="horizontal"
                                    >
                                        <Checkbox
                                            {...field}
                                            checked={value}
                                            onCheckedChange={onChange}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <FieldContent>
                                            <FieldLabel htmlFor={field.name}>
                                                SMS
                                            </FieldLabel>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                name="notifications.push"
                                control={form.control}
                                render={({
                                    field: { value, onChange, ...field },
                                    fieldState,
                                }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        orientation="horizontal"
                                    >
                                        <Checkbox
                                            {...field}
                                            checked={value}
                                            onCheckedChange={onChange}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <FieldContent>
                                            <FieldLabel htmlFor={field.name}>
                                                Push Notification
                                            </FieldLabel>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    {/* Users Array */}
                    <FieldSet>
                        <div className="flex justify-between gap-2 items-center">
                            <FieldContent>
                                <FieldLegend variant="label" className="mb-0">
                                    User email Addresses
                                </FieldLegend>
                                <FieldDescription>
                                    Enter the email addresses of users for this
                                    project (up to 5).
                                </FieldDescription>
                                {form.formState.errors.users?.root && (
                                    <FieldError
                                        errors={[
                                            form.formState.errors.users?.root,
                                        ]}
                                    />
                                )}
                            </FieldContent>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addUser({ email: '' })}
                            >
                                Add Users
                            </Button>
                        </div>
                        <FieldGroup>
                            {users.map((user, index) => (
                                <Controller
                                    key={user.id}
                                    name={`users.${index}.email`}
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <InputGroup>
                                                <InputGroupInput
                                                    {...field}
                                                    type="email"
                                                    id={field.name}
                                                    aria-invalid={
                                                        fieldState.invalid
                                                    }
                                                    aria-label={`User ${index + 1} email`}
                                                />
                                                <InputGroupAddon align="inline-end">
                                                    <InputGroupButton
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-xs"
                                                        onClick={() =>
                                                            removeUser(index)
                                                        }
                                                        aria-label={`Remove user ${index + 1} email`}
                                                    >
                                                        <XIcon />
                                                    </InputGroupButton>
                                                </InputGroupAddon>
                                            </InputGroup>

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            ))}
                        </FieldGroup>
                    </FieldSet>

                    <Button>Create</Button>
                </FieldGroup>
            </form>
        </div>
    );
}
