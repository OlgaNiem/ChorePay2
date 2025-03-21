import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Child {
    id: string;
    uuid: string;
    name: string;
    avatar: string | null;
}

export interface Task {
    id: string;
    title: string;
    reward: string;
    status: 'pending' | 'completed';
    assigned_to: string;
}

export interface PageProps extends Record<string, unknown> {
    auth: { user: User | null };
    children?: Child[];
    tasks?: Task[];
}
