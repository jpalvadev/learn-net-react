import {
    CalendarClockIcon,
    ChartNoAxesCombinedIcon,
    FacebookIcon,
    HomeIcon,
    InfoIcon,
    InstagramIcon,
    LanguagesIcon,
    LinkedinIcon,
    SettingsIcon,
    SquareActivityIcon,
    TwitterIcon,
    Undo2Icon,
    UsersIcon,
} from 'lucide-react';

import { Link, Outlet } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
// import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import LanguageDropdown from '@/components/blocks/DropdownLanguage';
import ProfileDropdown from '@/components/blocks/DropdownProfile';

const ApplicationShell = () => {
    return (
        <div className="flex min-h-dvh w-full">
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <ChartNoAxesCombinedIcon />
                                                <span>Dashboard</span>
                                            </a>
                                        </SidebarMenuButton>
                                        <SidebarMenuBadge className="bg-primary/10 rounded-full">
                                            5
                                        </SidebarMenuBadge>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Menús</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to="/"
                                                className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                            >
                                                <HomeIcon />
                                                <span>Home</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to="/about"
                                                className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                            >
                                                <InfoIcon />
                                                <span>About</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to="/genres"
                                                className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                            >
                                                <UsersIcon />
                                                <span>Genres</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Supporting Features
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <SquareActivityIcon />
                                                <span>
                                                    Real Time Monitoring
                                                </span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <CalendarClockIcon />
                                                <span>
                                                    Schedule Post & Calendar
                                                </span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <Undo2Icon />
                                                <span>Report & Export</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <SettingsIcon />
                                                <span>
                                                    Settings & Integrations
                                                </span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <UsersIcon />
                                                <span>User Management</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <div className="flex flex-1 flex-col">
                    <header className="bg-card sticky top-0 z-50 border-b">
                        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
                            <div className="flex items-center gap-4">
                                <SidebarTrigger className="[&_svg]:!size-5" />
                                <Separator
                                    orientation="vertical"
                                    className="hidden !h-4 sm:block"
                                />
                                <Breadcrumb className="hidden sm:block">
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="#">
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                Free
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <LanguageDropdown
                                    trigger={
                                        <Button variant="ghost" size="icon">
                                            <LanguagesIcon />
                                        </Button>
                                    }
                                />
                                <ProfileDropdown
                                    trigger={
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-9.5"
                                        >
                                            <Avatar className="size-9.5 rounded-md">
                                                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                                                <AvatarFallback>
                                                    JD
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </header>

                    {/* Main Content - Outlet */}
                    <main className="mx-auto size-full max-w-7xl flex-1 p-4 sm:px-6">
                        <Outlet />
                    </main>

                    {/* Footer */}
                    <footer>
                        <div className="text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6">
                            <p className="text-sm text-balance max-sm:text-center">
                                {`©${new Date().getFullYear()}`}{' '}
                                <a href="#" className="text-primary">
                                    By Juan
                                </a>
                                , Made with ❤
                            </p>
                            <div className="flex items-center gap-5">
                                <a href="#">
                                    <FacebookIcon className="size-4" />
                                </a>
                                <a href="#">
                                    <InstagramIcon className="size-4" />
                                </a>
                                <a href="#">
                                    <LinkedinIcon className="size-4" />
                                </a>
                                <a href="#">
                                    <TwitterIcon className="size-4" />
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default ApplicationShell;
