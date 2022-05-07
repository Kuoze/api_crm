# Instalar JSON-Server
npm i -g json-server

# Crear fichero con fake data
db.json
```
    {
        "clientes": []
    }
```

# Iniciar servidor
Abrir terminal -> json-server --watch db.json --port 4000

Abre el host -> localhost:4000/clientes para obtener la listay poder operar en base a "clientes"

# Nuestro deploy del fake server
https://my-json-server.typicode.com/Kuoze/api_crm/clientes