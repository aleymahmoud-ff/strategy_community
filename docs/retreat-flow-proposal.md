# Strategy Retreat — Proposed Application Flow

**Status:** Discussion draft — not approved, nothing built yet
**Prepared for:** The Strategy Community team
**Source material:** `2026_Retreat_02_Workbook.xlsx` (15 sheets) + the current application

---

## Why this document exists

The application today runs **Strategy Meetups**: one date, one venue, invite members, seat
them, scan a QR code, mark attendance.

The **Strategy Retreat** is a different machine. Three full days, invite-only and selective,
paid, with a long acquisition funnel running across email and WhatsApp, audiences who are not
community members yet, speakers with fees and hotel nights, sponsors and partners, a
multi-track agenda, rooming and transport, physical production, and a budget.

Trying to create a retreat through the current "Create Event" form would lose almost all of
that. The retreat is not an event record — it is a **project with an event at the end of it**.

We are proposing changes that serve two objectives:

1. **For community managers** — one place to run the retreat and track what actually needs
   tracking, instead of fifteen spreadsheet tabs and a WhatsApp thread.
2. **For members** — a real experience inside the application. Member accounts, self-service
   registration, a personal program — not just a public link and a form.

This is a long process. Nothing here has to be built at once. **Each item has an ID.** Read
it, argue with it, and come back with `Apply now` / `Later` / `Skip` per item. The decision
sheet at the end is the thing to fill in.

---

## 1. What we are working from

Every sheet in the workbook is a live workstream. This is the honest inventory:

| Sheet | What it really is |
| --- | --- |
| `Actions` | Task tracker — task, owner, due date, comments |
| `COMMUNICATION PLAN` | A three-phase funnel: outreach → invitation to registrants → payment by JRNY |
| `MESSAGES` | The message templates per audience and stage, with `[Name]` merge fields |
| `Speakers` | Speaker pipeline **and commercials** — status, assignee, next action, fee, nights, room type, transport, discounts, sponsorship packages, paying-attendee counts |
| `Contents` | Speaker bios and the five content pillars of the retreat |
| `Partners` | Vendors and partners — roster, owner, status |
| `POTENTIAL SPONSORS` | Sponsor pipeline with contacts and status |
| `Agenda` | Three days in 30-minute slots, with parallel tracks, meals, travel, prayer, night experiences |
| `Branding Elements` | Physical production checklist — item, quantity, status, action, plus media costs |
| `ASSETS` | Collateral status: registration form, proposal PDF, video, delegates form |
| `Guests` | International guests (KSA / UAE / Bahrain) referred through Strategy Inc. |
| `B2B` | Corporate hit-list for group bookings — company, title, name, mobile |
| `Reachout List` | Company-level reach-out with invitee counts, plus people to ask for referrals |
| `Linkedin -Strategy Heads` | Cold LinkedIn outreach to strategy heads, with per-person status |
| `0` | The community email list |

Four of those sheets (`Guests`, `B2B`, `Reachout List`, `Linkedin -Strategy Heads`) are the
same thing viewed four ways: **people we want in the room, at different stages, from
different sources.** That is one pipeline, not four lists.

---

## 2. The proposal in one line

> Add a **Retreat** to the application as its own workspace — a project, not an event — with
> two surfaces on top of it: an **Ops Console** for the team, and a **Member Space** for
> members.

Meetups keep working exactly as they do today. Nothing about the existing Events section
changes.

---

## Part A — The Ops Console (community managers)

One retreat, one workspace, tabs across the top. Each module below replaces a workbook sheet
or a manual habit.

### A1 · Retreat workspace

The container everything hangs off. Name and edition, **start and end date** (the current
event model only has a single date), venue, capacity, status, price tiers (individual /
group / community discount), and target revenue.

Created through a short wizard rather than one long form: basics → commercials → agenda
skeleton → owners.

### A2 · Invitation pipeline — *the heart of it*

Replaces `Guests`, `B2B`, `Reachout List`, `Linkedin -Strategy Heads`.

