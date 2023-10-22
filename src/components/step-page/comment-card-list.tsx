import { useCallback, type RefCallback, useMemo } from "react";
import { List, CellMeasurerCache, CellMeasurer } from "react-virtualized";
import { type MeasuredCellParent } from "react-virtualized/dist/es/CellMeasurer";
import CommentCard, { type CommentCardPropsCard } from "./comment-card";

export default function CommentList({
  width,
  height,
  comments,
}: {
  width: number;
  height: number;
  comments: CommentCardPropsCard[];
}) {
  const commentListCache = useMemo(() => {
    return new CellMeasurerCache({
      fixedWidth: true,
    });
  }, []);
  const renderRow = useCallback(
    ({
      index,
      key,
      parent,
      style,
    }: {
      index: number;
      key: string;
      parent: MeasuredCellParent;
      style: React.CSSProperties;
    }) => {
      return (
        <CellMeasurer
          key={key}
          cache={commentListCache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          {({ registerChild }) => {
            const comment = comments[index];
            if (!comment) return null;
            return (
              <CommentCard
                key={comment.id}
                id={comment.id}
                style={style}
                className="py-2"
                ref={registerChild as RefCallback<HTMLDivElement>}
                profilePictureUrl={comment.profilePictureUrl}
                username={comment.username}
                message={comment.message}
              />
            );
          }}
        </CellMeasurer>
      );
    },
    [comments, commentListCache],
  );

  return (
    <List
      width={width}
      height={height}
      rowHeight={commentListCache.rowHeight}
      rowRenderer={renderRow}
      rowCount={comments.length}
      overscanRowCount={3}
    />
  );
}
