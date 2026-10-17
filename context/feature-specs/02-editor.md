We need the base Chrome components that frame every editor screen: the top navbar and the left sidebar shell. These will be reused and extended in every chapter that follows. 

### Editor Navbar

Create `components/editor/editor-navbar.tsx`

Requirements:

- Fixed-height top navbar 
- left, centre, and right sections 
- The left section contains the sideboard toggle button. 
- use `PanelLeftOpen/PanelLeftClose icons based on sidebar state
- The right section stays empty for now. 
- Dark background with subtle bottom border 

### Project Sidebar

Create `components/editor/project-sidebar.tsx`.

Requirements:

- Sideboard should float above the editor canvas. 
- Opening it should not push page content. 
- Slides in from the left. 
- accepts `isOpen` prop. 
- Header with `Projects` title + close button
- Shapecn `Tabs`;
  - My projects 
  - Shared 
- Both tabs show an empty placeholder state. 
- Full-width `New Project` button at the bottom with a `plus` icon 

### Dialog Pattern

Use the existing color tokens from `globals.css` for dialog styling.

Support:

- Title 
- Description 
- Footer actions 

Do not build actual dialogues yet.

### Check when done

- New components compile without TypeScript errors. 
- No lint errors. 
- Dialogue pattern is ready for future use. 