These notebooks are used for collection and analysis of Twitter and Reddit data as part of the Brookings-APHA project to study bystander action. The Jupyter notebooks listed here were used to collect, sample and visualize the conversation threads we analyzed as part of the project. In addition there is a static web application that can be used to see the various sampled conversations and their associated sentiment scores.

https://edsu.github.io/bystander-action/convs/site/

While the code used to create the datasets is available here, the raw data from the Twitter and PushShift APIs is not available publicly. The tweet and Reddit post identifiers are available in the ids subdirectory. The randomly sampled conversations and selected metadata are made available as part of the visualization the convs/public/data directory.

## Notebooks

The notebooks proceed from collection, conversation extraction, to sentiment analysis, network extraction for each of the platforms:

1. [Twitter Searches](https://github.com/edsu/bystander-action/blob/main/Twitter%20Searches.ipynb): collect Twitter data
2. [Twitter Conversation Collection](https://github.com/edsu/bystander-action/blob/main/Twitter%20Conversation%20Collection.ipynb): extract conversations from search results, and randomly sample them.
3. [Reddit Data Collection](https://github.com/edsu/bystander-action/blob/main/Reddit%20Data%20Collection.ipynb): collect Reddit data
4. [Reddit Data Analysis](https://github.com/edsu/bystander-action/blob/main/Reddit%20Data%20Analysis.ipynb): extract comment threads from search results, and randomly sample them
5. [Sentiment Analysis](https://github.com/edsu/bystander-action/blob/main/Sentiment%20Analysis.ipynb): add sentiment analysis to the conversation data.
6. [Conversation Graphs](https://github.com/edsu/bystander-action/blob/main/Conversation%20Graphs.ipynb): extract network graphs for the Reddit and Twitter conversations as edge and node lists
7. [Influencers](https://github.com/edsu/bystander-action/blob/main/Influencers.ipynb): an experiment in seeing the number of "influencers" in collected Twitter data

## Web Application

To build the web application you can:

    git clone https://github.com/edsu/bystander-action
    cd bystander-action/convs
    yarn install
    yarn dev

And then open http://localhost:3000/bystander-action/convs/site in your browser.

To deploy it with GitHub Pages you can:

    yarn build
    git commit -a -m 'latest build'
    git push

And then open https://edsu.github.com/bystander-action/convs/site
