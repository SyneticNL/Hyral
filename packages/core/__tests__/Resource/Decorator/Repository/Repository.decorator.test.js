import Repository from '../../../../src/Resource/Repository';

describe('The repository decorator', () => {
  const mockDecorator = jest.fn((repository) => repository);
  Repository.decorators.push(mockDecorator);

  it('should have called the decorator', () => {
    const productRepository = Repository.create({}, 'product');

    expect(mockDecorator).toHaveBeenCalledWith(productRepository);
  });
});
