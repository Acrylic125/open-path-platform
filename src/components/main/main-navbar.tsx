"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
// import { Icons } from "../ui/icons";

export const MainNavbar = React.forwardRef<
  React.ElementRef<typeof NavigationMenu>,
  React.ComponentPropsWithoutRef<typeof NavigationMenu>
>(({ className, ...props }, ref) => (
  <NavigationMenu
    className={cn(
      "w-full max-w-full border-b bg-background px-4 py-3 shadow-sm md:px-8",
      className,
    )}
    {...props}
    ref={ref}
  >
    <div className="flex w-full max-w-7xl flex-row items-center justify-between gap-4">
      <div className="flex max-w-md items-center justify-start md:flex-1">
        {/* Show hamburger menu on mobile */}
        <Sheet>
          {/* https://github.com/shadcn-ui/ui/issues/874 */}
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <Icons.hamburger className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-4">
                {/* <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink>
                      <Icons.logo className="h-10 w-10" />
                    </NavigationMenuLink>
                  </Link> */}
                Open Path Platform
              </SheetTitle>
              <SheetDescription>
                <NavigationMenuList className="flex flex-col items-start space-x-0">
                  <NavigationMenuItem className="w-full">
                    <Link href="/" legacyBehavior passHref className="w-full">
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "w-full justify-start",
                        )}
                      >
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="w-full">
                    <Link
                      href="/paths"
                      legacyBehavior
                      passHref
                      className="w-full"
                    >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "w-full justify-start",
                        )}
                      >
                        Explore Paths
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {/* Show content if viewport > md */}
        <NavigationMenuList className="hidden items-center justify-start gap-2 md:flex">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <Icons.logo className="h-10 w-10" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/paths" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Explore Paths
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuList>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Input
          className="w-full md:max-w-lg"
          placeholder="Where do you want to go?"
          type="search"
        />
      </div>
      <div className="flex max-w-md items-center justify-end md:flex-1">
        <NavigationMenuList className="flex-1 items-center justify-end gap-2">
          <NavigationMenuItem className="hidden md:flex">
            <Link href="/docs" legacyBehavior>
              <Button>New Path</Button>
            </Link>
          </NavigationMenuItem>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </NavigationMenuList>
      </div>
    </div>
  </NavigationMenu>
));
MainNavbar.displayName = "MainNavbar";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
