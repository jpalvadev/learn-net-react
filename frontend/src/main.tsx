import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import the generated route tree
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './components/theme-provider';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>
    );
}