One row per person we want in the room, moving through explicit stages:

```
LONGLIST → INVITED → ENGAGED → REGISTERED → PROPOSAL SENT → CONFIRMED
         → PAYMENT PENDING → PAID → DELEGATE FORM DONE → ATTENDED
                    (DECLINED / DROPPED at any point)
```

Each row carries:

- **Source** — community database, referral (and who referred), corporate B2B, LinkedIn
  outreach, partner
- **Batch** — invitation waves. The app already scores members on level, experience and
  communication; that score can propose Batch 1 automatically instead of filtering by hand
- **Owner** and **next action** — so nothing sits unassigned
- **Touch log** — every email, WhatsApp and call, with the date
- **Company grouping** — so *"Elabd — confirmed — 3 attendees"* works as a group booking,
  the way the reach-out sheet already treats it

This module alone answers "where do we stand?" without opening a spreadsheet.

### A3 · Communication plan and message log

Replaces `COMMUNICATION PLAN` and `MESSAGES`.

The three phases become real objects. Each step is an activity + a channel (email /
WhatsApp) + a **target segment defined as a filter on the pipeline** — "registered but not
confirmed", "invited and never opened" — plus the stored template with merge fields.

Proposed for the first version: the app **builds the recipient list and the personalized
message text, and logs what was sent**. It does not send email or WhatsApp itself. WhatsApp
is manual today anyway, and this keeps the first release small. Automated sending is a later
decision (see Q3).

### A4 · Speakers

Replaces `Speakers` and the bios in `Contents`.

Status (confirmed / interested / pending / out / no response), assignee, next action, bio and
photo — and the commercial side: engagement type (one-day invitation, community discount,
paid fee), number of nights, room type, transport, cost, and which agenda sessions they are
on.

### A5 · Sponsors and partners

Replaces `POTENTIAL SPONSORS` and `Partners`. Pipeline, package, amount, contacts, status,
owner — the same shape as A2 but for organizations.

### A6 · Agenda builder

Replaces `Agenda`. Day-by-day grid in 30-minute slots with **parallel tracks**, because the
program has four parallel expert sessions, four parallel business cases, and two levels of
vibe coding. Each block has a type (session, meal, break, travel, prayer, night experience),
an optional speaker, a room, and a capacity.

Capacity per track matters: it is what lets members choose a track (B6) without overfilling
a room.

### A7 · Logistics

Rooming (single or shared, nights, roommate), transport groups (bus, Cairo departure), and
**check-in per day** — a three-day retreat cannot be tracked with a single "attended" flag.
The QR code and scanner already in the app get reused for this.

### A8 · Production checklist

Replaces `Branding Elements`. Item, quantity, status (we have it / to be purchased / to be
rented), owner, cost — feeding into A9.

### A9 · Budget

Revenue lines (tickets, sponsorship) against cost lines (speaker fees and nights, media,
branding, logistics), pulled automatically from A4, A5 and A8. This is the module most
reasonable to leave in Excel — see Q4.

### A10 · Tasks

Replaces `Actions`. Task, owner, due date, status, comments, filtered to the retreat.

### A11 · Assets

Replaces `ASSETS`. Registration form, proposal PDF, retreat video, delegates form — link plus
status, so "to be done" is visible to everyone.

---

## Part B — The Member Space (members)

This is the part that changes the member's experience rather than the manager's. Today a
member's only contact with the system is a public link and a form. The proposal is that
members get an account and a place of their own.

### B1 · Member accounts

Members already exist in the database as records. This gives those records a **login**.

Recommended: **no passwords.** A member enters their email (or phone) and receives a one-time
code. Two entry paths:

- **Claim your profile** — the member is already in the community database; the code proves
  it is them
- **New sign-up** — someone who found us through the retreat; they land in the pipeline
  (A2) as a new lead with source "self sign-up", pending review

Staff logins and member logins stay completely separate systems. See C3.

### B2 · Self-service profile

