import http from 'http';
import { parse } from 'url';

const server = http.createServer();
const blockAddresses = [];
const conLogs = new Map();

server.on('request', (req, res) => {
  const { socket, url } = req;
  const { address } = socket.address();

  if (blockAddresses.includes(address)) {
    res.end('Blocked', address);
    socket.destroy();
  }

  assertAttack(address);
  addLog(address);

  const parsedURL = parse(url);

  let content = '';

  switch (parsedURL.pathname) {
    case '/':
      const { avgTime, count } = conLogs.get(address);
      content = `time : ${avgTime} // count: ${count} // isAttack : ${assertAttack(
        address,
      )} // blocklist : ${blockAddresses}`;
      break;
    case '/about':
      content = 'about page';
      break;
    default:
      content = 'unknown path';
  }

  res.end(content);
});

const assertAttack = address => {
  const { count, avgTime } = conLogs.get(address) || {};

  if (count >= 30) {
    if (avgTime <= 300) return addBlock(address);

    clearLog(address);
  }
};

const addBlock = address => blockAddresses.push(address);

const addLog = address => conLogs.set(address, makeLog(address));

const clearLog = address => conLogs.delete(address);

const makeLog = address => {
  const { count = 0, time: prevTime, avgTime: prevAvgTime } =
    conLogs.get(address) || {};
  const avgTime = !prevTime
    ? 0
    : ((prevAvgTime + (Date.now() - prevTime)) / 2) >> 0;

  return {
    count: count + 1,
    time: Date.now(),
    avgTime,
  };
};

server.listen(3000, () => {
  console.log('now listen');
});
