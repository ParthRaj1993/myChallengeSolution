import { StarLordPage } from './app.po';

describe('star-lord App', () => {
  let page: StarLordPage;

  beforeEach(() => {
    page = new StarLordPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
