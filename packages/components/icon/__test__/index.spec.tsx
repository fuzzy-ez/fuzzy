import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../src/icons.vue'

describe('Icon', () => {
  it('should render', () => {
    const wrapper = mount(() => <Icon size={25} color="rgb(255, 71, 87)"/>)
    expect(wrapper.element.getAttribute('style')).toContain('color: rgb(255, 71, 87)')
    expect(wrapper.element.getAttribute('style')).toContain('font-size: 25px')
  })
})
