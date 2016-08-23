const $ = require('jquery');
require('./style.scss');

const $messageUserInput = $('.message-user');
const $messageContentInput = $('.message-content');
const $sendMessageButton = $('.send-message');

$.getJSON('/messages').then((data) => {
  console.log(data);
});

$sendMessageButton.on('click', function() {
  const user = $messageUserInput.val();
  const content = $messageContentInput.val();
  $.post('/messages', { message: { user: user, content: content } })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(JSON.parse(error.responseText).error);
  });
});