The member keeps their own data current — title, company, LinkedIn, photo, phone. One of the
open actions in the workbook is literally *"fill community missing data"*; this turns a
chasing task into something members do themselves.

### B3 · The retreat, inside the app

Instead of a public link to a PDF: the proposal, the speakers and their bios, the content
pillars, the agenda, the venue and the price — as a page in the app. With one button:
**express interest**, or **register**.

The public landing page still exists for people with no account. Both routes feed the same
pipeline.

### B4 · "Where do I stand?"

A member sees their own status: registered → confirmed → payment → delegates form → ready.
Each step tells them what is needed from them next.

This is the single biggest reduction in follow-up load for the team. Most of the WhatsApp
chasing in Phase 2 of the communication plan exists because the member has no way to see
their own state.

### B5 · Delegates form, in-app

Rooming preference, roommate, transport, dietary needs, arrival time — filled by the member,
visible instantly in A7, no separate form to reconcile.

### B6 · Build my program

The member picks which of the parallel expert sessions and business cases they will attend,
and gets a personal three-day schedule.

For the team, this produces **track capacity in advance** — how many people in each of the
four parallel rooms — which is currently unknowable until the day.

### B7 · Digital badge and daily check-in

The member's QR code lives in the app. Scanned at arrival each day. The QR infrastructure is
already built for meetups.

### B8 · Attendee directory and networking

Opt-in. Who else is coming, what they do, and — reusing the seating plan already in the app —
who is at my table. Optionally: request an introduction.

This is the reason many people come to a retreat, and it is currently invisible to them.

### B9 · Live during the retreat

Today's schedule, what is next, room changes, announcements. A retreat has enough moving
parts over three days that a printed agenda goes stale by lunch on day one.

### B10 · After the retreat

Session materials, photos, the feedback survey, the manifesto output, and the connections
made. This is what turns a three-day event into a reason to come back next year.

### B11 · Refer a peer

The workbook has a referrals message template and a list of people to ask for referrals — all
manual. A member referring someone from their own account drops that person straight into the
pipeline with the referrer recorded.

### B12 · Meetups too, or retreat only?

The same account could show meetup invitations and RSVPs, not just the retreat. That is a
scope decision, not a technical one — see Q5.

---

## Part C — Foundations

These are not features. They are the decisions everything else rests on.

### C1 · Retreats sit beside events, not inside them

`Event` stays exactly as it is for meetups. `Retreat` is a separate model. Adding a
"type" flag to events would drag multi-day dates, money, speakers and agendas into the
meetup flow and make both worse.

### C2 · One people registry

Members, retreat registrants, B2B contacts and LinkedIn leads all live in the **same**
`Member` table — with new fields for `source` and `country` (the guest list spans Egypt, KSA,
UAE and Bahrain, and we currently have nowhere to put that).

One directory means a retreat registrant can graduate into the community, and a member's
profile shows their whole history — meetups and retreats together. A second people table
would guarantee duplicates.

### C3 · Two separate login systems

Staff accounts (admin / user / viewer) and member accounts are **different realms** with
different sessions and different permissions. A member must never be able to reach the ops
console, pipeline notes, costs, or another member's phone number.

Security review is required before this ships.

### C4 · Privacy

The attendee directory is **opt-in**. We need an explicit decision on what one member can see
about another: name, title, company, photo — yes; phone and email — only if that member chose
to share. Internal fields (score, membership type, pipeline notes, guest status) are never
member-visible.

### C5 · Payment

Assumption: **JRNY handles the money.** The app records payment status and stores the payment
link; it does not process payments. Confirm in Q2.

---

## Part D — Suggested sequence

The dates in the workbook are the constraint. Phase 1 is scoped to what unblocks the
September retreat, including the landing page and the forms already sitting on the action
list.

