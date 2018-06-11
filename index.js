import React, { Component } from 'react';
import './index.css';

export default class BrandPage extends Component {
  constructor(props) {
    super(props)

    this.updateBrandFontSize = this.updateBrandFontSize.bind(this)
  }

  getFontSize(node) {
    return +window.getComputedStyle(node, null)
                  .getPropertyValue('font-size')
                  .slice(0, -2)
  }

  updateBrandFontSize() {
    const stringLength = this.props.brand.trim().length

    if (stringLength === 0) return

    const step = {
      1: 10,
      2: 8,
      3: 6,
      4: 4,
      5: 2,
    }[stringLength] || 1

    while (
      this.brandDiv.parentNode.clientWidth - this.brandDiv.scrollWidth < 20
    ) {
      const currentSize = this.brandDiv.style.fontSize
        ? +this.brandDiv.style.fontSize.slice(0, -2)
        : this.getFontSize(this.brandDiv)

      this.brandDiv.style.fontSize = currentSize - step + 'px'
    }

    while (
      this.brandDiv.parentNode.clientWidth - this.brandDiv.scrollWidth > 20
    ) {
      const currentSize = this.brandDiv.style.fontSize
        ? +this.brandDiv.style.fontSize.slice(0, -2)
        : this.getFontSize(this.brandDiv)

      this.brandDiv.style.fontSize = currentSize + step + 'px'
    }
  }

  componentDidUpdate() {
    this.updateBrandFontSize();
  }

  componentDidMount() {
    this.updateBrandFontSize();
    window.addEventListener("resize", this.updateBrandFontSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateBrandFontSize);
  }

  render() {
    const {brand, description, theme} = this.props

    return (
      <div className={
        `wrapper wrapper-theme-${theme}`
      }>
        <link href="https://fonts.googleapis.com/css?family=Arimo|Lato:300" rel="stylesheet" />
        <div
          className='brand-wrapper'
        >
          <div
            className={
              `brand brand-theme-${theme}`
            }
            ref={brandDiv => this.brandDiv = brandDiv}
          >
            {brand}
          </div>
        </div>
        <div className={
          `description description-theme-${theme}`
        }>
          {description}
        </div>
      </div>
    )
  }
}
