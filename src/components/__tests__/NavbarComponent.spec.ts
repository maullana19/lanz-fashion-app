import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavbarLayouts from '@/components/layouts/NavbarLayouts.vue'

describe('NavbarLayouts', () => {
  it('renders brand name correctly', () => {
    const wrapper = mount(NavbarLayouts)
    expect(wrapper.text()).toContain('LanzFashion')
  })

  it('shows search input on large screens', () => {
    const wrapper = mount(NavbarLayouts)
    const input = wrapper.find('input#search')
    expect(input.exists()).toBe(true)
  })

  it('Button Login Mengarah ke Login Page', () => {
    const wrapper = mount(NavbarLayouts)
    const button = wrapper.find('[data-testid="login-button"]')
    expect(button.exists()).toBe(true)
    expect(button.attributes('href')).toBe('/login')
  })
})
