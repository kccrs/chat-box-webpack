const $ = require('jquery');
require('./style.scss');

const $messageUserInput = $('.message-user');
const $messageContentInput = $('.message-content');
const $sendMessageButton = $('.send-message');
const $deleteButton = $('.delete-button');

function getMessages() {
  $.getJSON('/messages').then(addMessagesToPage);
}

function turnMessageIntoHTML(message) {
  return $(
    `<article>
    ${message.user}: ${message.content}
    <button id="${message.id}"class="delete-button">Delete</button>
    </article>`
  );
}

function addMessagesToPage(data) {
  var allMessages = data.messages.map(turnMessageIntoHTML);
  $('.messages').append(allMessages);
}

function deleteMessage (message) {
  let id = parseInt(message.id);
  let newArray = message.filter(function(data) {
    return data.id !== this.id;
  });
  return newArray;

}

$('.messages').on('click', $deleteButton, function (id) {
  deleteMessage(id);
  getMessages();
});

$sendMessageButton.on('click', function(e) {
  e.preventDefault();
  const user = $messageUserInput.val();
  const content = $messageContentInput.val();

  $.post('/messages', {
    message: {
      user: user,
      content: content
    }
  })
  .then(getMessages);
  // .catch((error) => {
  //   console.error(JSON.parse(error.responseText).error);
  // });
});

getMessages();

// setInterval(getMessages, 1000);
