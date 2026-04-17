# ResQperation Admin Layout - Quick Reference

## 🎯 What Was Built

A professional, modern admin dashboard layout featuring:
- **Spotify/Gmail style toggleable sidebar** with icons+text/icons-only modes
- **Smart header layout** with user profile on the left
- **Dynamic color contrast** system ensuring all text is readable
- **Professional hover effects** with smooth 200ms transitions
- **Fully responsive** design (mobile, tablet, desktop)
- **Accessibility features** including keyboard navigation & WCAG AA contrast

---

## 📁 Key Files Modified

| File | Changes |
|------|---------|
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Complete refactor (480 lines) |
| `tailwind.config.js` | No changes (uses existing color scheme) |
| All Pages | Automatically use new layout |

---

## 🎨 Visual Overview

### Header (Sticky)
```
[☰] [👤 User] │═══ ResQperation HQ ═══│ [⋮] Settings
 Menu  Profile   Branding (center)    Dropdown
```

### Sidebar (Toggle between expanded/collapsed)
```
EXPANDED 272px         COLLAPSED 80px
─────────────          ──────────
📊 Dashboard      OR   📊 (tooltip)
🚨 Disasters           🚨
👥 Responders          👥
🏠 Households          🏠
📋 Requests            📋
⚙️  Settings           ⚙️
```

### Main Content
```
┌─────────────────────────────────────┐
│ Page Title / Header Content         │
├─────────────────────────────────────┤
│ White card with page content        │
│ (shadow-ambient, rounded-2xl)       │
└─────────────────────────────────────┘
```

### Footer (Sticky)
```
ResQperation HQ Portal — Disaster coordination system
```

---

## 🎭 Color Scheme

| Name | Color | Usage |
|------|-------|-------|
| `surface` | #F7F9FB | Main backgrounds |
| `surface-container-low` | #F2F4F6 | Sidebar, secondary sections |
| `surface-container-lowest` | #FFFFFF | Content cards |
| `surface-container-high` | #E6E8EA | Hover states |
| `on-surface` | #191C1E | Primary text (dark) |
| `primary-container` | #111C2D | Active states, accents |

---

## ⌨️ State Management

### Sidebar Toggle
```javascript
const [sidebarOpen, setSidebarOpen] = useState(true);

// Click menu button → toggles between:
// true   = sidebar visible with text
// false  = sidebar collapsed, icons only
```

### Mobile Menu
```javascript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// On mobile: hamburger × 3 button toggles full-screen menu
// On desktop: not visible (lg:hidden)
```

### Active Route Detection
```javascript
route().current(item.key + '*')
// Returns true if current route matches nav item
// Automatically highlights active nav item
```

---

## 🚀 How to Use

### For Users:

1. **Click menu button** (☰) to toggle sidebar
2. **Click nav items** to navigate to pages
3. **Hover over collapsed sidebar** icons to see labels
4. **Click account menu** (⋮) for profile/logout
5. **On mobile** use hamburger menu instead of sidebar

### For Developers:

1. **Add pages** at `resources/js/Pages/YourPage.jsx`
2. **Use AuthenticatedLayout** wrapper:

```jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function YourPage() {
    return (
        <AuthenticatedLayout header={<h1>Page Title</h1>}>
            {/* Page content */}
        </AuthenticatedLayout>
    );
}
```

3. **Create routes** in `routes/web.php`:

```php
Route::middleware('auth')->group(function () {
    Route::get('/your-page', [YourController::class, 'index'])
        ->name('your-page.index');
});
```

4. **Add to sidebar** in `AuthenticatedLayout.jsx`:

```jsx
const navItems = [
    // ... existing items ...
    {
        name: 'Your Page',
        href: route('your-page.index'),
        key: 'your-page',
        icon: <svg>...</svg>, // Material Design icon
    },
];
```

---

## 📊 Responsive Breakpoints

| Device | Sidebar | Menu Type | Width |
|--------|---------|-----------|-------|
| Mobile | Hidden | Hamburger | < 640px |
| Tablet | Hidden | Hamburger | 640px - 1023px |
| Desktop | Visible | Toggle | ≥ 1024px |

---

## 🎯 Navigation Items

