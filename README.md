# Mender — Case Management Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/mender-case-management/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

Runnable responsive HTML/CSS/JavaScript reconstruction of the uploaded **13.13-second** screen recording (720 × 1280, 30 fps).

## Run
1. Extract `mender-case-management.zip`.
2. Open `index.html` in Chrome, Firefox, Safari or Edge.
3. Use the top tabs **Cases**, **Journeys**, and **Insights**.
4. In Cases, select **＋ New case**, enter a case name and client, set a budget and open the case.
5. Search/filter/sort the case list, open a case row to see its customer journey, and try the journey actions.
6. Open Insights and export the demo report as CSV.

No npm install, build tools, API keys or backend are required.

Optional local server:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`.

## What the video shows

The recording is a dark forest-green customer support/case-management product branded **mender**.

### Cases overview (0–5s)
- A left icon rail and top tabs: Cases, Journeys, Insights.
- Case pipeline with All cases / In progress / Resolved filters and a New case action.
- Case rows show case title, client, case owner, responsible team, allocated budget and status.
- Team capacity widget with 100% indicator.
- Case progress gauges for Intake, Working and Resolved.
- Customer satisfaction indicator.

### Open a new case modal (about 1.5–4.8s)
The form visibly contains:
- Case name
- Client
- Case owner (Maya Okafor)
- Responsible team (Team Fern)
- Allocated budget
- Description
- Cancel and Open case buttons

The recording shows the case named **Checkout button frozen**, client **Pinecrest Outfitters**, owner **Maya Okafor**, responsible team **Team Fern**, and allocated budget increasing during the interaction.

### Cases overview after creation (about 5–7s)
The new case appears in the pipeline. Case status views and card-style case overview are shown.

### Customer journey (about 7–10s)
- Case title and client details.
- A row of team/customer avatars.
- Progress steps: Intake, Understand, Working, Review, Resolved.
- Next best actions, including assigning the case to an agent and confirming receipt to the client.
- Case dependencies.

### Support insights (about 10–12s)
- Resolved cases, average response time, customer satisfaction and active case summary cards.
- Operational overview line chart.
- Workload ranking bars.
- Case type mix donut chart.

The video then returns to Cases overview.

## Source extraction accuracy

The video does not show a readable source-code editor. It shows the running dashboard and its interactions. Accordingly, this project reconstructs the visible UI and behavior; it does not claim to extract original source files. The names, labels and form fields above are based on visible screen content. Some list entries and metric values not fully legible in the video are representative demo data.

## Included interactions
- Cases / Journeys / Insights navigation.
- Search, filter and sort case list.
- Open a new case modal with validation.
- New cases are inserted into the local case list.
- Open a case row to view its customer journey.
- Customer journey actions and dependency dialog.
- Support insights charts and workload visualizations.
- Export a demo support-insights CSV.
- Notifications and help panels.
- Responsive desktop and mobile layout.

## Files
- `index.html` — dashboard shell and three main views.
- `styles.css` — dark green theme, case rows, modal, charts and responsive styling.
- `app.js` — demo case data, navigation, form handling, filters, journey actions and charts.
- `README.md` — video observations and run instructions.

## Limitations
Frontend-only demo. Cases, budgets, team members, statuses, customer details and insight metrics are local illustrative data. Changes are not saved to a server or database. There is no authentication, customer messaging integration, workflow engine, analytics backend or live team capacity calculation.

## 👨‍💻 Author

**mrchandrayee** · [GitHub](https://github.com/mrchandrayee)

## 📄 License

[MIT License](./LICENSE)
