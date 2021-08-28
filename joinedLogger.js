function joinedLogger(level, sep) {
  return function joiner(...messages) {
    return messages.map((message) => {
      if (message.level > level) {
        return message.message;
      }
    }).join(sep);
  }
}

const message1 = {message: 'Daly', level: 15};
const message2 = {message: 'Houssem', level: 20};
const message3 =  {message: 'Marwen', level: 35};

const loggedMessage = joinedLogger(10, ";")(message1, message2, message3);

console.log(`loggedMessage: ${loggedMessage}`);