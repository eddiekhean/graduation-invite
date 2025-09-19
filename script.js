class LiquidGlassCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'title',
      'subtitle',
      'blur',
      'radius',
      'padding',
      'bg',
      'border',
      'inner',
      'saturate',
      'elev',
      'hoverlift',
    ]
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  attributeChangedCallback() {
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const title = this.getAttribute('title') ?? ''
    const subtitle = this.getAttribute('subtitle') ?? ''
    const blur = this.getAttribute('blur') ?? '14'
    const radius = this.getAttribute('radius') ?? '28'
    const padding = this.getAttribute('padding') ?? '30'
    const bg = this.getAttribute('bg') ?? 'rgba(255,255,255,.08)'
    const border = this.getAttribute('border') ?? 'rgba(255,255,255,.35)'
    const inner = this.getAttribute('inner') ?? 'rgba(255,255,255,.25)'
    const saturate = this.getAttribute('saturate') ?? '120%'
    const hover = this.hasAttribute('hoverlift')

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block; 
          max-width: 100%; 
        }

        .card {
  position: relative;
  width: 100%;
  height: auto;
  padding: clamp(16px, 4vw, ${padding}px);
  border-radius: clamp(12px, 3vw, ${radius}px);

  /* Làm mỏng & bóng hơn */
  background: ${bg};
  backdrop-filter: blur(clamp(6px, 1.5vw, ${blur}px)) saturate(${saturate});
  -webkit-backdrop-filter: blur(clamp(6px, 1.5vw, ${blur}px)) saturate(${saturate});

  /* Giảm shadow tối, thêm light glow */
  box-shadow: 
    0 2px 6px rgba(0,0,0,0.08),
    0 1px 3px rgba(0,0,0,0.05),
    inset 0 1px 2px rgba(255,255,255,0.25); /* highlight viền trong */

  border: 1px solid ${border};
  outline: 1px solid rgba(255,255,255,.08);
  transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
  box-sizing: border-box;
}

.card::before {
  content: "";
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none;

  /* biên mỏng sáng hơn */
  border: 1px solid ${inner};
  mask: radial-gradient(140% 140% at -20% -20%, #000 35%, transparent 65%);
  opacity: .35;
}

.card::after {
  content: "";
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none;

  /* highlight mềm hơn, tạo cảm giác bóng */
  background:
    radial-gradient(100px 100px at 15% 8%, rgba(255,255,255,.4), transparent 70%),
    radial-gradient(160px 120px at 85% 90%, rgba(255,255,255,.12), transparent 70%);
  mix-blend-mode: screen;
  opacity: .9;
}


        ${
          hover
            ? `.card:hover{ transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.14); background: rgba(255,255,255,.10); }`
            : ``
        }

        .title { 
          margin: 0 0 .35em; 
          font-size: clamp(20px, 4vw, 32px); 
          line-height: 1.2; 
          text-shadow: 0 1px 2px rgba(0,0,0,.25); 
        }

        .sub { 
          margin: 0 0 1rem; 
          opacity: .92; 
          font-size: clamp(14px, 3vw, 18px); 
        }

        ::slotted(.btn) {
          appearance: none; border: 0; cursor: pointer;
          padding: .7rem 1rem; border-radius: 14px;
          font-weight: 600; color: #0b0b0b;
          background: rgba(255,255,255,.92);
          box-shadow: 0 4px 14px rgba(0,0,0,.18);
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        ::slotted(.btn:hover) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,.22) }
        ::slotted(.btn.ghost) {
          background: rgba(255,255,255,.14);
          color: #fff; border: 1px solid rgba(255,255,255,.35);
          backdrop-filter: blur(8px);
        }

        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .card { background: rgba(20,20,20,.6) }
          ::slotted(.btn.ghost) { background: rgba(255,255,255,.18) }
        }
      </style>
      <div class="card" part="card">
        ${
          title || subtitle
            ? `<header>${title ? `<h2 class="title">${title}</h2>` : ``}${subtitle ? `<p class="sub">${subtitle}</p>` : ``}</header>`
            : ``
        }
        <slot></slot>
      </div>
    `
  }
}

customElements.define('liquid-glass-card', LiquidGlassCard)
