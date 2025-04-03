import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ListChecks, ListPlus, Folder, UserRoundPlus, Wallet, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Tasks',
    url: '/tasks',
    icon: ListChecks,
  },
  {
    title: 'Create new task',
    url: '/new-task',
    icon: ListPlus,
  },
  {
    title: 'Balance',
    url: '/dashboard',
    icon: Wallet,
  },
];

//const footerNavItems: NavItem[] = [];
  


export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full overflow-y-auto">
        <NavMain items={mainNavItems} />

        <div className="mt-auto">
          {/* <NavFooter items={footerNavItems} /> */}

          <div className="px-2 pt-2 pb-4 mb-5 bg-white">
            <NavUser />
          </div>
        </div>
      </SidebarContent>

    </Sidebar>
  );
}
