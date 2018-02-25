# FlightSense

## Inspiration
We wanted to know when our flight would be delayed. We decided to use machine learning to make that happen.


## What is it built with? 

A lot!

### Infrastructure
* Google Compute Engine: we had to parse through over 32 million flights in the US through 2016 and 2017. We had to do some serious parsing with some big instances (32 vCPUS and 60GB of RAM) to get it done. There are few joys in life greater than a 1.27 second `yarn install`. Whoosh.
* AWS EC2: same purpose as above but with a worse UI. We had free credits, though.
* Microsoft Azure functions: this served information about airports to us. The only managed service with this information costs $99 which is ridiculous for open source information. We just wrote our own and served it on serverless infrastructure. We chose it because we wanted to experiment with what Azure had to offer us
* AWS Lambda: We used this to wrap the Amadeus API (see below). We used both Lambda and Azure functions simply because different teammates did different parts of the project.\
* Netlify: they build and deploy your frontend so damn well. We just inputted a build command and a build directory and we had a fully function static website that rebuilt on `git push`. Damn.
* Micrsoft Azure ML Studio: Azure did the heavy lifting on this project. We used the ML studio and many tutorials to build a classifier for our data. It had to process 32 million data points and did it. Mad respect

### Languages & Frameworks
* Python: Python did all the data parsing. It took the raw files that the US Bureau of Transportation Statistics provided to us and went through the hard work of parsing the data and cross referencing the weather.
* Node.js: the javascript handled timezone translation and getting the weather. It lived up to its reputation for async handling: at its peak, one instance dealt with thousands of threads at once. Fun note: we used the basic http module instead of express because http has slightly better perf.
  * Moment handled timezone parsing
* Bootstrap: boring

### APIs
* Dark Sky: a good and queryable data source for historical weather is hard to find. They charged us one *ten-thousandth* of a cent for a day of data at a location. As of this writing, we've spend $8.04 and it's been worth every penny. 
* Amadeus: they provided us with data on pricing to provide to people using our services. Neat stuff.


## The Prizes and why we're qualified
### Information Overload (Google)
We take data that's super messy and big (hundreds of megabytes of government CSVs) and we clean up the dates, crossreference it with the weather and then serve it to people so they can learn about their flights

### Head in the Clouds (Google)
We use a ton of cloud services, including some of the most cutting edge ones like Azure's ML services. 

### Hard core, Soft ware (Microsoft)
Machine learning when applied to data doesn't have super direct customer impacts right now (just think about: how many times does Cortana/Siri/Alexa/Google Assistant disappoint rather than please you). This is a very well defined problem with a lot of data so it makes it perfect for customer introduction to ML. 

### Data Storage and Migration (Microsoft)
We improve the tools around flight analysis to make it useful. The current competitors give you red or green or blue. We give you a probability around the chance of a delay and provides you with confidence. 

## Go Further (Amadeus)
We use Amadeus's API to present information about flight prices along with our analysis of chance of delaying
