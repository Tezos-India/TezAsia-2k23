// Initialize Firebase (replace with your own config)
firebase.initializeApp(yourFirebaseConfig);

const db = firebase.firestore();
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.trim() !== '') {
    db.collection('messages').add({
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = '';
  }
});

// Listen for new messages
db.collection('messages')
  .orderBy('timestamp')
  .onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        const message = change.doc.data();
        const messageElement = document.createElement('div');
        messageElement.textContent = message.text;
        chatMessages.appendChild(messageElement);
      }
    });
  });

