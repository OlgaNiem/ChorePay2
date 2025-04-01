import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';


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

export interface Auth {
    user: User;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
    [key: string]: string;
  }

export interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: string | boolean;
}


 
export interface BreadcrumbItem {
    title: string;
    href: string;
}


export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}



export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}



export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    reward: string;
    status: 'pending' | 'completed';
    due_date: string;
    assigned_to: string;
    assignee?: {
        name: string;
        avatar: string | null;
    };
}

export interface ChildTaskListProps {
    child: Child;
    tasks: Task[];
    user: User;
    role: "parent" | "child";
  }

export interface PaginatedTasks {
    current_page: number;
    data: Task[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface TaskActionProps {
    taskId: string;
    disabled?: boolean;
    className?: string;
  }

export interface TaskDetailsModalProps {
    task: Task;
  }
    

export interface PageProps extends Record<string, unknown> {
    role?: "parent" | "child";
    auth: {
        user: User | null;
    };
    children?: Child[];
    child?: Child;
    tasks?: Task[] | PaginatedTasks;
    errors?: Record<string, string>;
}

