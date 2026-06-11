# builderk.com — CRITICAL CONTEXT (read before doing ANYTHING)

This file is for any AI session or person working on this site — especially sessions
on Richard's machine collaborating with Kevin Gallopp (app.builderk.com / builderk-os).

## CRITICAL CONTEXT

- The ONE source of truth for this website is the GitHub repo:
  **https://github.com/kevingallopp/builderk-website** (branch: `main`)
- On **June 10–11, 2026** the live site (builderk.com) was accidentally **overwritten
  with a stale local copy** (~a month out of date) because it was deployed straight
  from Richard's machine using the Vercel CLI. That wiped a full day of updates until
  it was restored from GitHub.
- Richard's own recent work (the `/intranet` hub + campaign calendar/checklist pages)
  has ALREADY been recovered and committed to GitHub `main` (commit `f4825fa`), so it
  is safe. He gets it back automatically when he syncs. He has nothing to lose by
  re-cloning.

## THE ONE RULE

**Never publish by deploying a local folder. Publishing happens ONLY through GitHub.**
Always pull the latest from GitHub before you start, and push your work back to GitHub
when done. If you are ever unsure whether your copy is current, re-clone fresh.

## YOUR TASKS (any new session on Richard's machine)

1. Do **NOT** run `vercel`, `vercel --prod`, `vercel deploy`, or any direct deploy
   command. Deploying from this machine is exactly what broke the live site.

2. Work only from a current clone. Safest is a fresh clone into a new folder:

   ```
   git clone https://github.com/kevingallopp/builderk-website.git builderk-website-current
   ```

   Use that folder and abandon any older copy. (Richard's machine: the current folder
   is `~/builderk-website-current`; the old `~/builderk-website` is deprecated.)
   If you must reuse an old folder: first run `git status` and copy any local-only
   files somewhere safe, THEN `git fetch origin && git reset --hard origin/main`.
   That command erases local changes — back them up first.

3. Verify the clone is the real current site by confirming these exist:
   `contact.html`, `process.html`, `service-areas.html`, `intranet.html`,
   `videos/construction/` (has .mp4 files), `images/projects/jobsite/` (~56 .jpg).
   If any are missing, STOP and tell Richard the sync failed.

## HOW TO PUBLISH

- Edit only inside the fresh, up-to-date folder.
- Publish by pushing to GitHub:

  ```
  git add -A && git commit -m "describe the change" && git push origin main
  ```

  (For bigger changes, open a pull request so Kevin can review first.)
- That is the **entire** publish process. Never deploy a local folder to Vercel.

## Site notes

- Static HTML site on Vercel (project `builderk-website`, team kevin-7757s-projects);
  `vercel.json` has `cleanUrls: true` → `/intranet` serves `intranet.html`,
  `/intranet/camp` serves `intranet/camp.html`, etc.
- Internal pages (`noindex`): `/intranet` (plans hub), `/intranet/camp` (marketing
  campaign plan), `/intranet/camp-calendar` (printable calendar), `/intranet/calendar`
  (interactive team checklist — backend lives in builderk-os:
  `app.builderk.com/api/campaign-checklist` + Friday report cron).
- Brand: BuilderK Orange `#F77F00`, Black `#0A0A0A`, fonts Outfit + DM Sans.
