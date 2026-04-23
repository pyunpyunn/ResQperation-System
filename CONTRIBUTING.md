# Contributing to ResQperation

Thank you for contributing to the ResQperation disaster response platform! This guide provides standards and best practices for maintaining code quality across all four applications.

---

## Table of Contents

- [Branches & Workflow](#branches--workflow)
- [Code Standards](#code-standards)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Testing](#testing)
- [Documentation](#documentation)
- [Project Setup](#project-setup)

---

## Branches & Workflow

### Branch Naming

```
main              - Production-ready code
develop           - Integration branch for features
feature/*         - New features (e.g., feature/disaster-tracking)
bugfix/*          - Bug fixes (e.g., bugfix/evacuation-logic)
hotfix/*          - Urgent fixes (e.g., hotfix/auth-token-expiry)
docs/*            - Documentation updates
```

### Workflow

1. **Create feature branch from `develop`**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/descriptive-name
   ```

2. **Make commits** (see [Commit Messages](#commit-messages))

3. **Push and create Pull Request**
   ```bash
   git push origin feature/descriptive-name
   # Create PR on GitHub
   ```

4. **Code Review** - At least 1 approval required

5. **Merge to develop**
   ```bash
   # After approval, merge via GitHub UI
   ```

6. **Periodic Release** - Merge `develop` → `main` when ready for production

---

## Code Standards

### Laravel (Backend & Admin)

**PHP Style**: PSR-12

```php
// ✅ GOOD
class DisasterController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $disasters = DisasterEvent::where('StartTime', '>=', now())
            ->orderBy('SeverityID', 'desc')
            ->paginate(15);

        return response()->json($disasters);
    }

    public function store(StoreDisasterRequest $request): JsonResponse
    {
        $disaster = DisasterEvent::create($request->validated());

        return response()->json($disaster, 201);
    }
}

// ❌ AVOID
class DisasterController extends Controller
{
    public function index($request){
    $d = DB::select("SELECT * FROM DisasterEvent ORDER BY SeverityID DESC");
    return json_encode($d);
    }
}
```

**Validation**: Use Form Requests

```php
// app/Http/Requests/StoreDisasterRequest.php
class StoreDisasterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'disaster_type' => 'required|string|max:50',
            'description' => 'nullable|string',
            'severity_id' => 'required|exists:SeverityLevel,SeverityID',
            'start_time' => 'required|date|after_or_equal:now',
        ];
    }

    public function messages(): array
    {
        return [
            'disaster_type.required' => 'Disaster type is required',
            'severity_id.exists' => 'Selected severity level does not exist',
        ];
    }
}
```

**Models**: Use Eloquent relationships

```php
// app/Models/DisasterEvent.php
class DisasterEvent extends Model
{
    use HasTimestamps;

    protected $table = 'DisasterEvent';
    protected $primaryKey = 'DisasterID';
    public $timestamps = true;

    protected $fillable = [
        'DisasterType',
        'Description',
        'SeverityID',
        'StartTime',
        'EndTime',
    ];

    // Relationships
    public function severity()
    {
        return $this->belongsTo(SeverityLevel::class, 'SeverityID', 'SeverityID');
    }

    public function households()
    {
        return $this->hasMany(HouseholdDisaster::class, 'DisasterID', 'DisasterID');
    }

    public function responders()
    {
        return $this->hasMany(ResponderAssignment::class, 'DisasterID', 'DisasterID');
    }
}
```

### React / TypeScript (Frontend & Mobile)

**Style**: Functional components with hooks

```tsx
// ✅ GOOD
interface DisasterListProps {
  onSelectDisaster: (id: number) => void;
}

