import { AutoSizer } from "react-virtualized";
import CommentList from "./comment-card-list";
import { type CommentCardPropsCard } from "./comment-card";

const CommentListAutoSizer = ({
  comments,
}: {
  comments: CommentCardPropsCard[];
}) => (
  <AutoSizer>
    {({ width, height }) => (
      <CommentList height={height} width={width} comments={comments} />
    )}
  </AutoSizer>
);
export default CommentListAutoSizer;
