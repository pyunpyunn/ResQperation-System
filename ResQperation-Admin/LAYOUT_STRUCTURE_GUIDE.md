# ResQperation Admin Dashboard - Layout Structure

## Desktop View (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER - Sticky at top (bg: surface, shadow: ambient)                   │
├─────────────────────────────────────────────────────────────────────────┤
│ ☰ [👤 User] │    ResQperation HQ Portal    │                      ⋮    │
│   Profile                                        Account Menu            │
│   Section                                                                │
├──────────────┬─────────────────────────────────────────────────────────┤
│ SIDEBAR      │ MAIN CONTENT                                            │
│ (272px or    │                                                         │
│  80px)       │ ┌─────────────────────────────────────────────────────┐ │
│              │ │ Page Header                                        │ │
│ 📊 Dashboard │ ├─────────────────────────────────────────────────────┤ │
│              │ │                                                   │ │
│ 🚨 Disasters │ │ Page Content                                     │ │
│              │ │ (rounded card)                                   │ │
│ 👥 Responders│ │                                                   │ │
│              │ │                                                   │ │
│ 🏠 Households│ └─────────────────────────────────────────────────────┘ │
│              │                                                         │
│ 📋 Requests  │                                                         │
│              │                                                         │
│ ⚙️  Settings │                                                         │
│              │                                                         │
├──────────────┴─────────────────────────────────────────────────────────┤
│ FOOTER - Sticky at bottom (bg: surface-container-low, text: light)    │
├─────────────────────────────────────────────────────────────────────────┤
│         ResQperation HQ Portal — Disaster coordination system          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Sidebar States

### EXPANDED (272px width)
```
┌─────────────────┐
│ MENU            │
├─────────────────┤
│ 📊 Dashboard    │ ← Current page (dark bg)
│ 🚨 Disasters    │
│ 👥 Responders   │
│ 🏠 Households   │
│ 📋 Requests     │
├─────────────────┤
│ ⚙️  Settings    │
└─────────────────┘
```

### COLLAPSED (80px width)
```
┌──────┐
│ 📊   │ ← Hover to show "Dashboard" tooltip
├──────┤
│ 🚨   │ ← Hover to show "Disasters" tooltip
│ 👥   │
│ 🏠   │
│ 📋   │
├──────┤
│ ⚙️   │
└──────┘
```

## Mobile View (<1024px)

```
┌─────────────────────────────────────┐
│ ☰ [👤] │ ResQperation   │  ⋮        │
│   Toggle Avatar       Branding  Menu │
├─────────────────────────────────────┤
│                                     │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ Page Header                   │   │
│ ├───────────────────────────────┤   │
│ │ Page Content (full width)     │   │
│ │                               │   │
│ │                               │   │
│ │                               │   │
│ └───────────────────────────────┘   │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ ResQperation HQ Portal...          │
└─────────────────────────────────────┘

[Hamburger Menu Open]
┌─────────────────────────────────────┐
│ ☰ [👤] │ ResQperation   │  ⋮        │
├─────────────────────────────────────┤
│ 📊 Dashboard                        │
│ 🚨 Disaster Tracking                │
│ 👥 Responders                       │
│ 🏠 Households                       │
│ 📋 Requests                         │
│ ───────────────────────────────────
│ 👤 Profile                          │
│ 🚪 Log Out                          │
└─────────────────────────────────────┘
```

## Header Sections

```
┌─ LEFT CLUSTER ──────────────────────────┬─ CENTER ─────────┬── RIGHT ────┐
│ ☰ [Menu Toggle]                         │ 🎯 Logo          │ ⋮ [Dropdown]│
│ [👤 Name]                               │    ResQperation  │             │
│  user@email.com                         │    HQ Portal     │ Profile     │
│                                         │                  │ Log Out     │
│                                         │                  │             │
└─────────────────────────────────────────┴──────────────────┴─────────────┘
```

## Color Zones

