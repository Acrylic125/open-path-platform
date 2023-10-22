import { MainNavbar } from "@/components/main/main-navbar";
import { MainHead } from "@/components/main/main-head";
import {
  List,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import { type MeasuredCellParent } from "react-virtualized/dist/es/CellMeasurer";
import { type RefCallback } from "react";

const list = new Array(100).fill("").map((val, idx) => {
  return `Name-${idx}`.repeat(1 + Math.random() * 1000);
});

const cache = new CellMeasurerCache({
  fixedWidth: true,
});

function renderRow({
  index,
  key,
  parent,
  style,
}: {
  index: number;
  key: string;
  parent: MeasuredCellParent;
  style: React.CSSProperties;
}) {
  return (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      {({ registerChild }) => (
        <div
          key={key}
          style={style}
          ref={registerChild as RefCallback<HTMLDivElement>}
          className="w-full p-2"
        >
          <div className="w-full border p-4">{list[index]}</div>
        </div>
      )}
    </CellMeasurer>
  );
}

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MainHead />

      {/* https://stackoverflow.com/questions/46655386/when-css-position-sticky-stops-sticking */}
      <main className="relative h-screen overflow-auto">
        <MainNavbar className="sticky top-0" />
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.rowHeight}
              rowRenderer={renderRow}
              rowCount={list.length}
              overscanRowCount={3}
            />
          )}
        </AutoSizer>
      </main>
    </>
  );
}
