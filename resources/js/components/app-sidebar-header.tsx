import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePage } from '@inertiajs/react';

interface PageProps extends Record<string, unknown> {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      avatar?: string;
    } | null;
  };
}

export function AppSidebarHeader() {
  const { auth } = usePage<PageProps>().props;

  return (
    <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <span className="text-lg font-semibold">{auth.user?.name || "Parent"}</span>
      </div>

      <Avatar className="h-8 w-8">
        <AvatarImage src={auth.user?.avatar || "/placeholder.svg"} alt={auth.user?.name || 'Parent'} />
        <AvatarFallback>{auth.user?.name?.charAt(0) || "P"}</AvatarFallback>
      </Avatar>
    </header>
  );
}
