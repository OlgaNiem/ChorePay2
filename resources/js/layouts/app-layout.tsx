import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <>
        <AppLayoutTemplate {...props}>
            {children}
        </AppLayoutTemplate>
        <Toaster richColors position="top-center" />
    </>
);
