import { DatadesignerPage } from './app.po';

describe('datadesigner App', () => {
  let page: DatadesignerPage;

  beforeEach(() => {
    page = new DatadesignerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
