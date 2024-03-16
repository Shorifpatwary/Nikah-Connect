import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function Component() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      {/* mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link href="#" className="flex items-center text-lg font-semibold">
              About
            </Link>
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                Features
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="-mx-6 grid gap-6 bg-gray-100 p-6 dark:bg-gray-800">
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Analytics
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Upgrade your reporting with advanced analytics.
                    </div>
                  </Link>
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Developer Tools
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Extend your application with our developer tools.
                    </div>
                  </Link>
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Security & Compliance
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Keep your data secure with our security features.
                    </div>
                  </Link>
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Scalability
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Scale your application with our infrastructure.
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Link href="#" className="flex items-center text-lg font-semibold">
              Pricing
            </Link>
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                Resources
                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="-mx-6 grid gap-6 bg-gray-100 p-6 dark:bg-gray-800">
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Blog Posts
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Read our latest blog posts.
                    </div>
                  </Link>
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Case Studies
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Read our customer case studies.
                    </div>
                  </Link>
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Documentation
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Learn how to use our product.
                    </div>
                  </Link>
                  <Link href="#" className="grid gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Help Center
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Get help with our product.
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Link href="#" className="flex items-center text-lg font-semibold">
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* others code */}
      <div className="w-[150px]">
        <Link className="mr-6 hidden lg:flex" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </div>
      {/* desktop menu */}
      <div className="flex w-full justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#"
              >
                About
              </Link>
            </NavigationMenuLink>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-800">
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Analytics
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Upgrade your reporting with advanced analytics.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Developer Tools
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Extend your application with our developer tools.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Security & Compliance
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Keep your data secure with our security features.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Scalability
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Scale your application with our infrastructure.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#"
              >
                Pricing
              </Link>
            </NavigationMenuLink>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-800">
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Blog Posts
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Case Studies
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Read our customer case studies.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Documentation
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Learn how to use our product.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Help Center
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Get help with our product.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="#"
              >
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* third block */}
      <div className="ml-auto w-[150px]">
        <Button>Get Started</Button>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="rounded-full" size="icon" variant="outline">
            <BellIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Card className="shadow-none border-0">
            <CardHeader className="border-b">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">
                    Your call has been confirmed.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    5 min ago
                  </p>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">You have a new message!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1 min ago
                  </p>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">
                    Your subscription is expiring soon!
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </header>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
