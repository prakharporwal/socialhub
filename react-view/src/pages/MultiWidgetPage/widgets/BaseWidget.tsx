import { Card } from "@chakra-ui/react";
import React from "react";

type BaseState = {
    widgetType: string;
    viewType: string;
    layoutParams: string;
}

export abstract class BaseWidget<T extends BaseState> extends React.Component<any, T> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return <Card>{this.renderWidget(this.props.data)}</Card>;
  }

  public renderWidget(data: any): React.ReactNode | null {
    console.debug("BaseWidget: Not implemented", data.widgetType);
    return null;
  }
}
