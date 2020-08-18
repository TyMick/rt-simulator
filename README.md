# <var>R<sub>t</sub></var> Simulator

A data visualization illustrating the importance of keeping COVID-19's effective reproduction number below 1. Still a work in progress, but here's the general idea:

![A preview showing the animated Rt simulation chart](/preview.gif)

If you'd like to build it yourself to see how it looks right now, just

```sh
git clone https://github.com/tywmick/rt-simulator.git
cd rt-simulator
npm install
npm run dev
```

This project is built with [Next.js](https://nextjs.org/), builds projections with a little help from [jStat](http://www.jstat.org/), visualizes those projections with [Vega-Lite](https://vega.github.io/vega-lite/), uses data from [R<sub>t</sub> Live](https://rt.live/), fetches data with [SWR](https://swr.vercel.app/), and wrangles data with [Data-Forge](http://www.data-forge-js.com/).
