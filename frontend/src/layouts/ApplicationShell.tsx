import {
    ChartNoAxesCombinedIcon,
    ChevronRightIcon,
    FacebookIcon,
    HomeIcon,
    InfoIcon,
    InstagramIcon,
    LinkedinIcon,
    PlusIcon,
    TwitterIcon,
    UsersIcon,
} from 'lucide-react';

import { Link, Outlet } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import ProfileDropdown from '@/components/blocks/DropdownProfile';
import { ModeToggle } from '@/components/mode-toggle';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

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
                                                <span>Sobre Nosotros</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to="/genres"
                                                className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                            >
                                                <UsersIcon />
                                                <span>Genres</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem> */}

                                    <Collapsible
                                        defaultOpen={false}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    <UsersIcon />
                                                    <span>Genres</span>
                                                    <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link
                                                                to="/genres"
                                                                className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                                            >
                                                                <UsersIcon />
                                                                <span>
                                                                    Listado de
                                                                    Genres
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link
                                                                to="/genres/create"
                                                                className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                                            >
                                                                <PlusIcon />
                                                                <span>
                                                                    Crear Genre
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>

                                    {/* Examples callapsible */}
                                    <Collapsible
                                        defaultOpen={false}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    <UsersIcon />
                                                    <span>Examples</span>
                                                    <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    <SidebarMenuSubItem>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link
                                                                to="/examples"
                                                                className="[&.active]:font-bold [&.active>svg]:stroke-3"
                                                            >
                                                                <PlusIcon />
                                                                <span>
                                                                    Example Form
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Admin Menú</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <UsersIcon />
                                                <span>Roles de Usuario</span>
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
                                                Implementar Breadcrumb
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {/* <LanguageDropdown
                                    trigger={
                                        <Button variant="ghost" size="icon">
                                            <LanguagesIcon />
                                        </Button>
                                    }
                                /> */}
                                <ModeToggle />
                                <ProfileDropdown
                                    trigger={
                                        <Button variant="ghost" size="icon">
                                            <Avatar className="rounded-md">
                                                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                                                <AvatarFallback>
                                                    JPA
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </header>

                    {/* Main Content - Outlet */}
                    <main className="mx-auto size-full max-w-480 flex-1 p-4 sm:px-6">
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
