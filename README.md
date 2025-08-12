# Casio fx-991 CW Calculator

A fully functional web-based scientific calculator that replicates the features of the Casio fx-991 CW calculator with a modern, responsive design.

## Features

### Basic Operations
- **Arithmetic**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Memory Functions**: Store (M), Recall (Shift + M)
- **Clear Functions**: All Clear (AC), Delete (DEL)

### Scientific Functions
- **Trigonometric**: sin, cos, tan (with DEG/RAD/GRAD modes)
- **Logarithmic**: log (base 10), ln (natural logarithm)
- **Power Functions**: x², √x, 1/x (reciprocal)
- **Constants**: π (pi), e (Euler's number)
- **Advanced**: |x| (absolute value), x! (factorial), exp(x)
- **Random**: RND (random number generator)
- **Modular Arithmetic**: mod, GCD (Greatest Common Divisor)

### Modes
- **Calculation Mode**: Standard scientific calculator operations
- **Statistics Mode**: Statistical calculations with data input
- **Complex Mode**: Complex number operations (planned)
- **Matrix Mode**: Matrix operations (planned)
- **Vector Mode**: Vector calculations (planned)
- **Equation Mode**: Equation solving (planned)
- **Inequality Mode**: Inequality solving (planned)
- **Ratio Mode**: Ratio calculations (planned)

### Statistics Features
- Data point input and management
- Real-time calculation of:
  - n (count of data points)
  - Σx (sum of all values)
  - Σx² (sum of squares)
  - x̄ (mean/average)
  - σx (standard deviation)

### User Interface
- **Modern Design**: Sleek, professional appearance with gradient backgrounds
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Visual Feedback**: Button animations and display updates
- **Keyboard Support**: Full keyboard input for all operations
- **Memory Indicator**: Visual indicator when memory contains a value
- **Angle Mode Display**: Shows current angle mode (DEG/RAD/GRAD)

## How to Use

### Basic Calculations
1. Enter numbers using the number keys (0-9)
2. Use decimal point (.) for decimal numbers
3. Select an operation (+, −, ×, ÷)
4. Enter the second number
5. Press = or Enter to calculate

### Scientific Functions
1. Enter a number
2. Press the desired function key (sin, cos, tan, log, ln, etc.)
3. The result will be displayed immediately

### Memory Operations
- **Store**: Enter a number, press M
- **Recall**: Press Shift + M to recall stored value
- **Memory Indicator**: Shows "M" when memory contains a value

### Mode Switching
1. Press the MODE key
2. Select desired mode from the panel
3. The calculator will switch to the selected mode

### Statistics Mode
1. Press MODE and select "Statistics"
2. Enter data points using the input field
3. Press "Add" or Enter to add each data point
4. View real-time statistics in the results panel

### Angle Mode
- Press SETUP to cycle through DEG → RAD → GRAD
- Current mode is displayed in the top-right corner

### Keyboard Shortcuts
- **Numbers**: 0-9 keys
- **Decimal**: . key
- **Operations**: +, -, *, / keys
- **Calculate**: Enter or = key
- **Clear**: Escape key
- **Delete**: Backspace key

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Object-oriented programming with classes and modules

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Responsive Design
- Desktop: Full calculator layout
- Tablet: Optimized for touch interaction
- Mobile: Compact layout with touch-friendly buttons

## File Structure
```
calculator/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── calculator.js       # JavaScript functionality
└── README.md          # This documentation
```

## Getting Started

1. Download or clone the repository
2. Open `index.html` in a modern web browser
3. Start calculating!

No installation or dependencies required - the calculator runs entirely in the browser.

## Future Enhancements

- Complex number operations
- Matrix calculations
- Vector operations
- Equation solving
- Inequality solving
- Unit conversions
- More statistical functions
- Programmable functions
- History feature
- Export/import calculations

## Contributing

Feel free to contribute by:
- Adding new mathematical functions
- Improving the user interface
- Adding new modes and features
- Optimizing performance
- Fixing bugs

## License

This project is open source and available under the MIT License.

---

**Note**: This is a web-based implementation of the Casio fx-991 CW calculator. While it provides many of the same functions, it may not have all features of the physical calculator. 
