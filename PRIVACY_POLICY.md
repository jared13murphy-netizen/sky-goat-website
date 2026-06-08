# Sky Goat Privacy Policy

**Effective:** 2026-06-08
**Last updated:** 2026-06-08
**Contact:** hello@sky-goat.com

This is the version we'll publish at sky-goat.com/privacy. Written
to be human-readable AND legally sufficient for the App Store
Connect privacy disclosure.

---

## The short version

Sky Goat doesn't require an account, and we don't collect anything about you that you don't actively give us. Your flight history lives on your iPhone, not on our servers. We show ads via Google AdMob — if you opt in to tracking, those ads can be more relevant; if you opt out, you still see ads, just less targeted. We use third-party APIs (FlightAware AeroAPI, ESPN, NWS, ArcGIS) to power features, and those services have their own privacy practices.

That's it. No newsletter signup. No abandoned-cart emails. No selling your data, because we don't have your data.

---

## What Sky Goat collects, in detail

### Stored on your device only — never sent to us:

- **Your flight history.** Routes you've watched, miles flown, points of interest you've seen. Stored in iOS AsyncStorage. We don't have access to it. Deleting the app deletes it.
- **Your preferences.** Category filters, settings choices. Stored locally.
- **Your boarding pass scan results.** The PDF417 barcode is decoded entirely on-device by iOS's camera APIs; we never see the raw image or extracted data.

### Sent to us — only with your explicit interaction:

- **Email** (only if you write to hello@sky-goat.com or contact support). We use it to reply. We don't add it to a list.

### Third-party APIs we call on your behalf:

When you open Sky Goat or start a flight, the app makes HTTPS requests to:

- **FlightAware AeroAPI** (flightaware.com) — flight position, filed routes, ETAs. They see the flight number you're tracking and your device's IP address.
- **ESPN public scoreboard** — sports scores for "your team has a game tonight" cards. They see your device's IP.
- **NWS (National Weather Service)** — weather at your destination. They see your device's IP.
- **ArcGIS World Imagery** — satellite tiles for the postcard hero image. They see your device's IP.
- **Ground Goat API** (practical-serenity-production.up.railway.app) — active land listings near your flight path. They see your device's IP. Operated by Ground Goat, the same company that makes Sky Goat. [See Ground Goat's privacy policy.](https://groundgoat.com/privacy)

We don't proxy these requests; your phone talks to them directly. We don't see what they return.

### Google AdMob ads

Sky Goat displays occasional native ads in the Goat Feed via Google AdMob. AdMob shows ads regardless of your tracking choice, but it serves them differently based on what you choose:

- **You allow tracking** (the iOS App Tracking Transparency prompt that pops up on first launch): AdMob uses your Apple IDFA to show more relevant ads. They may share data with advertisers.
- **You decline tracking:** AdMob still shows ads, but they're non-personalized — basically anonymous. No IDFA shared.

You can change this any time in **Settings → Sky Goat → Allow Tracking**.

[Google's privacy policy](https://policies.google.com/privacy) covers AdMob in detail.

---

## What we don't do

- We don't have user accounts in V1. There's nothing for us to hack.
- We don't track your location in the background. (We may ask for location permission later to improve "where am I right now" calls, but it'll only run while the app is open and on a flight.)
- We don't sell, lease, or trade your information to anyone. There's nothing to sell.
- We don't send marketing emails. We can't — we don't have your email.
- We don't use cookies. This is an iOS app, not a website.
- We don't have analytics on what you tap. The flight history that exists is for YOUR use (showing you your past flights), not ours.

---

## Children

Sky Goat is rated 4+ and is suitable for all ages. We don't knowingly collect personal information from anyone, including children under 13. If you're a parent and believe your child has somehow sent us information (probably by writing to hello@sky-goat.com), email us and we'll delete it.

---

## Your rights

Because we don't have user accounts in V1, there's nothing in our systems tied to you. If you want every trace of yourself removed from Sky Goat, delete the app — that removes all the local data. If you've emailed us, you can email us again asking us to delete the conversation, and we will.

When we add user accounts in a future release, this section will expand to cover account deletion, data export, and the rights granted under California Consumer Privacy Act, GDPR, etc. Until then, those rights are essentially moot because the data doesn't exist.

---

## Changes to this policy

If we change anything material, we'll update the "Last updated" date at the top, post the change at sky-goat.com/privacy, and (for changes that affect existing users meaningfully) surface it in the app the next time you open it.

---

## Contact

Privacy questions, complaints, requests, takedowns:

📧 **hello@sky-goat.com**

📍 Ground Goat, the company behind Sky Goat, is registered in Illinois, USA.

---

*Sky Goat is made by the team behind Ground Goat. Both apps are independent of FlightAware, ESPN, NWS, ArcGIS, and the airlines whose flights they track.*
