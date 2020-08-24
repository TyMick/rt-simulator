# <var>R<sub>t</sub></var> Simulator

An interactive simulation that demonstrates how important it is to keep COVID-19's reproduction number (<var>R<sub>t</sub></var>) below 1.

I think most folks understand how dangerous it would be if each infected person spread the virus to 2 more people, but I imagine many would be surprised at how quickly cases rise if each person with COVID "only" infects an average of 1.1 people.

![A preview of the animated Rt simulation chart, showing the 13-fold growth of new cases in the next four months if Rt = 1.1, then moving to show how quickly new cases shrink if Rt = 0.9.](/public/preview.gif)

The simulation also allows the user to choose a U.S. state to fill its current <var>R<sub>t</sub></var> estimate (sourced from [R<sub>t</sub> Live](https://rt.live/)) and average daily cases, so they can see their own state's current outlook.

![A similar chart showing the projection of the next four months given the State of New York's current Rt estimate and average daily cases. At the time of this screenshot, the median Rt estimate was 0.92, with an 80% confidence interval between 0.73 and 1.09.](/public/preview-ny.png)

## Methodology, Data, & Tools

I adapted [my simulation model](https://github.com/tywmick/rt-simulator/blob/master/model.js) from Rt Live's model as they lay out in their [tutorial notebook](https://github.com/rtcovidlive/covid-model/blob/master/tutorial.ipynb). It accounts for the fact that it takes a few days for an infected person to pass on the virus by incorporating that delay (called the <dfn>generation time</dfn>) as a [log-normal probability distribution](https://en.wikipedia.org/wiki/Log-normal_distribution) with a mean of 4.7 days and standard deviation 2.9 days. Then, the number of newly infected people on a given day (<var>y<sub>t</sub></var>) is a sum that looks at all previous days, weighing the number of newly infected people <var>i</var> days ago (<var>y<sub>t - i</sub></var>​) by the generation time probability (<var>g<sub>i</sub></var>​) for that number of days and the effective reproduction number (which for the purposes of this simulation is being kept constant at <var>R<sub>e</sub></var>​). More succinctly,

![y_t = sum_{i = 1}^{M}{y_(t - 1) R_e g_i}](/public/summation.png)

Simulations run from today's date to four months in the future, and they treat every day prior to the start date as having a number of new infections equal to the "Initial daily infections" setting below the chart.

For the "Pick a U.S. state" dropdown, current <var>R<sub>t</sub></var> estimates and average daily cases are fetched directly [from R<sub>t</sub> Live](https://rt.live/#footer), and they source their case count data from [The COVID Tracking Project](https://covidtracking.com/). These real-time <var>R<sub>t</sub></var> estimates have an inherent degree of uncertainty, so each estimate includes an 80% confidence interval, which essentially means that we can be 80% sure that the _actual_ <var>R<sub>t</sub></var> value lies somewhere between those upper and lower bounds. You'll notice if you visit [R<sub>t</sub> Live's homepage](https://rt.live/) that as you look further back in time, these confidence intervals become smaller with the benefit of more data.

These are the primary tools I used in this project:

- Data visualization: [Vega-Lite](https://vega.github.io/vega-lite/)
- Statistics package: [jStat](http://www.jstat.org/)
- Data fetching: [SWR](https://swr.vercel.app/)
- Data wrangling: [Data-Forge](http://www.data-forge-js.com/)
- Math typesetting: [KaTeX](https://katex.org/) via [react-katex](https://github.com/MatejBransky/react-katex)
- Web framework: [Next.js](https://nextjs.org/)
- Web design library: [Bootstrap](https://getbootstrap.com/) via [React Bootstrap](https://react-bootstrap.github.io/)

Also, I have to say, while the focus of this project was the data visualization, not the web development, this project contains the most beautiful React code I've ever written. ⚛️
