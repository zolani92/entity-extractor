# entity-extractor

To run it the first time: 
- Run Mongodb on port 27017 by using "mongod" command
- Connect to it
- Create a database entityExtractor
- Create two collections:
    - analysis
    - nextid
        - Add a document with id:1
 - Launch "node server" command

To run it next time:
- Run Mongodb on port 27017 by using "mongod" command
 - Launch "node server" command

To perform an analysis:
POST http://localhost:3000/analysis/analyze?apiKey=:DandelionApiKey
{
	"text": "London is the best city I have been in Europe!"
}
Please note you should replace :DandelionApiKey with valid Dandelion Api Key

Example of response
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

To retrieve previously analysis:
GET http://localhost:3000/analysis/:analysisId
Please note you should replace :analysisId with previous analysis id returned through POST /analysis/analyze request
