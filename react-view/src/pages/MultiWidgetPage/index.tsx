import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingShell from "../../components/ui/LoadingShell";
import ScrollbleList from "./ScrollableList";
import {
  BaseWidgetDataModel,
  MultiWidgetAPIResponse,
} from "../../apimodels/MultiWidgetAPIResponse";
import "./style.css";

export default function MultiWidgetPage(): JSX.Element {
  const [data, setData] = useState<MultiWidgetAPIResponse<any> | null>(null);
  const location = useLocation();
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/page/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_uri: location.pathname + location.search,
        page_num: 1,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log("RESPONSE", body);
        setData(body);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return <LoadingShell />;
  }

  return <MakeSlotList data={data} />;
}

interface IMakeSlotList {
  data: MultiWidgetAPIResponse<BaseWidgetDataModel>;
}

function MakeSlotList({ data }: IMakeSlotList) {
  console.log({ data });

  let Component: React.FunctionComponent<any>;
  return (
    <div>
      {data.response.slots.map((datum, index) => {
        let widgetData;
        switch (datum.type) {
          case "PRODUCT_INFO":
            widgetData = datum.data as ProductInfoWidgetDataModel;
            Component = ProductInfo;
            break; 
          case "PRODUCT_INFO":
              widgetData = datum.data as ProductInfoWidgetDataModel;
              Component = ProductInfo;
              break; 
          default:
            Component = FallbackComponent
        }
        return <Component key={index} widgetData={widgetData} />;
      })}
    </div>
  );
}

interface IProductInfo {
  widgetData: ProductInfoWidgetDataModel;
}
interface ProductInfoWidgetDataModel extends BaseWidgetDataModel{
  product_id: string;
  listing_id: string;
  product_name: string;
  brand: string;
}

const ProductInfo: React.FunctionComponent<IProductInfo> = (props) => {
  const { widgetData } = props;
  const { product_name, product_id, listing_id } = widgetData;

  return <div className="widget-wrapper">{product_name}</div>;
};

const FallbackComponent: React.FunctionComponent<any> = (props) => {
  return <div>No Widget Configured</div>;
};

