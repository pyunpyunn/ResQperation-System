# ResQperation Admin Layout - Customization Guide

## Adding New Navigation Items

### Step 1: Add to navItems Array

File: `resources/js/Layouts/AuthenticatedLayout.jsx`

```jsx
const navItems = [
    // ... existing items ...
    {
        name: 'Analytics',
        href: route('analytics.index'),
        key: 'analytics',
        icon: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
            </svg>
        ),
    },
];
```

### Step 2: Ensure Route Exists

Make sure your Laravel route is defined in `routes/web.php`:

```php
Route::middleware('auth')->group(function () {
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
});
```

### Step 3: Test

The new item will automatically:
- ✅ Appear in the sidebar (both expanded and collapsed)
- ✅ Show tooltip on hover when collapsed
- ✅ Highlight when the current route matches
- ✅ Be responsive on mobile

---

## Customizing Colors

### Option 1: Tailwind Theme (Recommended)

Edit `tailwind.config.js`:

```javascript
theme: {
    extend: {
        colors: {
            surface: '#NEW_COLOR',
            'surface-container-low': '#NEW_COLOR',
            // ... etc
        },
    },
},
```

Then rebuild: `npm run build`

### Option 2: Inline Classes (Not Recommended)

Each section uses Tailwind classes that reference the theme colors:

**Header**:
```jsx
className="bg-surface text-on-surface"  // Uses theme colors
```

**Sidebar Active Item**:
```jsx
className="bg-primary-container text-surface"
```

---

## Modifying Hover Effects

### Change Sidebar Hover Color

File: `resources/js/Layouts/AuthenticatedLayout.jsx`, line ~120

```jsx
// Current:
className={`... hover:bg-surface-container-high hover:text-primary-container`}

// Alternative (more subtle):
className={`... hover:bg-surface-container-high/50 hover:text-on-surface`}

// Alternative (more bold):
className={`... hover:bg-primary-container/20 hover:text-primary-container`}
```

### Change Transition Duration

Search for `duration-200` or `duration-300`:

```jsx
// Current (snappy):
className="transition-all duration-200"

// Slower (smoother):
className="transition-all duration-500"

// Faster (snappy):
className="transition-all duration-100"
```

---

## Adjusting Sidebar Width

### Expanded Width

File: `AuthenticatedLayout.jsx`, line ~250

```jsx
// Current: w-72 (288px)
<aside className={`... ${sidebarOpen ? 'w-72' : 'w-20'} ...`}>

// Wider dropdown-style menu:
<aside className={`... ${sidebarOpen ? 'w-80' : 'w-20'} ...`}>

// Narrower sidebar:
<aside className={`... ${sidebarOpen ? 'w-64' : 'w-20'} ...`}>
```

### Collapsed Width

Same line, second value:

```jsx
// Current: w-20 (80px) - icon width 20px + padding
${sidebarOpen ? 'w-72' : 'w-20'}

// Smaller collapsed sidebar (icon only):
${sidebarOpen ? 'w-72' : 'w-16'}

// Larger collapsed sidebar (icon with extra space):
${sidebarOpen ? 'w-72' : 'w-24'}
```

---

## Header Customization

### Reorder Header Sections

Current order (Left → Center → Right):
```jsx
1. Menu button + User profile
2. Branding (logo + text)
3. Account dropdown
```

To move branding to the left:

```jsx
// Find this section in the header (around line 50):
<div className="flex items-center justify-between gap-4 px-6 py-4">
    {/* Left: Menu + User */}
    {/* Center: Branding */}
    {/* Right: Account */}
</div>

// Rearrange the inner divs to change order
```

### Hide User Profile on Desktop

Change line ~70:

```jsx
{/* Before: */}
<div className="flex items-center gap-3 min-w-0 hidden sm:block px-2 py-1 rounded-lg bg-surface-container-low">

{/* After: */}
<div className="flex items-center gap-3 min-w-0 hidden md:block px-2 py-1 rounded-lg bg-surface-container-low">
// hidden md:block → Only show on lg+ screens
```

### Add a Search Bar

```jsx
{/* Add to header, between branding and account */}
<div className="hidden md:flex flex-1 max-w-xs items-center">
    <input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg border border-surface-container-high px-4 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
    />
</div>
```

---

## Footer Customization

### Change Footer Text

File: `AuthenticatedLayout.jsx`, line ~500

```jsx
{/* Current: */}
<p>ResQperation HQ Portal — Disaster coordination and rescue management system</p>

{/* Custom: */}
<p>Your Custom Footer Text Here © 2026</p>
```

### Make Footer Match Sidebar

```jsx
{/* Change from: */}
<footer className="flex-shrink-0 border-t border-surface-container-high/50 bg-surface-container-low px-6 py-4">

{/* To: */}
<footer className="flex-shrink-0 border-t border-surface-container-high/50 bg-surface px-6 py-4">
```

