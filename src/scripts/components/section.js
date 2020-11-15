export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(initialCards) {
    initialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }
}