```
ZONE 1: HEADER
├─ Background: surface (#F7F9FB)
├─ Text: on-surface (#191C1E)
└─ User Profile Box: surface-container-low (#F2F4F6)

ZONE 2: SIDEBAR
├─ Background: surface-container-low (#F2F4F6)
├─ Text: on-surface (#191C1E)
├─ Inactive Item Hover: surface-container-high (#E6E8EA)
└─ Active Item: primary-container (#111C2D) with text-surface

ZONE 3: MAIN CONTENT
├─ Background: surface (#F7F9FB)
└─ Content Card: surface-container-lowest (#FFFFFF)

ZONE 4: FOOTER
├─ Background: surface-container-low (#F2F4F6)
└─ Text: surface-container-high (#E6E8EA)
```

## Interactive State Transitions

```
DEFAULT → HOVER → ACTIVE

Button/Link States:
┌─────────────┐   ┌─────────────────┐   ┌──────────────────┐
│ bg: light   │   │ bg: medium      │   │ bg: dark         │
│ text: dark  │→→→│ text: dark      │→→→│ text: light      │
│ no shadow   │   │ slight scale-up │   │ shadow-ambient   │
└─────────────┘   └─────────────────┘   └──────────────────┘

Nav Items:
┌──────────────┐   ┌──────────────────┐   ┌──────────────────┐
│ surface-low  │   │ surface-high     │   │ primary-cont     │
│ on-surface   │→→→│ on-surface       │→→→│ surface text     │
│ rounded-xl   │   │ rounded-xl       │   │ rounded-xl       │
│             │   │ active transition │   │ active state     │
└──────────────┘   └──────────────────┘   └──────────────────┘

Transitions:
- Duration: 200ms for most interactions
- Timing: ease-in-out
- Properties: background-color, text-color, transform
- Active Button: scale-95 (haptic feedback feel)
```

## Spacing Reference

```
HEADER
┌─────────────────────────────────────┐
│ px-6 py-4 (padding)                │
├─────────────────────────────────────┤
│ gap-4 between sections             │
├─────────────────────────────────────┤
│ h-10 w-10 (button size)            │
└─────────────────────────────────────┘

SIDEBAR
┌──────────┐
│ p-4      │ Header section
├──────────┤
│ px-3     │ Nav items
│ space-y-1│ (gap between items)
├──────────┤
│ p-3      │ Footer section
└──────────┘

CONTENT
┌─────────────────────────┐
│ px-6 py-8 (desktop)     │
│ px-4 py-6 (mobile)      │
│ max-w-7xl (max-width)   │
│ space-y-6 (vertical gap)│
│                         │
│ ┌───────────────────┐   │
│ │ p-6 sm:p-8 (card)│   │
│ │ shadow-ambient    │   │
│ │ rounded-2xl       │   │
│ └───────────────────┘   │
└─────────────────────────┘

FOOTER
┌─────────────────────────┐
│ px-6 py-4 (padding)     │
│ text-center text-sm     │
└─────────────────────────┘
```

## Responsive Breakpoints

```
Mobile (<640px)
├─ No sidebar visible
├─ Hamburger menu in header
├─ Full-width content
└─ Compact header (no branding text)

Tablet (640px - 1024px)
├─ No sidebar (hidden on medium)
├─ Hamburger menu still available
├─ Full-width content with padding
└─ Full header with branding

Desktop (≥1024px)
├─ Sidebar visible & toggleable
├─ Horizontal nav in header (hidden, only in sidebar)
├─ Grid layout: sidebar + content
└─ No hamburger menu (sidebar toggle instead)
```

## Z-Index Stack

```
z-50     Tooltips (appear above all)
z-40     Header (sticky, above main content)
z-10     Dropdowns/Modals (above content)
z-0      Main content (default)
```

## Animation Durations

```
Sidebar Toggle:     300ms (ease-in-out)
Nav Item Hover:     200ms (ease-in-out)
Tooltip Fade:       200ms (opacity-0 → opacity-100)
Button Active:      Instant (scale-95)
Color Transitions:  200ms (default Tailwind)
```
