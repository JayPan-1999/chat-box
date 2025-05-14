# Ddai Chat Box

This is a widget for Staffbase that provides a customizable chat box interface for conversations. It's based on both Staffbase's widget-sdk and includes inspiration from Alibaba's ChatUI.

## Features

- Chat box that can be toggled on and off with a button
- Option to display the chat box permanently without a trigger button
- Support for text messages and file uploads
- Feedback functionality (like/dislike) for chat responses
- Custom styling and theming
- Fully responsive design

## Usage

Once installed and deployed, you can add the chat box to your page using the Staffbase widget:

```html
<ddai-chat-box
  message="Need help?"
  show-trigger-button="true"
  initial-visible="false"
  title="Chat Support"
  placeholder="Type your question here..."
  welcome-message="Hello! How can I help you today?"
></ddai-chat-box>
```

## Configuration Options

| Property          | Type    | Default                            | Description                                      |
| ----------------- | ------- | ---------------------------------- | ------------------------------------------------ |
| message           | string  | -                                  | This will be used as fallback for the chat title |
| showTriggerButton | boolean | true                               | Show a button to open/close the chat             |
| initialVisible    | boolean | false                              | Show the chat box when the page loads            |
| title             | string  | "Chat"                             | Title displayed at the top of the chat box       |
| placeholder       | string  | "Type your message here..."        | Placeholder text for the chat input field        |
| welcomeMessage    | string  | "Hello! How can I help you today?" | Initial message displayed in the chat            |

## Customization

The chat box can be customized by adjusting the configuration options above. For more advanced customization, you can modify the `ChatBox.tsx` component directly.

## Development

### Requirements

- Node.js
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Development Server

Start the development server:

```bash
npm start
```

or

```bash
yarn start
```

### Build

Build the widget:

```bash
npm run build
```

or

```bash
yarn build
```

## License

Apache License, Version 2.0
