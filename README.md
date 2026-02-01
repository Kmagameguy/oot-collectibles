# The Legend of Zelda: Ocarina of Time Collectibles Tracker
During my last playthrough of Ocarina of Time I found myself wanting a way to keep track of a few things:
1. How many heart pieces there were to collect
1. Which heart pieces I'd already collected
1. A filterable list of the heart pieces to make bulk collection easier

So, I decided to write a little application.  Hence this repo.

# Usage
1. Open the application's home page
1. You can interact with the filters to slice heart piece data by region, age requirement, and time of day requirement
1. You can mark a heart piece as collected and the app will show you a count of pieces collected vs total pieces available in the game
1. Your heart piece collection is pesisted locally using the localStorage API, so as long as you don't clear your browser cache/cookies you can leave and come back to the site at any time to pick up where you left off

# Development
## Pre-requisites
1. Node (I manage this with nvm)
1. TypeScript + Vite

## Running the Dev Server
1. Run `npm run dev`
1. This should start up a local webserver and host the page at `http://localhost:5173/oot-collectibles/` (note: the trailing slash is mandatory)

# Potential Future Improvements:
1. Add a Gold Skulltula tracker with similar features

# Notes
TypeScript + Vite are definitely overkill for this.  However, I wanted to check them out so I figured this would be a simple, straightforward playground to do that.
