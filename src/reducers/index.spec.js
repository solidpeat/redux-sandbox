import { getTotal, getCartProducts } from './index'

describe('selectors', () => {
  describe('getTotal', () => {
    it('should return price total', () => {
      const state = {
        cart: {
          addedIds: [ 1, 2, 3 ],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 2
            },
            2: {
              id: 1,
              price: 5
            },
            3: {
              id: 1,
              price: 10
            }
          }
        }
      }
      expect(getTotal(state)).toBe('28')
    })
  })

  describe('getCartProducts', () => {
    it('should return products with quantity', () => {
      const state = {
        cart: {
          addedIds: [ 1, 2, 3 ],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 2
            },
            2: {
              id: 1,
              price: 5
            },
            3: {
              id: 1,
              price: 10
            }
          }
        }
      }

      expect(getCartProducts(state)).toEqual([
        {
          id: 1,
          price: 2,
          quantity: 4
        },
        {
          id: 1,
          price: 5,
          quantity: 2
        },
        {
          id: 1,
          price: 10,
          quantity: 1
        }
      ])
    })
  })
})
