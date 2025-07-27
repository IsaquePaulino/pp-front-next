'use client'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Home, Plus, User, CornerDownLeft } from 'lucide-react'
import Cookies from 'js-cookie'
import Image from 'next/image'
const items = [
    {
        title: "Feed",
        url: "/sistema",
        icon: Home,
        onclick: () => { }
    },
    {
        title: "Postar",
        url: "/sistema/postar",
        icon: Plus,
        onclick: () => { }
    },
    {
        title: "Meu Perfil",
        url: "/sistema/meu-perfil",
        icon: User,
        onclick: () => { }
    },
    {
        title: "Sair",
        url: "/",
        icon: CornerDownLeft,
        onclick: () => Cookies.remove("token")
    }
]


export function AppSidebar() {
    return (
        <Sidebar collapsible='icon'>
            <div className="flex flex-col items-center justify-center bg-black">
                <Image
                    src="https://www.ctjunior.com.br/images/svg/logo_ct.svg"
                    width={100}
                    height={100}
                    alt="logo ct"
                />
            </div>
            <SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu >
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild onClick={item.onclick}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarHeader>

            <SidebarContent />
        </Sidebar>
    )
}