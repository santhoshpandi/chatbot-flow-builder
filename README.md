
# 🧩 Chatbot Flow Builder

This is a visual chatbot flow builder built with React and React Flow. It allows you to create, connect, and manage message nodes in an intuitive drag-and-drop interface.

## 👩‍💻 Developed by

- `Santhosh Pandi` -- **Live Preview** https://santhoshpandi.github.io/chatbot-flow-builder/

## 📱 Screenshots

<img width="1815" height="890" alt="image" src="https://github.com/user-attachments/assets/1a531943-4cba-454b-970d-6ea6f6fe8f4e" />
<img width="1802" height="882" alt="Screenshot (13)" src="https://github.com/user-attachments/assets/d6a88837-c877-4945-852b-dda1c1c54c98" />
<img width="1802" height="883" alt="image" src="https://github.com/user-attachments/assets/4a53407a-7739-42a2-88d6-3f19fd86edf1" />
<img width="1806" height="885" alt="image" src="https://github.com/user-attachments/assets/0f4e12d9-7211-45db-b163-fe471b9b85e6" />
<img width="1806" height="884" alt="image" src="https://github.com/user-attachments/assets/6df076ec-a9df-466d-863f-09fbbcefe5a8" />




## 🍰 Features

1. **Text Node**  
    1. Our flow builder currently supports only one type of message (i.e Text Message).  
    2. There can be multiple Text Nodes in one flow.  
    3. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.  

2. **Nodes Panel**  
    1. This panel houses all kind of Nodes that our Flow Builder supports.  
    2. Right now there is only Message Node, but we’d be adding more types of Nodes in the future so make this section extensible.  

3. **Edge**  
    1. Connects two Nodes together  

4. **Source Handle**  
    1. Source of a connecting edge  
    2. Can only have **one edge** originating from a source handle  

5. **Target Handle**  
    1. Target of a connecting edge  
    2. Can have **more than one edge** connecting to a target handle 
  
6. **Settings Panel**  
    1. Settings Panel will replace the Nodes Panel when a Node is selected  
    2. It has a text field to edit text of the selected Text Node  

7. **Save Button**  
    1. Button to save the flow  
    2. **Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles**


## Technologies Used

- **React**: For building the UI components and managing the application state.
- **Tailwind CSS**: For utility-first styling and responsive design.
- **Vite**: A fast and optimized build tool for React applications.

## 🌠 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: Version 21 or higher
- **npm**: Version 6 or higher
- **Git**: Version 6 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/santhoshpandi/chatbot-flow-builder.git
   ```

2. Navigate to the project directory:
   ```bash
   cd chatbot-flow-builder
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the Development server:
   ```bash
   npm run dev
   ```

The dashboard will be available at http://localhost:5173

## 📁 File Structure

 ``` 
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FlowBuilder/
│   │   │   ├── FlowBuilder.jsx         - Flow Builder
│   │   │   ├── NodePanel.jsx           - Node Panel
│   │   │   ├── SettingsPanel.jsx       - Settings Panel
│   │   │   ├── nodes/
│   │   │   │   ├── index.js
│   │   │   │   ├── MessageNode.jsx     - Message Node
│   │   ├── Footer.jsx
│   │   ├── NavBar.jsx
│   ├── contexts/
│   │   ├── FlowContext.jsx             - Context API
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js

  ```

## 🎭 Acknowledgments

- **React**: A JavaScript library for building user interfaces.
- **React Flow**: A library for building node-based UIs like flowcharts and editors.
- **React Icons**: Popular icon packs (Font Awesome, Material, etc.) as React components.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: An extremely fast build tool for modern web projects.
- **Context API**: A built-in method in React used for state management.


  

