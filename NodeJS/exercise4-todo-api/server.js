const http = require('http');

let todos = [];
let id = 1;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } else if (req.method === 'POST' && req.url === '/todos') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const task = JSON.parse(body);
            task.id = id++;
            todos.push(task);
            res.end(JSON.stringify(task));
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/todos/')) {
        const todoId = parseInt(req.url.split('/')[2]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const updated = JSON.parse(body);
            todos = todos.map(todo =>
                todo.id === todoId ? { ...todo, ...updated } : todo
            );
            res.end(JSON.stringify({ message: 'Updated' }));
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/todos/')) {
        const todoId = parseInt(req.url.split('/')[2]);
        todos = todos.filter(todo => todo.id !== todoId);
        res.end(JSON.stringify({ message: 'Deleted' }));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('TODO API running on port 3000');
});
