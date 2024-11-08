import { createClient } from 'redis';
import { createCluster } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');

await client.hSet('user-session:123', {
  name: 'John',
  surname: 'Smith',
  company: 'Redis',
  age: 29
})

let userSession = await client.hGetAll('user-session:123');
console.log(JSON.stringify(userSession, null, 2));
/*
{
"surname": "Smith",
"name": "John",
"company": "Redis",
"age": "29"
}
*/

createClient({
  url: 'redis://alice:foobared@awesome.redis.server:6380'
});




const cluster = createCluster({
    rootNodes: [
        {
            url: 'redis://127.0.0.1:16379'
        },
        {
            url: 'redis://127.0.0.1:16380'
        },
        // ...
    ]
});



cluster.on('error', (err) => console.log('Redis Cluster Error', err));

await cluster.connect();

await cluster.set('foo', 'bar');
const value = await cluster.get('foo');
console.log(value); // returns 'bar'

await cluster.quit();







const client = createClient({
  username: 'default', // use your Redis user. More info https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/
  password: 'secret', // use your password here
  socket: {
      host: 'my-redis.cloud.redislabs.com',
      port: 6379,
      tls: true,
      key: readFileSync('./redis_user_private.key'),
      cert: readFileSync('./redis_user.crt'),
      ca: [readFileSync('./redis_ca.pem')]
  }
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const value = await client.get('foo');
console.log(value) // returns 'bar'

await client.disconnect();