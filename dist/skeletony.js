(function(window) {
    'use strict';
  
    const defaultConfig = {
      fadeTime: 0.3,              
      waveTime: 2,                
      lightColor: 'rgba(130, 130, 130, 0.2)',  
      darkColor: 'rgba(130, 130, 130, 0.3)',   
      selector: 'img.skeleton',   
      borderRadius: '5px',        
      removeDelay: 300            
    };
  
    let config = { ...defaultConfig };
  
    const skeletony = {
  
      init: function(options = {}) {
  
        config = { ...config, ...options };
  
        this._injectStyles();
  
        this.refresh();
  
        return this;
      },
  
      fade: function(seconds) {
        if (typeof seconds !== 'number' || seconds <= 0) {
          console.error('Skeletony: Fade time must be a positive number');
          return this;
        }
  
        config.fadeTime = seconds;
        this._updateStyles();
        return this;
      },
  
      wave: function(seconds) {
        if (typeof seconds !== 'number' || seconds <= 0) {
          console.error('Skeletony: Wave time must be a positive number');
          return this;
        }
  
        config.waveTime = seconds;
        this._updateStyles();
        return this;
      },
  
      colors: function(lightColor, darkColor) {
        if (lightColor) config.lightColor = lightColor;
        if (darkColor) config.darkColor = darkColor;
        this._updateStyles();
        return this;
      },
  
      radius: function(radius) {
        config.borderRadius = radius;
        this._updateStyles();
        return this;
      },
  
      select: function(selector) {
        if (!selector) {
          console.error('Skeletony: Please provide a valid selector');
          return this;
        }
  
        config.selector = selector;
        this.refresh();
        return this;
      },
  
      applyTo: function(elements) {
        if (!elements) {
          console.error('Skeletony: No elements provided');
          return this;
        }
  
        if (elements instanceof Element) {
          this._processElement(elements);
        } else if (elements instanceof NodeList || Array.isArray(elements)) {
          elements.forEach(el => this._processElement(el));
        }
  
        return this;
      },
  
      refresh: function() {
        const imgElements = document.querySelectorAll(config.selector);
        imgElements.forEach(el => this._processElement(el));
        return this;
      },
  
      removeFrom: function(element) {
        if (!element) return this;
  
        const container = element.closest('.img-skeleton-container');
        if (container) {
          const skeleton = container.querySelector('.img-skeleton');
          if (skeleton) {
            element.style.opacity = '1';
            skeleton.style.opacity = '0';
            setTimeout(() => {
              if (skeleton && skeleton.parentNode) {
                skeleton.parentNode.removeChild(skeleton);
              }
            }, config.removeDelay);
          }
        }
  
        return this;
      },
  
      create: function(options = {}) {
        const { width = '100%', height = '100%', aspectRatio } = options;
  
        const container = document.createElement('div');
        container.classList.add('img-skeleton-container');
        container.style.width = width;
        container.style.height = height;
        if (aspectRatio) container.style.aspectRatio = aspectRatio;
  
        const skeleton = document.createElement('div');
        skeleton.classList.add('img-skeleton');
  
        const square = document.createElement('div');
        square.classList.add('img-skeleton-square');
  
        skeleton.appendChild(square);
        container.appendChild(skeleton);
  
        return container;
      },
  
      reset: function() {
        config = { ...defaultConfig };
        this._updateStyles();
        return this;
      },
  
      _injectStyles: function() {
  
        const existingStyle = document.getElementById('skeletony-styles');
        if (existingStyle) {
          existingStyle.parentNode.removeChild(existingStyle);
        }
  
        const style = document.createElement('style');
        style.id = 'skeletony-styles';
  
        style.textContent = `
          .img-skeleton-container {
            position: relative;
            overflow: hidden;
          }
  
          .img-skeleton {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #fff;
            border-radius: ${config.borderRadius};
            overflow: hidden;
            z-index: 1;
            transition: opacity ${config.fadeTime}s ease-out;
          }
  
          .img-skeleton-square {
            height: 100%;
            width: 100%;
            border-radius: ${config.borderRadius};
            background: ${config.lightColor};
            background: linear-gradient(to right, ${config.lightColor} 8%, ${config.darkColor} 18%, ${config.lightColor} 33%);
            background-size: 800px 100px;
            animation: skeletony-wave-squares ${config.waveTime}s infinite ease-out;
          }
  
          @keyframes skeletony-wave-squares {
            0% {
              background-position: -468px 0;
            }
            100% {
              background-position: 468px 0;
            }
          }
        `;
  
        document.head.appendChild(style);
      },
  
      _updateStyles: function() {
        this._injectStyles();
        return this;
      },
  
      _processElement: function(element) {
  
        element.classList.remove('skeleton');
  
        const parent = element.parentElement;
  
        if (!parent.classList.contains('img-skeleton-container')) {
  
          const style = window.getComputedStyle(element);
          const display = style.getPropertyValue('display');
  
          const container = document.createElement('div');
          container.classList.add('img-skeleton-container');
          container.style.display = display;
  
          if (element.width > 0) {
            container.style.width = element.width + 'px';
          }
          if (element.height > 0) {
            container.style.height = element.height + 'px';
          }
  
          if (!container.style.width && element.naturalWidth) {
            container.style.width = element.naturalWidth + 'px';
          }
          if (!container.style.height && element.naturalHeight) {
            container.style.height = element.naturalHeight + 'px';
          }
  
          if (parseFloat(container.style.width) && parseFloat(container.style.height)) {
            container.style.aspectRatio = parseFloat(container.style.width) / parseFloat(container.style.height);
          }
  
          element.parentNode.insertBefore(container, element);
  
          element.style.opacity = '0';
          element.style.transition = `opacity ${config.fadeTime}s ease-in-out`;
  
          container.appendChild(element);
  
          const skeleton = document.createElement('div');
          skeleton.classList.add('img-skeleton');
  
          const square = document.createElement('div');
          square.classList.add('img-skeleton-square');
          skeleton.appendChild(square);
          container.appendChild(skeleton);
  
          element.addEventListener('load', function() {
            element.style.opacity = '1';
            skeleton.style.opacity = '0';
  
            setTimeout(() => {
              if (skeleton && skeleton.parentNode) {
                skeleton.parentNode.removeChild(skeleton);
              }
            }, config.removeDelay);
          });
  
          if (element.complete) {
            element.style.opacity = '1';
            skeleton.style.display = 'none';
          }
        }
      }
    };
  
    window.skeletony = skeletony;
  
  })(window);