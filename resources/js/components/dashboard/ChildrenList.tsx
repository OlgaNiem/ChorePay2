import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Child {
  id: number;
  name: string;
  avatar: string | null;
}

export default function ChildrenList({ children }: { children: Child[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Children</CardTitle>
        <Link href={route('add-child')}>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
            Add Child
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
              <Plus className="h-4 w-4" />
            </div>
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        {children.length > 0 ? (
          children.map((child) => (
            <div key={child.id} className="flex items-center justify-between border-b py-3 px-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={child.avatar || '/placeholder.svg'} alt={child.name} />
                  <AvatarFallback>{child.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-lg font-medium">{child.name}</span>
              </div>
              <Link href={route('child-profile', { child: child.id })}>
                <Button variant="outline" size="sm" className="text-sm bg-blue-100 hover:bg-blue-200 border-blue-200 text-blue-700">
                  View Profile
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No children added yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
