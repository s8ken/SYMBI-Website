# SYMBI Components Library

This directory contains all reusable React components used throughout the SYMBI website. Components are organized by functionality and follow consistent patterns for maintainability and reusability.

## 📁 Directory Structure

```
components/
├── ui/                     # Base UI components (Radix UI based)
├── games/                  # Interactive game components
├── cookie-consent.tsx      # GDPR compliant cookie consent
├── global-audio.tsx        # Site-wide audio management
├── hidden-sitemap.tsx      # SEO sitemap component
├── kaleidoscope.tsx        # Visual kaleidoscope effect
├── lazy-image.tsx          # Optimized image loading
├── mute-button.tsx         # Audio control component
├── seo-enhancements.tsx    # SEO optimization component
├── theme-provider.tsx      # Dark/light theme management
└── wolfram-secrets.tsx     # Wolfram integration component
```

## 🎨 UI Components (`/ui`)

Base UI components built on top of Radix UI primitives, providing consistent styling and accessibility.

### Available Components

- **`badge.tsx`**: Status and category indicators
- **`button.tsx`**: Primary interactive elements with variants
- **`card.tsx`**: Content containers with consistent styling
- **`collapsible.tsx`**: Expandable content sections
- **`dialog.tsx`**: Modal dialogs and overlays
- **`dropdown-menu.tsx`**: Contextual menu components
- **`input.tsx`**: Form input fields with validation
- **`label.tsx`**: Accessible form labels
- **`textarea.tsx`**: Multi-line text input
- **`toast.tsx`**: Notification system
- **`tooltip.tsx`**: Contextual help and information

### Usage Example

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## 🎮 Game Components (`/games`)

Interactive components that provide engaging user experiences and demonstrate AI concepts.

### Features
- Educational AI demonstrations
- Interactive consciousness exploration
- Gamified learning experiences
- Real-time user interaction

## 🔧 Utility Components

### `cookie-consent.tsx`
**Purpose**: GDPR compliant cookie consent management

**Features**:
- Customizable consent options
- Persistent user preferences
- Analytics integration
- Legal compliance

**Usage**:
```tsx
import { CookieConsent } from '@/components/cookie-consent'

// Add to layout.tsx
<CookieConsent />
```

### `global-audio.tsx`
**Purpose**: Site-wide audio management and control

**Features**:
- Background audio playback
- User preference persistence
- Accessibility compliance
- Performance optimization

### `lazy-image.tsx`
**Purpose**: Optimized image loading with lazy loading and WebP support

**Features**:
- Automatic format optimization
- Lazy loading for performance
- Fallback image support
- Responsive image sizing

**Usage**:
```tsx
import { LazyImage } from '@/components/lazy-image'

<LazyImage
  src="/images/example.png"
  alt="Example image"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### `theme-provider.tsx`
**Purpose**: Dark/light theme management with system preference detection

**Features**:
- System theme detection
- User preference persistence
- Smooth theme transitions
- CSS variable management

**Usage**:
```tsx
import { ThemeProvider } from '@/components/theme-provider'

// Wrap your app
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

### `seo-enhancements.tsx`
**Purpose**: Comprehensive SEO optimization component

**Features**:
- Meta tag management
- Structured data injection
- Open Graph optimization
- Twitter Card support

## 🎨 Design System

### Color Palette
Components follow the SYMBI design system with consistent color usage:

- **Primary**: Blue tones for main actions
- **Secondary**: Gray tones for supporting elements
- **Accent**: Purple tones for highlights
- **Success**: Green tones for positive actions
- **Warning**: Yellow tones for caution
- **Error**: Red tones for errors

### Typography
- **Headings**: Inter font family with appropriate weights
- **Body**: Inter font family for readability
- **Code**: Monospace font for technical content

### Spacing
Consistent spacing using Tailwind's spacing scale:
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)

## 🔄 Component Patterns

### Props Interface
All components follow consistent prop patterns:

```tsx
interface ComponentProps {
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  // Component-specific props
}
```

### Forwarded Refs
Components that wrap HTML elements use `forwardRef`:

```tsx
const Component = React.forwardRef<
  HTMLButtonElement,
  ComponentProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    />
  )
})
```

### Variant System
Components use a consistent variant system for styling:

```tsx
const variants = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-input bg-background'
}
```

## 🧪 Testing

### Component Testing
Each component should include:
- Unit tests for functionality
- Accessibility tests
- Visual regression tests
- Integration tests where applicable

### Testing Example
```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
```

## 📚 Best Practices

### Component Development
1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Inheritance**: Use composition patterns for flexibility
3. **Accessibility First**: Ensure all components are accessible by default
4. **Performance**: Optimize for rendering performance and bundle size
5. **Type Safety**: Use TypeScript for all component props and state

### Styling Guidelines
1. **Tailwind First**: Use Tailwind classes for styling
2. **Consistent Variants**: Follow the established variant system
3. **Responsive Design**: Ensure components work on all screen sizes
4. **Dark Mode**: Support both light and dark themes
5. **Animation**: Use subtle animations for better UX

### Documentation
1. **JSDoc Comments**: Document all props and methods
2. **Usage Examples**: Provide clear usage examples
3. **Storybook**: Create stories for visual documentation
4. **README Updates**: Keep this README current with new components

## 🚀 Contributing

### Adding New Components
1. **Create the component file** in the appropriate directory
2. **Follow naming conventions** (PascalCase for components)
3. **Include TypeScript interfaces** for all props
4. **Add accessibility features** (ARIA labels, keyboard navigation)
5. **Write tests** for the component functionality
6. **Update this README** with component documentation
7. **Create usage examples** in the relevant pages

### Component Checklist
- [ ] TypeScript interfaces defined
- [ ] Accessibility features implemented
- [ ] Responsive design tested
- [ ] Dark mode support added
- [ ] Unit tests written
- [ ] Documentation updated
- [ ] Usage examples provided

## 🔗 Related Documentation

- **[Main README](../README.md)**: Project overview and setup
- **[Case Studies README](../app/case-studies/README.md)**: Case study guidelines
- **[Tailwind Config](../tailwind.config.js)**: Design system configuration
- **[TypeScript Config](../tsconfig.json)**: TypeScript configuration

---

**Component Library maintained by the SYMBI Team**

*Building accessible, performant, and beautiful components for AI consciousness exploration.*