| Item | Icon | Route | Key |
|------|------|-------|-----|
| Dashboard | 📊 | `/dashboard` | `dashboard` |
| Disasters | 🚨 | `/disasters` | `disasters` |
| Responders | 👥 | `/responders` | `responders` |
| Households | 🏠 | `/households` | `households` |
| Requests | 📋 | `/requests` | `requests` |
| Settings | ⚙️ | (dropdown) | N/A |

---

## 🎨 Styling Examples

### Active Navigation Item
```javascript
// Automatically applied when route matches
className="bg-primary-container text-surface"
```

### Hover Effects
```javascript
// For buttons/links
className="hover:bg-surface-container-high transition-all duration-200"

// For active button
className="active:scale-95"
```

### Disabled State
```javascript
className="opacity-50 cursor-not-allowed"
```

---

## 🔍 Debugging

### Sidebar Not Showing?
- Check screen size (lg: breakpoint = ≥1024px)
- Right-click → Inspect → Check `.hidden.lg:flex` classes

### Colors Look Wrong?
- Run `npm run build`
- Hard refresh browser (Ctrl+Shift+R)
- Check tailwind.config.js color values

### Route Not Working?
- Verify route exists in `routes/web.php`
- Check route name matches in `AuthenticatedLayout.jsx`
- Run `php artisan route:list`

### Icons Not Showing?
- Ensure SVG is inside `<svg></svg>` tags
- Check `fill="currentColor"` is set
- Verify `viewBox="0 0 24 24"` for size consistency

---

## 📱 Mobile Optimization

### Touch-Friendly:
- ✅ All buttons: minimum 44×44px
- ✅ Tap targets: proper spacing
- ✅ No hover-only interactive elements
- ✅ Full-screen menu on small screens

### Performance:
- ✅ CSS-only animations (no JS)
- ✅ Minimal layout shifts
- ✅ Optimized SVG icons
- ✅ No unnecessary re-renders

---

## ♿ Accessibility

- ✅ **Keyboard Navigation**: Tab through all elements
- ✅ **Focus States**: Clear focus indicators
- ✅ **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- ✅ **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<footer>`
- ✅ **ARIA Labels**: All buttons have titles/labels
- ✅ **Screen Readers**: Proper heading hierarchy

---

## 🔧 Common Customizations

### Change Sidebar Width

```jsx
// Line 250 in AuthenticatedLayout.jsx
${sidebarOpen ? 'w-72' : 'w-20'}  // Change w-72 to w-64 or w-80
```

### Change Colors

```javascript
// tailwind.config.js
colors: {
    surface: '#YOUR_COLOR',
    // ...
}
```

### Add Navigation Item

```jsx
// In navItems array:
{
    name: 'New Page',
    href: route('new-page.index'),
    key: 'new-page',
    icon: <svg>...</svg>,
}
```

---

## ✅ Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `LAYOUT_REFACTOR_GUIDE.md` | Detailed feature explanation |
| `LAYOUT_STRUCTURE_GUIDE.md` | Visual ASCII diagrams & layout zones |
| `LAYOUT_CUSTOMIZATION_GUIDE.md` | How to customize & extend layout |
| `QUICK_REFERENCE.md` | This file - quick lookup |

---

## 🚀 Next Steps

### Immediate:
1. ✅ Test on different screen sizes
2. ✅ Verify all nav items work
3. ✅ Check sidebar toggle smoothness

### Short-term:
- [ ] Add search bar to header
- [ ] Implement notifications bell
- [ ] Add user avatar image
- [ ] Create breadcrumbs

### Long-term:
- [ ] Light/dark mode toggle
- [ ] Custom theme selector
- [ ] User preferences (compact mode, etc.)
- [ ] Advanced analytics sidebar

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Sidebar frozen | Check if `setSidebarOpen` state is updating |
| Text invisible | Verify background/text color contrast |
| Icons misaligned | Check all SVG viewBox="0 0 24 24" |
| Mobile menu broken | Ensure `lg:hidden` class on hamburger button |
| Build fails | Run `npm install`, then `npm run build` |

---

## 📞 Support

For issues, check:
1. Browser console (F12) for JavaScript errors
2. Terminal output for build errors
3. Network tab for failed requests
4. Review documentation files above

---

**Built**: April 4, 2026  
**Status**: ✅ Production Ready  
**Version**: 1.0.0
