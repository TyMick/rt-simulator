# <var>R<sub>t</sub></var> Simulator

A data visualization illustrating the importance of keeping COVID-19's effective reproduction rate below 1. Still a work in progress, but if you'd like to build it yourself to see how it looks so far:

```sh
git clone https://github.com/tywmick/rt-simulator.git
cd rt-simulator
yarn
yarn start
```

Here's a GIF preview of the general idea:

![A preview showing the animated Rt simulation chart](/preview.gif)

This project was bootstrapped with [Create React App](https://create-react-app.dev/), builds projections with a little help from [jStat](http://www.jstat.org/), visualizes those projections with [Vega-Lite](https://vega.github.io/vega-lite/), uses data from [R<sub>t</sub> Live](https://rt.live/), fetches the data with [SWR](https://swr.vercel.app/), and wrangles the data with [Data-Forge](http://www.data-forge-js.com/).
