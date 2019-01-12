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
POST http://localhost:3000/analysis/analyze?apiKey=<DANDELION API KEY>
{
	"text": "London is the best city I have been in Europe!"
}

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
GET http://localhost:3000/analysis/<ANALYSIS ID>
(where you replace <ANALYSIS ID> by previous analysis id returned through POST /analysis/analyze request)
