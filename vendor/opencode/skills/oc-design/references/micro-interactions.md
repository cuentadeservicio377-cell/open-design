# Micro-Interactions Premium

Patrones de interacción premium extraídos de border-beam y taste-skill.

---

## Border Beam Effect

Animated border glow que viaja alrededor de un elemento.

### Uso
```tsx
import { BorderBeam } from 'border-beam';

<BorderBeam
  size="md"              // sm | md | line
  colorVariant="ocean"   // colorful | mono | ocean | sunset
  theme="dark"           // dark | light | auto
  strength={0.8}         // 0-1
  duration={2.4}         // seconds
>
  <Card>
    Your content here
  </Card>
</BorderBeam>
```

### Sizes
| Size | Glow Intensity | Use Case |
|------|----------------|----------|
| `sm` | Compact | Icon buttons, small cards |
| `md` | Full border | Feature cards, CTAs |
| `line` | Bottom-only | Search bars, inputs |

### Color Variants
| Variant | Colors | Vibe |
|---------|--------|------|
| `colorful` | Rainbow spectrum | Playful, creative |
| `mono` | Grayscale | Minimal, professional |
| `ocean` | Blue-purple | Tech, calm |
| `sunset` | Orange-yellow-red | Warm, energetic |

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'line'` | `'md'` | Size preset |
| `colorVariant` | string | `'colorful'` | Color palette |
| `theme` | `'dark' \| 'light' \| 'auto'` | `'dark'` | Background adaptation |
| `strength` | `number` | `1` | Opacity (0-1) |
| `duration` | `number` | `1.96` | Cycle duration (s) |
| `active` | `boolean` | `true` | Play/pause |
| `brightness` | `number` | `1.3` | Glow brightness |
| `saturation` | `number` | `1.2` | Glow saturation |

---

## Liquid Glass Effect

True frosted glass con inner refraction borders.

### CSS Implementation
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 20px 40px -15px rgba(0, 0, 0, 0.3);
}
```

### React/Framer Motion
```tsx
<motion.div
  style={{
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  }}
  whileHover={{
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  }}
>
```

---

## Magnetic Buttons

Buttons que se "pegan" al cursor.

### ⚠️ CRITICAL: Use useMotionValue, NOT useState

```tsx
// ❌ BANNED - causes re-renders
const [position, setPosition] = useState({ x: 0, y: 0 });

// ✅ CORRECT - outside React render cycle
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

function MagneticButton({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.button>
  );
}
```

---

## Perpetual Micro-Interactions

Animations infinitas que hacen que el UI se sienta "vivo".

### Types

#### 1. Pulse
```tsx
<motion.div
  animate={{
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

#### 2. Float
```tsx
<motion.div
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
```

#### 3. Shimmer (for loading)
```tsx
<motion.div
  animate={{
    backgroundPosition: ['200% 0', '-200% 0'],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  }}
  style={{
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    backgroundSize: '200% 100%',
  }}
/>
```

#### 4. Carousel (infinite scroll)
```tsx
<motion.div
  animate={{
    x: ['0%', '-100%'],
  }}
  transition={{
    duration: 20,
    repeat: Infinity,
    ease: "linear",
  }}
/>
```

---

## Staggered Reveals

Entrada secuencial de elementos.

### Parent-Child Pattern
```tsx
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

function StaggeredList({ items }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### CSS Alternative
```css
.stagger-item {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: calc(var(--index) * 100ms);
  opacity: 0;
}

@keyframes fadeIn {
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Spring Physics

Default animations para Framer Motion.

### Recommended Springs
```tsx
// Standard interactive
const standardSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

// Quick tap
const quickSpring = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Smooth entrance
const smoothSpring = {
  type: "spring",
  stiffness: 50,
  damping: 15,
};

// Bouncy
const bouncySpring = {
  type: "spring",
  stiffness: 200,
  damping: 10,
};
```

### Use Cases
| Interaction | Spring |
|-------------|--------|
| Button hover | `stiffness: 300, damping: 20` |
| Modal open | `stiffness: 100, damping: 15` |
| List item enter | `stiffness: 100, damping: 20` |
| Card expand | `stiffness: 50, damping: 15` |

---

## Layout Transitions

Smooth re-ordering y resizing.

### Layout Prop
```tsx
// Automatic layout animations
<motion.div layout>
  {content}
</motion.div>

// Shared element transitions
<motion.div layoutId="unique-id">
  {content}
</motion.div>
```

### AnimatePresence
```tsx
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      layout
    >
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

---

## Hover Effects

### Direction-Aware Fill
```tsx
function DirectionAwareButton({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  
  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isHovered ? 50 : 0,
          x: x,
          y: y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'var(--accent)',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>
    </motion.button>
  );
}
```

---

## Performance Notes

### Always Memoize
```tsx
// Perpetual animations MUST be memoized
const PerpetualAnimation = React.memo(({ children }) => {
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity }}>
      {children}
    </motion.div>
  );
});
```

### Isolate Client Components
```tsx
// ❌ BANNED - re-renders parent
function ParentComponent() {
  return (
    <div>
      <motion.div animate={{ ... }}>  {/* Causes re-renders */}
        Animated content
      </motion.div>
    </div>
  );
}

// ✅ CORRECT - isolated
'use client';
function AnimatedChild() {
  return (
    <motion.div animate={{ ... }}>
      Animated content
    </motion.div>
  );
}

function ParentComponent() {
  return (
    <div>
      <AnimatedChild />  {/* No re-renders */}
    </div>
  );
}
```

### GPU Acceleration
```css
/* Force GPU layer */
.will-animate {
  will-change: transform;
  transform: translateZ(0);
}

/* ⚠️ Use sparingly - only on elements that actually animate */
```
