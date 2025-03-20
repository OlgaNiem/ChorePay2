import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: number;
  name: string;
  avatar?: string;
}

export default function DashboardHeader({ user }: { user: User | null }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
        <span className="text-lg font-semibold">{user?.name || 'Parent'}</span>
      </div>

      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.name} />
        <AvatarFallback>{user?.name?.charAt(0) || 'P'}</AvatarFallback>
      </Avatar>
    </header>
  );
}
