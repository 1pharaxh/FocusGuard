import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            IGN videos on gaming
          </p>
          <p className="text-sm text-muted-foreground">
            &middot; Added 3d ago{" "}
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Political News</p>
          <p className="text-sm text-muted-foreground">
            &middot; Added 5d ago{" "}
          </p>
        </div>
        <div className="ml-auto font-medium">+2</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            The Verge - Tech News
          </p>
          <p className="text-sm text-muted-foreground">
            &middot; Added 6d ago{" "}
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">United States news</p>
          <p className="text-sm text-muted-foreground">
            {" "}
            &middot; Added 6d ago{" "}
          </p>
        </div>
        <div className="ml-auto font-medium">-2</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Apex Legends Game</p>
          <p className="text-sm text-muted-foreground">
            {" "}
            &middot; Added 1w ago{" "}
          </p>
        </div>
        <div className="ml-auto font-medium">-4</div>
      </div>
    </div>
  );
}
