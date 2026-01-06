import ApplicationShell from '@/layouts/ApplicationShell';
import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

const RootLayout = () => (
    <>
        <ApplicationShell />
        <TanStackRouterDevtools />
        <Toaster />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
