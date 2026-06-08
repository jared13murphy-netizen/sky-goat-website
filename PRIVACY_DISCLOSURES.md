# App Store Connect Privacy Disclosures — Cheat Sheet

This is exactly what to click in App Store Connect → Sky Goat →
**App Privacy → Data Types**. Apple's questionnaire walks you through
each data type with yes/no questions. Use this as your source of truth.

When in doubt, **err on the side of disclosing** — Apple is much
harsher on under-disclosure than over-disclosure.

---

## Contact Info

### Email Address
- **Collect this data?** ✅ Yes
- **Linked to user?** ✅ Yes (when a user emails hello@sky-goat.com, that creates a record we can tie to them)
- **Used for tracking?** ❌ No
- **Purpose:** "App Functionality" (specifically: support communication)

*Note: this is only triggered by users emailing us directly. We don't collect emails in-app.*

---

## Identifiers

### Device ID
- **Collect this data?** ✅ Yes (Google AdMob uses the IDFA when ATT is granted)
- **Linked to user?** ❌ No
- **Used for tracking?** ✅ Yes (this is the entire point of ATT)
- **Purpose:** "Third-Party Advertising"

*This is the data point that triggers the ATT prompt on first launch.*

---

## Usage Data

### Product Interaction
- **Collect this data?** ✅ Yes (AdMob tracks ad impressions + taps)
- **Linked to user?** ❌ No
- **Used for tracking?** ✅ Yes
- **Purpose:** "Third-Party Advertising"

### Advertising Data
- **Collect this data?** ✅ Yes
- **Linked to user?** ❌ No
- **Used for tracking?** ✅ Yes
- **Purpose:** "Third-Party Advertising"

---

## Diagnostics

### Crash Data
- **Collect this data?** ❌ No

*We don't have crash analytics wired up. Add this disclosure when you add Sentry / Crashlytics.*

### Performance Data
- **Collect this data?** ❌ No

### Other Diagnostic Data
- **Collect this data?** ❌ No

---

## Data NOT collected (just so you know)

These are tempting to over-disclose. Don't.

- ❌ **Location** — we don't currently use location at all. The map shows where the *plane* is, not where the *user* is. (When we add user-location overlay later, this changes to a "Precise Location, App Functionality" disclosure.)
- ❌ **Health & Fitness** — no.
- ❌ **Financial Info** — no IAP in V1.
- ❌ **Contacts** — no.
- ❌ **User Content** — no photos or text in V1. (When Phase 2 of accounts ships, this becomes "Photos or Videos, App Functionality, Linked to user".)
- ❌ **Search History** — no.
- ❌ **Browsing History** — no.
- ❌ **Sensitive Info** — no.

---

## Third-Party Services Summary

This is the section that Apple's reviewer will check most carefully.
Disclose these in your **Privacy Policy** (we already do), and make
sure the App Store Connect "Third Parties" matches:

| Third-Party SDK / Service | What they get | Disclosed? |
|---|---|---|
| **Google AdMob** | IDFA (if ATT allowed) + ad impressions/clicks | ✅ Yes — Device ID + Product Interaction + Advertising Data |
| **FlightAware AeroAPI** | Device IP + flight numbers searched | ✅ Disclosed in privacy policy, not a Connect disclosure (server-to-server HTTPS, no SDK) |
| **ESPN public scoreboard** | Device IP | ✅ Disclosed in policy |
| **NWS** | Device IP | ✅ Disclosed in policy |
| **ArcGIS World Imagery** | Device IP | ✅ Disclosed in policy |
| **Ground Goat API** | Device IP | ✅ Disclosed in policy |

The "Third Parties" section in App Store Connect only requires
disclosure for SDKs in your app binary (which is just AdMob).
Pure HTTPS calls to public APIs aren't Connect disclosures —
they're privacy-policy disclosures only.

---

## App Tracking Transparency (ATT) verbiage

Apple wants the exact prompt text disclosed. It's already in `app.json`:

> "Sky Goat shows occasional in-flight ads to help keep the app
> free. Allowing tracking helps us show ones that are actually
> relevant to you. Your activity is never sold to advertisers."

This is what will appear on the system dialog. No App Store Connect
field needs it; just make sure your privacy policy quotes the same
language so a reviewer can verify they match.

---

## When privacy disclosures need to be updated

You'll have to revisit App Store Connect privacy disclosures when
you:

1. Add user accounts (Phase 1 of accounts plan) → adds "Email
   Address, Linked, App Functionality" and "User ID, Linked,
   App Functionality"
2. Add photo posting (Phase 2) → adds "Photos or Videos, Linked,
   App Functionality"
3. Add crash analytics (Sentry / Crashlytics) → adds "Crash Data"
4. Add location overlay → adds "Precise Location, App Functionality"
5. Add subscriptions → adds "Purchase History"

Each one is an App Store metadata-only change — no rebuild required.
