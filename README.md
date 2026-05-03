# FitPlan AI

Application web mobile-first de nutrition et fitness. FitPlan AI aide l'utilisateur a savoir quoi manger, quoi faire et rester regulier sans surcharge mentale.

FitPlan AI est une application bien-etre non medicale. Les recommandations, calories, macros et analyses photo sont des estimations indicatives a valider par l'utilisateur.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Supabase Auth, Database et Storage
- OpenAI API pour coach, programmes, courses et analyse photo

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Renseigner ensuite:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
GARMIN_CLIENT_ID=
GARMIN_CLIENT_SECRET=
GARMIN_REDIRECT_URI=http://localhost:3002/api/garmin/callback
GARMIN_SYNC_SECRET=
GARMIN_WEBHOOK_SECRET=
GARMIN_ACTIVITIES_PATH=/wellness-api/rest/backfill/activities
```

## Supabase

1. Creer un projet Supabase.
2. Executer `supabase/schema.sql` dans le SQL editor.
3. Creer un bucket Storage pour les photos de repas, par exemple `meal-photos`.
4. Activer Email Auth dans Supabase.

Tables incluses:

- `profiles`
- `meals`
- `meal_photos`
- `scores`
- `coach_messages`
- `challenges`
- `user_challenges`
- `badges`
- `user_badges`
- `xp_logs`
- `levels`
- `shopping_lists`
- `shopping_items`
- `product_prices`
- `progress_measurements`
- `garmin_oauth_states`
- `garmin_connections`
- `garmin_activities`
- `garmin_sync_runs`
- `garmin_webhook_events`

## Routes API

- `POST /api/coach` : reponse conversationnelle et prochaine action.
- `POST /api/photo-analysis` : analyse photo repas via OpenAI Vision.
- `POST /api/program` : programme alimentaire.
- `POST /api/score` : score journalier.
- `GET /api/challenges` : defis gratuits et premium.
- `POST /api/shopping` : liste de courses intelligente.
- `GET /api/shopping/export` : export checklist texte pret a remplacer par PDF.
- `GET /api/progress` : recupere les mesures de progression de l'utilisateur connecte.
- `POST /api/progress` : ajoute ou met a jour une mesure journaliere et rafraichit le graphique cote client.
- `GET /api/garmin/connect` : demarre OAuth 2.0 Garmin avec PKCE.
- `GET /api/garmin/callback` : echange le code Garmin, stocke les tokens et lance une premiere sync.
- `POST /api/garmin/sync` : synchronisation recurrente des activites Garmin. Proteger avec `x-cron-secret`.
- `POST /api/garmin/webhook` : reception des notifications Push/Ping Garmin si activees dans le portail developpeur.

## Garmin

Garmin Connect Developer Program necessite un acces approuve cote Garmin. L'integration utilise OAuth 2.0 + PKCE, puis les appels API avec `Authorization: Bearer <access_token>`.

Configuration locale:

1. Declarer `GARMIN_CLIENT_ID`, `GARMIN_CLIENT_SECRET` et `GARMIN_REDIRECT_URI`.
2. Ajouter l'URL de callback dans Garmin Developer Portal: `http://localhost:3002/api/garmin/callback`.
3. Executer le schema Supabase mis a jour.
4. Ouvrir `/profil` et cliquer sur `Connecter Garmin`.

Synchronisation recurrente:

```bash
curl -X POST http://localhost:3002/api/garmin/sync \
  -H "x-cron-secret: $GARMIN_SYNC_SECRET" \
  -H "content-type: application/json" \
  -d "{}"
```

Webhook Garmin:

Configurer dans le portail Garmin l'endpoint:

```bash
https://votre-domaine.com/api/garmin/webhook
```

Les activites sont stockees dans `garmin_activities` avec type, duree, calories, frequence cardiaque moyenne/max, distance et intensite estimee. Le coach IA les recoit via `buildCoachContext(userId)` pour ajuster les recommandations, par exemple apres une seance intense.

## Progression

La page `/profil` contient un tableau de progression mobile-first:

- indicateurs selectionnables: poids, tour de taille, hanches, masse grasse
- periodes: 7 jours, 30 jours, 90 jours
- graphique SVG responsive sans dependance lourde
- annotations positives, par exemple objectif intermediaire atteint
- formulaire de saisie avec mise a jour optimiste du graphique

Les donnees sont stockees dans `progress_measurements`. Les policies RLS limitent lecture/ecriture a `auth.uid() = user_id`.

## Ecrans

- Landing page
- Auth
- Onboarding
- Dashboard
- Coach
- Scan repas
- Journal
- Programme
- Sport
- Defis
- Reussites badges/niveaux
- Courses
- Fiche magasin
- Profil
- Upgrade Premium CHF 14.90/mois

## Notes produit

- Toujours afficher `Estimation indicative` pour les chiffres nutritionnels et analyses photo.
- Ne jamais presenter FitPlan AI comme un avis medical.
- Le freemium peut etre applique en limitant les scans gratuits via `meal_photos` et `profiles.is_premium`.
- Les fonctions premium: coach avance, photo illimitee, adaptation temps reel, defis longs et personnalises IA.

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
```
