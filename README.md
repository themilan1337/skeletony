# Skeletony

![Skeletony Banner](https://img.shields.io/badge/Skeletony-v1.0.0-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Size](https://img.shields.io/badge/Size-6.8kB-lightgrey)

A lightweight JavaScript library for customizable skeleton loading animations. Skeletony makes it easy to add beautiful loading states to your web applications with minimal effort.

## Features

- 🚀 Lightweight and dependency-free
- 🎨 Highly customizable animations and styling
- 🔄 Smooth transitions between loading and loaded states
- 🔧 Simple API with chainable methods
- 📱 Responsive and works with any element type

## Installation

### Option 1: CDN

Add the following script tag to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/skeletony@1.0.0/dist/skeletony.min.js"></script>
```

### Option 2: Direct Download

Download the library from the `dist` folder and include it in your HTML:

```html
<script src="path/to/skeletony.min.js"></script>
```

### Option 3: NPM

```bash
npm install skeletony
```

## Basic Usage

1. Add the `skeleton` class to your images or elements:

```html
<img src="your-image.jpg" class="skeleton" alt="Description">
```

2. Initialize Skeletony:

```javascript
// Initialize with default settings
skeletony.init();
```

That's it! Your elements will now show a skeleton loading animation until they're fully loaded.

## Advanced Usage

### Customizing Animation Times

```javascript
// Set fade transition to 0.8 seconds
skeletony.fade(0.8);

// Set wave animation to 3 seconds
skeletony.wave(3);

// Chain methods together
skeletony.fade(0.5).wave(2.5);
```

### Customizing Colors and Appearance

```javascript
// Change gradient colors
skeletony.colors('#f0f0f0', '#e0e0e0');

// Change border radius
skeletony.radius('10px');
```

### Targeting Different Elements

```javascript
// Target elements with a different class
skeletony.select('.my-loading-placeholder');

// Or specify during initialization
skeletony.init({
  selector: '.card-skeleton, .avatar-skeleton'
});
```

### Creating Standalone Skeletons

```javascript
// Create a standalone skeleton element
const skeleton = skeletony.create({
  width: '300px',
  height: '200px',
  aspectRatio: '16/9'
});

// Add it to the DOM
document.querySelector('.container').appendChild(skeleton);
```

### Complete Configuration Example

```javascript
skeletony.init({
  // Animation timing (in seconds)
  fadeTime: 0.5,           
  waveTime: 2.5,           
  
  // Colors
  lightColor: '#f0f0f0',   
  darkColor: '#e0e0e0',    
  
  // Styling
  borderRadius: '8px',     
  
  // Targeting
  selector: '.skeleton',   
  
  // Other options
  removeDelay: 300         // ms to remove skeleton after loading
});
```

## API Reference

### Initialization

- **`init(options)`**: Initialize with custom options
  ```javascript
  skeletony.init({
    fadeTime: 0.5,
    waveTime: 2,
    lightColor: '#f0f0f0',
    darkColor: '#e0e0e0',
    borderRadius: '8px',
    selector: '.skeleton',
    removeDelay: 300
  });
  ```

### Animation Methods

- **`fade(seconds)`**: Set fade transition time in seconds
- **`wave(seconds)`**: Set wave animation time in seconds

### Styling Methods

- **`colors(lightColor, darkColor)`**: Set custom colors for the gradient
- **`radius(value)`**: Set custom border radius (e.g., '5px', '50%')

### Selection Methods

- **`select(selector)`**: Target elements with a custom CSS selector
- **`applyTo(elements)`**: Apply to specific DOM elements
- **`refresh()`**: Re-apply to all matching elements

### Creation Methods

- **`create(options)`**: Create a standalone skeleton element
  ```javascript
  skeletony.create({
    width: '300px',
    height: '200px',
    aspectRatio: '16/9'
  });
  ```

### Removal Methods

- **`removeFrom(element)`**: Manually remove skeleton from an element
- **`reset()`**: Reset all configuration to defaults

## Browser Compatibility

Skeletony works in all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Examples

### Basic Image Loading

```html
<div class="gallery">
  <img src="image1.jpg" class="skeleton" alt="Gallery Image 1">
  <img src="image2.jpg" class="skeleton" alt="Gallery Image 2">
  <img src="image3.jpg" class="skeleton" alt="Gallery Image 3">
</div>

<script>
  skeletony.init();
</script>
```

### Content Cards

```html
<div class="card skeleton">
  <h2>Card Title</h2>
  <p>Card content goes here...</p>
</div>

<script>
  skeletony.select('.card.skeleton').fade(0.8).wave(3);
</script>
```

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Credits

Created by [Your Name] - [@yourhandle](https://github.com/yourhandle)