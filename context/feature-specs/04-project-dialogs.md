## Goal

Build the `/editor` home screen and add project dialogues/sidebar actions. No APA calls or persistence yet. 

## Editor Home

Reuse the existing editor layout. Do not modify the nav bar or sidebar behaviour. 

In the centre of the page, add:
- Heading: `Create a project or open an existing one`
- Description: `Start a new architecture workspace, or choose a project from the sidebar.`
- `New project` button with a `plus` icon 

Keep the layout minimal. Do not wrap this content in cards. 

Clicking `New Project` should open the Create Project dialogue 

## Dialogs

### Create Project

- Project name input 
- Live slug preview based on the name 
- Preview updates as the user types. 

### Rename Project

- Pre-filled project name input 
- Current project name shown in the description 
- Input auto-focuses. 
- Enter submits. 

### Delete Project

- Destructive confirmation only. 
- No input. 
- Confirm button uses destructive trailing. 

## Sidebar

Add project item actions:

- rename
- delete

Show actions only for owned projects. 

Hide actions for shad collaborator projects. 

On mobile:

- Tapping outside the sidebar closes it. 
- Add a backdrop scrim. 

## Implementation

Create a dedicated hook to manage:

- Dialogue state 
- Form state 
- Loading state 

Wire:

- Editor home `New Project` -> create dialogue 
- Sideboard create -> Create dialog
- Sidebar rename -> Rename dialog
- Sideboard delete -> Delete dialog

Use mock project data only. Do not add API calls or persistence. 

## Check When Done

- Sidebar actions are wired. 
- Slack preview works. 
- No TypeScript errors. 
- No lint errors. 