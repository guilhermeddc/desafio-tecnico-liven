import React from 'react';

import {fireEvent, render} from '@testing-library/react';
import {IProduct} from 'shared/services/api/productService';
import {product01, product02} from 'tests/mock';

import {CartContext, CartProvider} from '.';

describe('CartProvider', () => {
  it('cartQuantity is zero by default', () => {
    const {getByText} = render(
      <CartProvider>
        <CartContext.Consumer>
          {({cartQuantity}) => <>{cartQuantity}</>}
        </CartContext.Consumer>
      </CartProvider>,
    );

    expect(getByText('0')).toBeTruthy();
  });

  it('cartTotalPrice is zero by default', () => {
    const {getByText} = render(
      <CartProvider>
        <CartContext.Consumer>
          {({cartTotalPrice}) => <>{cartTotalPrice}</>}
        </CartContext.Consumer>
      </CartProvider>,
    );

    expect(getByText('0')).toBeTruthy();
  });

  it('cartTotalPrice and cartQuantity is not zero with product', () => {
    const product1: IProduct = product01;
    const product2: IProduct = product02;

    const {getByText} = render(
      <CartProvider>
        <CartContext.Consumer>
          {({cartTotalPrice, cartQuantity, addNewProduct}) => (
            <>
              <p>{cartTotalPrice}</p>
              <p>{cartQuantity}</p>

              <button onClick={() => addNewProduct(product1)}>Add1</button>
              <button onClick={() => addNewProduct(product2)}>Add2</button>
            </>
          )}
        </CartContext.Consumer>
      </CartProvider>,
    );

    fireEvent.click(getByText('Add1'));
    expect(getByText('10')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();

    fireEvent.click(getByText('Add2'));
    expect(getByText('30')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
  });

  it('addNewProduct, addProduct, deleteProduct and removeProduct in products', () => {
    const product1: IProduct = product01;
    const product2: IProduct = product02;

    const {getByText} = render(
      <CartProvider>
        <CartContext.Consumer>
          {({
            addNewProduct,
            addProduct,
            removeProduct,
            deleteProduct,
            products,
          }) => (
            <>
              <p>{products[0]?.product?.title}</p>
              <p>{products[0]?.quantity}</p>
              <p>{products[0]?.value}</p>

              <p>{products[1]?.product?.title}</p>
              <p>{products[1]?.quantity}</p>
              <p>{products[1]?.value}</p>

              <button onClick={() => addNewProduct(product1)}>Add1</button>
              <button onClick={() => addNewProduct(product2)}>Add2</button>
              <button onClick={() => deleteProduct(product1.id)}>delete</button>

              <button onClick={() => removeProduct(product1.id)}>-</button>
              <button onClick={() => addProduct(product1.id)}>+</button>
            </>
          )}
        </CartContext.Consumer>
      </CartProvider>,
    );

    fireEvent.click(getByText('Add1'));
    expect(getByText('Product Test 1')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();

    fireEvent.click(getByText('+'));
    expect(getByText('Product Test 1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();

    fireEvent.click(getByText('-'));
    expect(getByText('Product Test 1')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();

    fireEvent.click(getByText('Add2'));
    fireEvent.click(getByText('delete'));
    expect(getByText('Product Test 2')).toBeTruthy();
  });
});
