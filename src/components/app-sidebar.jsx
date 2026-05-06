import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
    const { open } = useSidebar();
    return (
        <Sidebar
            variant="sidebar"
            className="border-r border-r-neutral-400 shadow-xs shadow-neutral-500"
        >
            <SidebarHeader className="pr-8">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    Select Workspace
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Acme Inc</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>

                <SidebarTrigger
                    className={cn(
                        'absolute top-2 hover:bg-neutral-200',
                        open ? 'right-0' : '-right-12',
                    )}
                ></SidebarTrigger>
            </SidebarHeader>
        </Sidebar>
    );
}
