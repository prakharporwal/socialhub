import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import HomeCarousel from "../widgets/common/HomeCarousel";
import CardList from "../widgets/common/CardList";
import useCellMeasurer from "../hooks/useCellMeasurer";

// const rowCount = 5000;
// const listHeight = 400;
// const rowHeight = 100;
// const rowWidth = window.screen.width;

interface WidgetData {
  widgetType: string;
  viewType: any;
  widgetList: any[];
  widgetId: number;
}

export default function ScrollbleList({ data }: { data: WidgetData }) {
  const cellMeasurerProps = useCellMeasurer({ items: data.widgetList });

  if (!data) return null;

  return (
    <div>
      {/* <List
        height={500}
        width={300}
        {...cellMeasurerProps}
      >
        {({ index, style }) => {
          const item = data.widgetList[index];
          return (
            <WidgetCard index={index} style={style} key={item.id} item={item} />
          );
        }}
      </List> */}
    </div>
  );
}

function WidgetCard({
  index,
  style,
  key,
  item,
}: {
  index: number;
  style: any;
  key: string;
  item: any;
}) {
  if (item === undefined) return null;

  let Widget = null;
  switch (item.widgetType) {
    case "HOME_CAROUSEL":
      Widget = HomeCarousel;
      break;
    case "CARD_LIST":
      Widget = CardList;
      break;
  }

  if (Widget === null) return null;

  return <Widget key={key} style={style} />;
}
