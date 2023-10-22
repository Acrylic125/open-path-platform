import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { forwardRef, type CSSProperties } from "react";

export type CommentCardPropsCard = {
  id: string | number;
  profilePictureUrl: string;
  username: string;
  message: string;
};

const CommentCard = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    style?: CSSProperties;
  } & CommentCardPropsCard
>(({ className, style, profilePictureUrl, username, message }, ref) => {
  return (
    <div style={style} className={className} ref={ref}>
      <Card tabIndex={0} className="flex flex-row gap-4">
        <CardHeader className="flex h-full w-12">
          <Avatar>
            <AvatarImage
              className="w-12 lg:w-16"
              src={profilePictureUrl}
              alt={username}
            />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-1 p-4 lg:p-4">
          <CardTitle className="text-base lg:text-lg">{username}</CardTitle>
          <CardDescription className="lgtext-base text-sm">
            {message}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
});
CommentCard.displayName = "CommentCard";

export default CommentCard;
