import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/genres/create')({
    component: CreateGenrePage,
});

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import {
    PROJECT_STATUSES,
    projectSchema,
} from '@/modules/genres/types/genre.type';
import { toast } from 'sonner';
import * as z from 'zod';

import { useAppForm } from '@/components/form/hooks';
import { Button } from '@/components/ui/button';
import { SelectItem } from '@/components/ui/select';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import { XIcon } from 'lucide-react';

type FormData = z.infer<typeof projectSchema>;

function CreateGenrePage() {
    const form = useAppForm({
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
        } satisfies FormData as FormData,
        validators: {
            onSubmit: projectSchema,
        },
        onSubmit: async ({ value }) => {
            console.log('Form submitted:', value);
            const res = await createGenre(value);

            if (res.success) {
                form.reset();
                toast('Genre created successfully', {
                    description: JSON.stringify(value, null, 2),
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
        },
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

    return (
        <div className="container px-4 mx-auto my-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
                    <form.AppField name="name">
                        {(field) => <field.Input label="Name" />}
                    </form.AppField>

                    <form.AppField name="description">
                        {(field) => (
                            <field.Textarea
                                label="Description"
                                description="Be as specific as possible"
                            />
                        )}
                    </form.AppField>

                    <form.AppField name="status">
                        {(field) => (
                            <field.Select label="Status">
                                {PROJECT_STATUSES.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </field.Select>
                        )}
                    </form.AppField>

                    <FieldSet>
                        <FieldContent>
                            <FieldLegend>Notifications</FieldLegend>
                            <FieldDescription>
                                Select how you would like to receive
                                notifications.
                            </FieldDescription>
                        </FieldContent>

                        <FieldGroup data-slot="checkbox-group">
                            <form.AppField name="notifications.email">
                                {(field) => <field.Checkbox label="Email" />}
                            </form.AppField>

                            <form.AppField name="notifications.sms">
                                {(field) => <field.Checkbox label="SMS" />}
                            </form.AppField>

                            <form.AppField name="notifications.push">
                                {(field) => <field.Checkbox label="Push" />}
                            </form.AppField>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    <form.Field name="users" mode="array">
                        {(field) => {
                            return (
                                <FieldSet>
                                    <div className="flex justify-between gap-2 items-center">
                                        <FieldContent>
                                            <FieldLegend
                                                variant="label"
                                                className="mb-0"
                                            >
                                                User Email Addresses
                                            </FieldLegend>
                                            <FieldDescription>
                                                Add up to 5 users to this
                                                project (including yourself).
                                            </FieldDescription>
                                            {field.state.meta.errors && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </FieldContent>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                field.pushValue({ email: '' })
                                            }
                                        >
                                            Add User
                                        </Button>
                                    </div>
                                    <FieldGroup>
                                        {field.state.value.map((_, index) => (
                                            <form.Field
                                                key={index}
                                                name={`users[${index}].email`}
                                            >
                                                {(innerField) => {
                                                    const isInvalid =
                                                        innerField.state.meta
                                                            .isTouched &&
                                                        !innerField.state.meta
                                                            .isValid;
                                                    return (
                                                        <Field
                                                            orientation="horizontal"
                                                            data-invalid={
                                                                isInvalid
                                                            }
                                                        >
                                                            <FieldContent>
                                                                <InputGroup>
                                                                    <InputGroupInput
                                                                        id={
                                                                            innerField.name
                                                                        }
                                                                        aria-invalid={
                                                                            isInvalid
                                                                        }
                                                                        aria-label={`User ${index + 1} email`}
                                                                        type="email"
                                                                        onBlur={
                                                                            innerField.handleBlur
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            innerField.handleChange(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        value={
                                                                            innerField
                                                                                .state
                                                                                .value
                                                                        }
                                                                    />
                                                                    {field.state
                                                                        .value
                                                                        .length >
                                                                        1 && (
                                                                        <InputGroupAddon align="inline-end">
                                                                            <InputGroupButton
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon-xs"
                                                                                onClick={() =>
                                                                                    field.removeValue(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                aria-label={`Remove User ${index + 1}`}
                                                                            >
                                                                                <XIcon />
                                                                            </InputGroupButton>
                                                                        </InputGroupAddon>
                                                                    )}
                                                                </InputGroup>
                                                                {isInvalid && (
                                                                    <FieldError
                                                                        errors={
                                                                            innerField
                                                                                .state
                                                                                .meta
                                                                                .errors
                                                                        }
                                                                    />
                                                                )}
                                                            </FieldContent>
                                                        </Field>
                                                    );
                                                }}
                                            </form.Field>
                                        ))}
                                    </FieldGroup>
                                </FieldSet>
                            );
                        }}
                    </form.Field>

                    <Button type="submit">Create</Button>
                </FieldGroup>
            </form>
        </div>
    );
}
