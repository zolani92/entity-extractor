# entity-extractor

To run it the first time: 
- Run Mongodb on port 27017 by using "mongod" command
- Connect to it
- Create a database entityExtractor
- Create two collections:
    - analysis
    - nextId
        - Add a document with id: 1
 - Launch "node server" command. This will run your application on port 3000

To run it next time:
- Run Mongodb on port 27017 by using "mongod" command
- Launch "node server" command. This will run your application on port 3000

To perform an analysis:
- POST /analysis/analyze?apiKey=:DandelionApiKey
```json
{ 
	"text": "London is the best city I have been in Europe!" 
}
```
- Please note you should replace :DandelionApiKey with valid Dandelion Api Key

- Example of response
```json
{
    "analysisId": 19,
    "queryText": "London is the best city I have been in Europe!",
    "entities": [
        {
            "name": "London",
            "uri": "http://en.wikipedia.org/wiki/London"
        },
        {
            "name": "Europe",
            "uri": "http://en.wikipedia.org/wiki/Europe"
        }
    ]
}
```

To retrieve previously analysis:
- GET /analysis/:analysisId
- Please note you should replace :analysisId with previous analysis id returned through POST /analysis/analyze request

How to scale in public cloud?
- Separate web layer from application layer. Add a web server as a reverse proxy to redirect to correct API (analyze API and retrieve API)
- Horizontal scaling. Add load balancer between client and web layer, web layer and application layer
- Master/Slave (read replicas) for each collection
- Add a cache to avoid unnecessary calls to Dandelion API
- Add a cache to cache analysis retrieval from database
- Implement circuit breaker to break circuit in case Dandelion API
