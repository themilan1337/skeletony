/**
 * Skeletony.js
 * A lightweight JavaScript library for customizable skeleton loading animations
 * Version 1.0.0
 */

(function(window) {
    'use strict';
  
    // Default configuration
    const defaultConfig = {
      fadeTime: 0.3,              // Default fade transition time in seconds
      waveTime: 2,                // Default wave animation time in seconds
      lightColor: 'rgba(130, 130, 130, 0.2)',  // Default light color
      darkColor: 'rgba(130, 130, 130, 0.3)',   // Default dark color
      selector: 'img.skeleton',   // Default selector for skeleton elements
      borderRadius: '5px',        // Default border radius
      removeDelay: 300            // Time in ms to remove skeleton after loading
    };
  
    // Clone the default config for current settings
    let config = { ...defaultConfig };
  
    // Main library object
    const skeletony = {
      /**
       * Initialize the library with custom options
       * @param {Object} options - Custom options to override defaults
       */
      init: function(options = {}) {
        // Merge options with defaults
        config = { ...config, ...options };
        
        // Add CSS to document
        this._injectStyles();
        
        // Process all matching elements
        this.refresh();
        
        return this;
      },
  
      /**
       * Set custom fade transition time
       * @param {Number} seconds - Transition time in seconds
       */
      fade: function(seconds) {
        if (typeof seconds !== 'number' || seconds <= 0) {
          console.error('Skeletony: Fade time must be a positive number');
          return this;
        }
        
        config.fadeTime = seconds;
        this._updateStyles();
        return this;
      },
  
      /**
       * Set custom wave animation time
       * @param {Number} seconds - Animation time in seconds
       */
      wave: function(seconds) {
        if (typeof seconds !== 'number' || seconds <= 0) {
          console.error('Skeletony: Wave time must be a positive number');
          return this;
        }
        
        config.waveTime = seconds;
        this._updateStyles();
        return this;
      },
  
      /**
       * Set custom colors for the wave gradient
       * @param {String} lightColor - Light color in the gradient
       * @param {String} darkColor - Dark color in the gradient
       */
      colors: function(lightColor, darkColor) {
        if (lightColor) config.lightColor = lightColor;
        if (darkColor) config.darkColor = darkColor;
        this._updateStyles();
        return this;
      },
  
      /**
       * Set custom border radius
       * @param {String} radius - Border radius value (e.g., '5px', '50%')
       */
      radius: function(radius) {
        config.borderRadius = radius;
        this._updateStyles();
        return this;
      },
  
      /**
       * Apply skeleton effect to elements matching a custom selector
       * @param {String} selector - CSS selector to target elements
       */
      select: function(selector) {
        if (!selector) {
          console.error('Skeletony: Please provide a valid selector');
          return this;
        }
        
        config.selector = selector;
        this.refresh();
        return this;
      },
  
      /**
       * Apply skeleton effect to specific DOM elements
       * @param {NodeList|Array|Element} elements - DOM elements to apply effect to
       */
      applyTo: function(elements) {
        if (!elements) {
          console.error('Skeletony: No elements provided');
          return this;
        }
        
        // Handle different input types
        if (elements instanceof Element) {
          this._processElement(elements);
        } else if (elements instanceof NodeList || Array.isArray(elements)) {
          elements.forEach(el => this._processElement(el));
        }
        
        return this;
      },
  
      /**
       * Refresh and apply skeletons to all matching elements
       */
      refresh: function() {
        const imgElements = document.querySelectorAll(config.selector);
        imgElements.forEach(el => this._processElement(el));
        return this;
      },
  
      /**
       * Manually remove skeleton from an element
       * @param {Element} element - The element to remove skeleton from
       */
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
  
      /**
       * Create and return a standalone skeleton element
       * @param {Object} options - Options for the skeleton
       * @returns {Element} - The created skeleton container element
       */
      create: function(options = {}) {
        const { width = '100%', height = '100%', aspectRatio } = options;
        
        // Create container
        const container = document.createElement('div');
        container.classList.add('img-skeleton-container');
        container.style.width = width;
        container.style.height = height;
        if (aspectRatio) container.style.aspectRatio = aspectRatio;
        
        // Create skeleton
        const skeleton = document.createElement('div');
        skeleton.classList.add('img-skeleton');
        
        // Create the animated square
        const square = document.createElement('div');
        square.classList.add('img-skeleton-square');
        
        // Assemble skeleton
        skeleton.appendChild(square);
        container.appendChild(skeleton);
        
        return container;
      },
  
      /**
       * Reset configuration to defaults
       */
      reset: function() {
        config = { ...defaultConfig };
        this._updateStyles();
        return this;
      },
  
      // Private methods
      _injectStyles: function() {
        // Check if styles already exist
        const existingStyle = document.getElementById('skeletony-styles');
        if (existingStyle) {
          existingStyle.parentNode.removeChild(existingStyle);
        }
        
        // Create new style element
        const style = document.createElement('style');
        style.id = 'skeletony-styles';
        
        // Generate CSS with current config
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
        // Remove the skeleton class
        element.classList.remove('skeleton');
        
        const parent = element.parentElement;
        
        // Check if already processed
        if (!parent.classList.contains('img-skeleton-container')) {
          // Get original styles
          const style = window.getComputedStyle(element);
          const display = style.getPropertyValue('display');
          
          // Create container
          const container = document.createElement('div');
          container.classList.add('img-skeleton-container');
          container.style.display = display;
          
          // Set dimensions
          if (element.width > 0) {
            container.style.width = element.width + 'px';
          }
          if (element.height > 0) {
            container.style.height = element.height + 'px';
          }
          
          // Use natural dimensions as fallback
          if (!container.style.width && element.naturalWidth) {
            container.style.width = element.naturalWidth + 'px';
          }
          if (!container.style.height && element.naturalHeight) {
            container.style.height = element.naturalHeight + 'px';
          }
          
          // Calculate aspect ratio
          if (parseFloat(container.style.width) && parseFloat(container.style.height)) {
            container.style.aspectRatio = parseFloat(container.style.width) / parseFloat(container.style.height);
          }
          
          // Insert container before element
          element.parentNode.insertBefore(container, element);
          
          // Configure element
          element.style.opacity = '0';
          element.style.transition = `opacity ${config.fadeTime}s ease-in-out`;
          
          // Move element into container
          container.appendChild(element);
          
          // Create skeleton
          const skeleton = document.createElement('div');
          skeleton.classList.add('img-skeleton');
          
          // Create skeleton square
          const square = document.createElement('div');
          square.classList.add('img-skeleton-square');
          skeleton.appendChild(square);
          container.appendChild(skeleton);
          
          // Handle image load event
          element.addEventListener('load', function() {
            element.style.opacity = '1';
            skeleton.style.opacity = '0';
            
            setTimeout(() => {
              if (skeleton && skeleton.parentNode) {
                skeleton.parentNode.removeChild(skeleton);
              }
            }, config.removeDelay);
          });
          
          // Handle already loaded images
          if (element.complete) {
            element.style.opacity = '1';
            skeleton.style.display = 'none';
          }
        }
      }
    };
    
    // Expose to window
    window.skeletony = skeletony;
    
  })(window);