export const DisasterList: React.FC<DisasterListProps> = ({
  onSelectDisaster,
}) => {
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisasters();
  }, []);

  const fetchDisasters = async () => {
    try {
      const response = await fetch('/api/v1/disasters');
      const data = await response.json();
      setDisasters(data.data);
    } catch (error) {
      console.error('Failed to fetch disasters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="disaster-list">
      {disasters.map((disaster) => (
        <DisasterCard
          key={disaster.id}
          disaster={disaster}
          onSelect={() => onSelectDisaster(disaster.id)}
        />
      ))}
    </div>
  );
};

// ❌ AVOID - Class components, prop drilling
class DisasterList extends React.Component {
  state = { disasters: [] };
  // ...
}
```

**Naming**: kebab-case for files, PascalCase for components

```
components/
  ├── disaster-list.tsx
  ├── household-card.tsx
  └── responder-assignment.tsx
```

**API Calls**: Use custom hooks or services

```ts
// hooks/useDisasters.ts
import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api-client';

export const useDisasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get('/disasters');
        setDisasters(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { disasters, loading, error };
};
```

### Styling

**Admin Dashboard**: TailwindCSS

```tsx
<div className="card rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-bold text-gray-900">Disasters</h2>
  <p className="text-gray-600 mt-2">Active disaster events</p>
</div>
```

**Mobile Apps**: TailwindCSS (Expo)

```tsx
<View className="bg-white rounded-lg p-4 shadow-sm">
  <Text className="text-lg font-bold text-gray-900">Request Status</Text>
  <Text className="text-sm text-gray-600 mt-1">Pending assignment</Text>
</View>
```

---

## Commit Messages

### Format

```
<type>: <subject> (#<issue-number>)

<body>

<footer>
```

### Type

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build, dependencies, etc.

### Examples

```bash
# Feature
git commit -m "feat: add real-time disaster notifications (#42)

- Implement WebSocket connection for live updates
- Add notification badge to mobile app header
- Update API to support push notification subscriptions"

# Bug fix
git commit -m "fix: correct evacuation site occupancy calculation (#51)

The occupancy was being incremented twice when a household
evacuated. Fixed by removing duplicate increment in
HouseholdEvacuation model."

# Documentation
git commit -m "docs: add API authentication guide (#45)"
```

---

## Pull Requests

### Before Submitting

1. **Pull latest from target branch**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. **Test locally**
   - Run unit tests
   - Test in Postman/browser
   - Check for console errors

3. **Code review yourself**
   - Did you add comments?
   - Are variable names clear?
   - Any debug code left in?

### PR Template

```markdown
## Description
Brief description of changes

## Related Issue
Closes #42

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How to Test
1. Step one
2. Step two
3. Expected result

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

- **Maintainer**: Check for code quality, tests, documentation
- **Feedback**: Request changes if needed
- **Approval**: 1+ approvals required
- **Merge**: Squash and merge to keep history clean

---

## Testing

### Backend (PHPUnit)

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/DisasterControllerTest.php

# Run with coverage
php artisan test --coverage
```

**Example test:**
```php
// tests/Feature/DisasterControllerTest.php
class DisasterControllerTest extends TestCase
{
    public function test_can_list_active_disasters()
    {
        $disaster = DisasterEvent::factory()->create();

        $response = $this->getJson('/api/v1/disasters');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.DisasterID', $disaster->DisasterID);
    }

    public function test_can_create_disaster()
    {
        $response = $this->postJson('/api/v1/disasters', [
            'disaster_type' => 'Earthquake',
            'severity_id' => 1,
            'start_time' => now(),
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.DisasterType', 'Earthquake');
    }
}
```

### Frontend (Vitest)

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

**Example test:**
```tsx
// components/disaster-list.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { DisasterList } from './disaster-list';

describe('DisasterList', () => {
  it('displays disasters from API', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data: [{ id: 1, name: 'Typhoon' }],
        }),
      })
    );

    render(<DisasterList />);

    await waitFor(() => {
      expect(screen.getByText('Typhoon')).toBeInTheDocument();
    });
  });
});
```

---

## Documentation

### Code Comments

```php
// ✅ Good: Explains WHY, not WHAT
// Sorting by severity ensures high-priority disasters appear first
$disasters = $disasters->sortBy('SeverityID');

// ❌ Avoid: States the obvious
// Get disasters
$disasters = DisasterEvent::all();
```

### Docblocks

```php
/**
 * Assign responders to a disaster event
 *
 * @param  DisasterEvent  $disaster  The disaster event
 * @param  array<int>     $responderIds  IDs of responders to assign
 * @return void
 *
 * @throws \InvalidArgumentException If responder not found
 */
public function assignResponders(DisasterEvent $disaster, array $responderIds): void
{
    // Implementation
}
```

### README Updates

Update relevant README when:
- Adding new API endpoints
- Adding new features
- Changing setup process
- Adding new dependencies

---

## Project Setup

### Backend
See [ResQperation-Backend/README.md](../ResQperation-Backend/README.md)

### Admin Dashboard
See [ResQperation-Admin/README.md](../ResQperation-Admin/README.md)

### Household App
See [ResQperation-Household/README.md](../ResQperation-Household/README.md)

### Rescuer App
See [ResQperation-Rescuer/README.md](../ResQperation-Rescuer/README.md)

---

## Git Workflow Diagram

```
main (production)
  ↑
  └─ develop
      ↑
      ├─ feature/user-auth
      ├─ feature/disaster-tracking
      ├─ bugfix/evacuation-bug
      └─ docs/api-guide
```

---

## Code Review Checklist

- [ ] Code follows project standards
- [ ] All tests pass
- [ ] No console errors/warnings
- [ ] PR description is clear
- [ ] Commits are atomic and well-described
- [ ] Documentation updated
- [ ] No hardcoded credentials/API keys
- [ ] No large console.log() statements

---

## Questions?

- Check existing PRs for examples
- Ask in team chat
- Create an issue for discussion

Thank you for contributing! 🚀

**Last Updated**: April 23, 2026