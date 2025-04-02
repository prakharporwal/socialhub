import { BaseWidget, BaseState } from "../../BaseWidget";

type Card = {
  title: string;
  [key: string]: any;
};

interface CardListProps extends BaseState {
  items?: Array<Card>;
}
export default class CardList extends BaseWidget<CardListProps> {
  renderWidget() {
    const { items = [] } = this.props.data || {};

    return (
      <div className="card-list">
        {items.length > 0 ? (
          items.map((item: Card, index: number) => (
            <div key={index} className="card-item">
              {item.title}
            </div>
          ))
        ) : (
          <div>No items to display</div>
        )}
      </div>
    );
  }
}