---

## Mobile Menu Customization

### Add More Options to Mobile Menu

Search for the mobile menu section (around line 200):

```jsx
{mobileMenuOpen && (
    <nav className="...">
        <div className="space-y-2">
            {navItems.map(...)}  {/* Navigation items */}
            
            {/* Add custom sections here */}
            <hr className="border-surface-container-high my-2" />
            
            {/* Add more links */}
            <Link href="/settings" className="...">
                ⚙️ Settings
            </Link>
        </div>
    </nav>
)}
```

---

## Responsive Breakpoints

### Hide Sidebar on Mobile

Current code:
```jsx
<aside className="hidden lg:flex flex-col ...">
```

Change to show on tablet:
```jsx
<aside className="hidden md:flex flex-col ...">
```

### Hide/Show Elements at Different Sizes

```jsx
{/* Hidden on mobile, visible on desktop */}
<div className="hidden md:block">...</div>

{/* Hidden on desktop, visible on mobile */}
<div className="md:hidden">...</div>

{/* Visible everywhere except mobile */}
<div className="sm:block">...</div>

{/* Visible only on large screens */}
<div className="lg:block">...</div>
```

---

## Advanced Customizations

### Add User Authentication Badge

In header user section (line ~80):

```jsx
<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-surface font-semibold flex-shrink-0">
    {user.name.charAt(0).toUpperCase()}
    
    {/* Add badge */}
    <div className="absolute top-0 right-0 w-3 h-3 bg-safe rounded-full border-2 border-surface" />
</div>
```

### Add Sidebar Section Headers

Modify sidebar nav rendering (around line ~280):

```jsx
<nav className="flex-1 space-y-1 px-3">
    {/* Add section */}
    <div className="text-xs font-semibold uppercase text-surface-container-high px-3 py-2 mt-4">
        Main
    </div>
    
    {/* Main nav items */}
    {navItems.slice(0, 3).map(...)}
    
    {/* Add another section */}
    <div className="text-xs font-semibold uppercase text-surface-container-high px-3 py-2 mt-4">
        Administration
    </div>
    
    {/* Admin nav items */}
    {navItems.slice(3).map(...)}
</nav>
```

### Conditional Sidebar Visibility

Show/hide sidebar based on user role:

```jsx
const canAccessSidebar = user.role === 'admin';

{/* In sidebar markup: */}
{canAccessSidebar && (
    <aside className="hidden lg:flex ...">
        {/* ... sidebar content ... */}
    </aside>
)}
```

---

## Performance Tips

### 1. Memoize Sidebar Links

If you have many nav items:

```jsx
const SidebarLink = React.memo(({ item, isActive, sidebarOpen }) => {
    // ... component code ...
});
```

### 2. Debounce Sidebar Toggle

```jsx
const [sidebarOpen, setSidebarOpen] = useState(true);
const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
}, []);
```

### 3. Use CSS Media Queries for Responsive

Instead of hiding/showing with JavaScript:

```jsx
// Let CSS handle responsive hiding
<aside className="hidden lg:flex ...">
    {/* Automatically hidden on small screens by Tailwind */}
</aside>
```

---

## Testing Checklist

When customizing, verify:

- [ ] Icons render correctly
- [ ] Colors have sufficient contrast
- [ ] Sidebar toggle works smoothly
- [ ] Mobile menu opens/closes
- [ ] All nav items highlight correctly
- [ ] No layout shift on toggle
- [ ] Tooltips appear on hover
- [ ] Responsive breakpoints work
- [ ] No console errors
- [ ] Build completes successfully

---

## Common Issues & Solutions

### Sidebar Not Toggling?

Check if `setSidebarOpen` is being called:

```jsx
// Make sure the button calls the right function
onClick={() => setSidebarOpen(!sidebarOpen)}
// NOT
onClick={setSidebarOpen}  // ❌ Wrong - passes boolean
```

### Colors Not Updating?

1. Clear build cache: `rm -rf public/build`
2. Rebuild: `npm run build`
3. Clear browser cache: Ctrl+Shift+R (hard refresh)

### Sidebar Text Overlapping Icons?

Adjust gap or padding:

```jsx
className="flex items-center gap-4 ...  // Increase from 4 to 6
```

### Tooltip Not Showing?

Ensure `isVisible` prop is correct:

```jsx
<Tooltip text={item.name} isVisible={!sidebarOpen}>
    {/* Should show when sidebar is COLLAPSED (!sidebarOpen) */}
</Tooltip>
```

---

## Build & Deploy

After making changes:

```bash
# Build for production
npm run build

# Verify no errors
php artisan route:list

# Start development server (if needed)
npm run dev
```

---

*Last Updated: April 4, 2026*
