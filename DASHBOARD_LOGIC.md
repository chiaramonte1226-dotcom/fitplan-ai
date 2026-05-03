# Dashboard FitPlan AI

## Audit

- L'ancien dashboard etait clair mais encore trop proche d'un resume.
- Le score et les blocs secondaires prenaient trop de place avant la decision.
- Les donnees Garmin, defis et courses etaient utiles, mais pas assez conditionnees par l'action immediate.

## Nouvelle hierarchie

1. Carte coach principale
2. Carte "Ta prochaine action"
3. Objectif du jour simplifie
4. Calories et proteines restantes
5. Score journalier non culpabilisant
6. Actions rapides 2x3
7. Progression courte et sections secondaires

## Logique de decision

La fonction `getNextBestAction(userContext)` vit dans `lib/dashboard.ts`.

Priorites:

1. check-in si aucun check-in
2. ajouter repas si repas manquant
3. proteines si deficit important
4. mouvement si aucune activite
5. adaptation si ecart important
6. defi si action non validee
7. bilan si fin de journee

La fonction retourne:

```ts
{
  title,
  message,
  primaryButtonLabel,
  actionType,
  priority,
  reason,
  href
}
```

## Composants

- `CoachCard`
- `NextBestActionCard`
- `DailyGoalCard`
- `MacroSummaryCard`
- `ScoreCard`
- `QuickActionsGrid`
- `ChallengeTodayCard`
- `ShoppingReminderCard`
- `AchievementProgressCard`

Objectif: quand l'utilisateur ouvre l'app, il sait exactement quoi faire maintenant.
