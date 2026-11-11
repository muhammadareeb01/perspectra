# Restore UI (pre clean-ui pass)

If you want **exactly the UI from before** the clean/responsive pass, copy these files back over the project root paths:

| Backup file | Restore to |
|-------------|------------|
| `globals.css` | `app/globals.css` |
| `HeroCarousel.tsx` | `components/HeroCarousel.tsx` |
| `Header.tsx` | `components/Header.tsx` |
| `SiteChrome.tsx` | `components/SiteChrome.tsx` |
| `HomeClient.tsx` | `components/HomeClient.tsx` |
| `StoryCard.tsx` | `components/StoryCard.tsx` |
| `LiveWireSection.tsx` | `components/LiveWireSection.tsx` |
| `Footer.tsx` | `components/Footer.tsx` |

PowerShell:

```powershell
$src = "D:\erasmuss\tint\.backup\pre-clean-ui"
Copy-Item "$src\globals.css" "D:\erasmuss\tint\app\globals.css" -Force
Copy-Item "$src\HeroCarousel.tsx" "D:\erasmuss\tint\components\HeroCarousel.tsx" -Force
Copy-Item "$src\Header.tsx" "D:\erasmuss\tint\components\Header.tsx" -Force
Copy-Item "$src\SiteChrome.tsx" "D:\erasmuss\tint\components\SiteChrome.tsx" -Force
Copy-Item "$src\HomeClient.tsx" "D:\erasmuss\tint\components\HomeClient.tsx" -Force
Copy-Item "$src\StoryCard.tsx" "D:\erasmuss\tint\components\StoryCard.tsx" -Force
Copy-Item "$src\LiveWireSection.tsx" "D:\erasmuss\tint\components\LiveWireSection.tsx" -Force
Copy-Item "$src\Footer.tsx" "D:\erasmuss\tint\components\Footer.tsx" -Force
```

Or ask the agent: **“revert clean UI”** — it should restore from this folder.