| Phase | Contents | Unlocks |
| --- | --- | --- |
| **1** | A1 workspace, A2 pipeline, A3 comms, A10 tasks, A11 assets, B1 accounts, B3 retreat page, B4 status | Running the retreat out of the app instead of the workbook, and the landing page + registration form that are already due |
| **2** | A4 speakers, A5 sponsors, B2 profile, B5 delegates form, B11 referrals | Closing the commercial side and killing the manual forms |
| **3** | A6 agenda, A7 logistics, B6 my program, B7 badge and daily check-in, B9 live view | The on-site experience |
| **4** | A8 production, A9 budget, B8 directory, B10 after the retreat, funnel analytics | Everything measurable, and the reason to come back |

---

## Part E — Questions for the team

These change what gets built. We need answers before Phase 1 starts.

**Q1 · Do members get accounts at all, or is the retreat public-link only this year?**
Recommendation: accounts, but only the thin version in Phase 1 (login, retreat page, my
status). Everything else in the Member Space can wait.

**Q2 · Payments.** Confirmed that JRNY handles the money and the app only tracks status?
If we ever want to take payment in-app, that is a much larger security and compliance
conversation.

**Q3 · Does the app send messages, or only prepare them?**
Recommendation: prepare only, for now. Generating lists and personalized text saves most of
the effort; sending introduces email deliverability and WhatsApp Business API work.

**Q4 · Does the budget go into the app, or stay in Excel?**
Speaker fees, discounts and sponsorship figures are sensitive. Recommendation: keep the
budget in Excel for this edition, but hold speaker *cost* in A4 so we are not re-typing it.

**Q5 · Is the Member Space retreat-only, or the whole community?**
Retreat-only is faster. Community-wide is the better long-term answer and matches the
"community website experience" item already on the action list.

**Q6 · Non-member leads — same table as members?**
Recommendation: yes, one registry with a source field. Confirm nobody objects to B2B and
LinkedIn contacts sitting alongside community members.

**Q7 · What can members see about each other?**
Needs an explicit answer before the directory is built.

**Q8 · Who owns data entry once this exists?**
The tool only helps if the pipeline is the source of truth. If half the team keeps updating
the workbook, we end up maintaining both.

---

## Decision sheet

Fill the last column with `Apply now` / `Later` / `Skip`, and bring it back.

| ID | Item | Replaces | Proposed phase | Decision |
| --- | --- | --- | --- | --- |
| A1 | Retreat workspace | — | 1 | |
| A2 | Invitation pipeline | Guests, B2B, Reachout, LinkedIn | 1 | |
| A3 | Communication plan & message log | COMMUNICATION PLAN, MESSAGES | 1 | |
| A4 | Speakers | Speakers, Contents | 2 | |
| A5 | Sponsors & partners | POTENTIAL SPONSORS, Partners | 2 | |
| A6 | Agenda builder | Agenda | 3 | |
| A7 | Logistics & daily check-in | — | 3 | |
| A8 | Production checklist | Branding Elements | 4 | |
| A9 | Budget | — | 4 | |
| A10 | Tasks | Actions | 1 | |
| A11 | Assets | ASSETS | 1 | |
| B1 | Member accounts | — | 1 | |
| B2 | Self-service profile | "fill missing data" task | 2 | |
| B3 | Retreat page in-app | Public link + PDF | 1 | |
| B4 | My status tracker | Phase 2 WhatsApp chasing | 1 | |
| B5 | Delegates form in-app | Delegates form | 2 | |
| B6 | Build my program | — | 3 | |
| B7 | Digital badge & daily check-in | — | 3 | |
| B8 | Attendee directory & networking | — | 4 | |
| B9 | Live during the retreat | Printed agenda | 3 | |
| B10 | After the retreat | — | 4 | |
| B11 | Refer a peer | Referral messages | 2 | |
| B12 | Member Space covers meetups too | — | scope | |
| C2 | One people registry (+ source, country) | — | 1 | |
| C3 | Separate member / staff logins | — | 1 | |
| C4 | Member privacy rules | — | 1 | |
| C5 | Payment tracked, not processed | — | 1 | |

---

*Once the decisions come back, the next step is the database schema and the Phase 1 build.*
