# infinite-marquee

A simple, lightweight infinite marquee component. Create smooth scrolling text animations with ease.

## Installation

### Via CDN (Recommended for quick setup)

Include the CSS and JavaScript files from jsDelivr CDN:

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/@rtstic-dev/infinite-marquee@latest/dist/styles.css" rel="stylesheet" type="text/css" />

<!-- JavaScript -->
<script defer src="https://cdn.jsdelivr.net/npm/@rtstic-dev/infinite-marquee@latest/dist/index.js"></script>
```

### Via NPM

```bash
npm install @rtstic-dev/infinite-marquee
```

Then import in your project:

```javascript
import { initializeMarquee } from '@rtstic-dev/infinite-marquee';
import '@rtstic-dev/infinite-marquee/dist/styles.css';

initializeMarquee();
```

## Basic HTML Structure

Create a marquee with the following structure:

```html
<div rtstic-marquee="wrapper">
    <div rtstic-marquee="list">
        <div rtstic-marquee="item">Item 1</div>
        <div rtstic-marquee="item">Item 2</div>
        <div rtstic-marquee="item">Item 3</div>
        <div rtstic-marquee="item">Item 4</div>
    </div>
</div>
```

### Structure Breakdown

- **wrapper**: Outer container that hides overflow
- **list**: Flex container that holds all items and animates
- **item**: Individual content pieces

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Marquee</title>
    
    <link href="https://cdn.jsdelivr.net/npm/@rtstic-dev/infinite-marquee@latest/dist/styles.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <h1>Marquee Example</h1>
    
    <div rtstic-marquee="wrapper">
        <div rtstic-marquee="list">
            <div rtstic-marquee="item">⭐ Item 1</div>
            <div rtstic-marquee="item">⭐ Item 2</div>
            <div rtstic-marquee="item">⭐ Item 3</div>
            <div rtstic-marquee="item">⭐ Item 4</div>
        </div>
    </div>
    
    <script defer src="https://cdn.jsdelivr.net/npm/@rtstic-dev/infinite-marquee@latest/dist/index.js"></script>
</body>
</html>
```

## Configuration

The marquee initializes automatically with default settings. To customize, pass a config object:

```html
<script defer src="marquee.js"></script>
<script>
    initializeMarquee({
        multiplier: 5,      // Number of times to duplicate content (default: 4)
        duration: 80,       // Total animation duration in seconds (default: 100)
        selector: "[rtstic-marquee='list']"  // Element selector (default as shown)
    });
</script>
```

## Default Configuration

```javascript
{
    multiplier: 4,
    duration: 100,
    selector: "[rtstic-marquee='list']"
}
```

## Features

✨ **Smooth infinite scrolling** - Content loops seamlessly
🎨 **Customizable** - Control speed and duplication count
⏸️ **Hover pause** - Animation pauses on hover
🚀 **Lightweight** - Minimal code, maximum performance
🎯 **Easy to use** - Simple HTML attributes

## Tips

- Add more items for a longer marquee
- Increase `multiplier` for slower scrolling feel
- Decrease `duration` for faster animation
- Customize item styles with CSS classes inside each item

## License

MIT