import { ImageByDefaultPipe } from './image-by-default.pipe';

describe('ImageByDefaultPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageByDefaultPipe();
    expect(pipe).toBeTruthy();
  });
});
