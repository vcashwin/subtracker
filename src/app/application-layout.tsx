import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import { Heading } from "@/components/heading";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/sidebar";
import { StackedLayout } from "@/components/stacked-layout";
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import ToggleCurrency from "./toggle-currency";

const navItems = [
  { label: "Home", url: "/" },
  { label: "Events", url: "/events" },
  { label: "Orders", url: "/orders" },
  { label: "Broadcasts", url: "/broadcasts" },
  { label: "Settings", url: "/settings" },
];

function TeamDropdownMenu() {
  return (
    <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
      <DropdownItem href="/teams/1/settings">
        <Cog8ToothIcon />
        <DropdownLabel>Settings</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/teams/1">
        <Avatar slot="icon" src="/tailwind-logo.svg" />
        <DropdownLabel>Tailwind Labs</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="/teams/2">
        <Avatar
          slot="icon"
          initials="WC"
          className="bg-purple-500 text-white"
        />
        <DropdownLabel>Workcation</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/teams/create">
        <PlusIcon />
        <DropdownLabel>New team&hellip;</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <Heading>SubTracker</Heading>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem aria-label="New Subscription">
              <PlusCircleIcon />
            </NavbarItem>
            <ToggleCurrency />
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                <Avatar src="/tailwind-logo.svg" />
                <SidebarLabel>Tailwind Labs</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <TeamDropdownMenu />
            </Dropdown>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navItems.map(({ label, url }) => (
                <SidebarItem key={label} href={url}>
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </StackedLayout>
  );
}
