import React from 'react'
import Odometer from '..'
import Digit from '..'
import { mount, shallow } from 'enzyme'

/*
Static props
Events generated by the user
A child component calling a passed-in function
*/

describe('Odometer', () => {
  describe('When only providing required number prop of "10"', () => {
    it('should pass to Digit component default of digits = 4', () => {
      const component = mount(<Odometer number={10} />)
      const actual = component.children().length
      const expected = 4
      expect(actual).toBe(expected)
    })

    it('should pass to Digit component default of speed = 100', () => {
      const component = mount(<Odometer number={10} />)
      const actual = component.children().at(0).props().speed
      const expected = 100
      expect(actual).toBe(expected)
    })

    it('should pass to Digit component animate = true for the last two digits', () => {
      const component = mount(<Odometer number={10} />)
      const actual = [
        component.children().at(0).props().animate,
        component.children().at(1).props().animate,
        component.children().at(2).props().animate,
        component.children().at(3).props().animate,
      ]
      const expected = [false, false, true, true]
      expect(actual).toEqual(expected)
    })
  })

  describe('When providing a digits prop of x', () => {
    it('should render x digits', () => {
      let component = mount(<Odometer number={10} digits={2} />)
      let actual = component.children().length
      let expected = 2
      expect(actual).toBe(expected)

      component = mount(<Odometer number={10} digits={6} />)
      actual = component.children().length
      expected = 6
      expect(actual).toBe(expected)
    })
  })

  describe('When providing a speed prop of x', () => {
    it('should pass it to the digit children', () => {
      const component = mount(<Odometer number={10} speed={500} />)
      const actual = [
        component.children().at(0).props().speed,
        component.children().at(1).props().speed,
      ]
      const expected = [500,500]
      expect(actual).toEqual(expected)
    })
  })

  describe('When providing a size prop of x', () => {
    it('should set font-size and line-height of odometer', () => {
      const component = mount(<Odometer number={10} size={18} />)
      const actual = component.find('div').at(0).props().style
      const expected = { fontSize: '18px', lineHeight: '18px' }
      expect(actual).toEqual(expected)
    })
  })

  describe('When providing a number large than the digits', () => {
    it('should truncate the most significant digits', () => {
      const component = mount(<Odometer number={10000} />)
      const actual = component.children().length
      const expected = 4
      expect(actual).toBe(expected)
    })
  })
})
