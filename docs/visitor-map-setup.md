# Visitor City Map Setup

The homepage visitor map can show city and country counts for future visits. It does not store exact GPS coordinates, visitor names, emails, or IP addresses in your database.

It cannot recover locations from people who visited before this setup was added.

## Supabase

1. Create a Supabase project.
2. Open the SQL editor in Supabase.
3. Paste and run the SQL from `docs/visitor-map-supabase.sql`.
4. Copy the project URL and legacy `anon` public key from Supabase project settings. The current map sends the key as a Bearer token, so use the legacy `anon` JWT key. Never use a `service_role` or secret key in this browser configuration.

If you already created the `visitors` table manually, run the SQL file anyway. It will add the latitude and longitude columns needed for map dots without deleting existing rows.

## GitHub Pages

Open the repository's `Settings -> Secrets and variables -> Actions` and add:

- Under **Variables -> New repository variable**: `NEXT_PUBLIC_SUPABASE_URL`, with your Supabase project URL.
- Under **Secrets -> New repository secret**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, with your legacy `anon` public key.

These locations match `.github/workflows/deploy-pages.yml`. Although stored as a GitHub secret, the anon key is included in the public browser bundle; database access is controlled by Supabase row-level security.

Then open `Actions -> Deploy website to GitHub Pages -> Run workflow`, select `main`, and run it. Wait for both build and deploy to succeed. These values are embedded at build time, so changing the settings requires a new deployment.

Visit the live homepage, then check Supabase's Table Editor for a new row in `public.visitors`. Location lookup depends on an external IP geolocation provider and may be blocked by browser settings or network restrictions.

## Local development

For local testing only, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` and restart the development server. Do not commit this file. GitHub Pages uses the repository settings above, not your local file.
