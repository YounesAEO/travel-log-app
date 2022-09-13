## Travel Log APP

### Description

The current project is a small app that lets users save visited places and visualize them in a cool map.
The project uses Express and Mongoose in the backend and React and Mapbox for the frontend.
Right now, you can only add a new log and see added logs.
Later, updating an existing log and deleting logs will be added.
Authentication might also be added later.

### Running locally

To run locally:

1. Clone repo: https://github.com/YounesAEO/travel-log-app.git
2. Install dependencies: `npm install`
3. Add backend/frontend .env files with the correspondant environment variables, see .env.example files.
4. `npm run dev` to run the backend
5. `npm start` to run the react app

P.S: you'll need a mapbox token for the map to properly load, if you don't have it already, you can create a free account [here](https://www.mapbox.com/) and use your own public api token.

### License

MIT License

Copyright (c) [2022] [YounesAEO]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
