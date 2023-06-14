<div align="center">
    <br>
    <img src="https://i.imgur.com/OlvvGWs.jpeg" alt="Real Time Chat Demo" width="160" height="80">
    <br>
    <h3><strong>Real Time</strong> <em>Chat Demo<em></h3>
    <h4>A chat application that uses web sockets to send messages in real time when a user adds and chooses a online chat room.</h4>
</div>

  <img align="center" src="https://github.com/andresmgomez/realtime-chat-demo/blob/main/screenshot/chat-preview.gif" alt="Chat Demo" width="600px" />

## App Features

| Features           | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| Chat Rooms         | User can add different chat rooms and select which chat room is active |
| Chat Messages      | User can send multiple messages after choosing a chat room             |
| Real time Messages | Users that start a chat session can see host messages                  |

## Built With

-  [Bootstrap](https://getbootstrap.com/docs/5.0/layout/columns/) - Responsive Web Layout
-  [Next.js](https://nextjs.org/docs/) - The Web Framework used
-  [Socket.io](https://socket.io/docs/v3/) - Chat Server and Client Socket

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
