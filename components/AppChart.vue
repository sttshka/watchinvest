<template>
  <div class="flex flex-col gap-3 lg:gap-4 2xl:gap-6">
    <div
      class="text-secondary text-14px :text-[17px] font-medium xl:text-[18px] 2xl:text-[28px] !leading-[120%]"
    >
      Price chart
    </div>
    <div ref="container"></div>
    <canvas ref="productChart"></canvas>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({pricesHistory: {type: Object, default: () => {}}, chronoHistory: {type: Object, default: () => {}}})
import { Chart } from "chart.js/auto";
const labels = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", ""];
const data = {
  labels: labels,
  datasets: [
    {
      label: "WatchCharts",
      data: [
        10000, 40000, 200000, 200000, 245978, 100000, 150000, 240000, 190000,
      ],
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          // This case happens on initial chart load
          return;
        }

        return getGradient(ctx, chartArea, true);
      },
      fill: true,
    },
    {
      label: "Chrono24",
      data: [
        100000, 124504, 104000, 200000, 245978, 200000, 400000, 300000, 390000,
      ],
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          // This case happens on initial chart load
          return;
        }

        return getGradient(ctx, chartArea, false);
      },
      fill: true,
    },

  ],
};
watch(() => props.pricesHistory, () => {
data.labels = Object.keys(props.pricesHistory)
data.datasets[0].data = Object.values(props.pricesHistory)
}, {immediate: true, deep: true})

watch(() => props.pricesHistory, () => {
  data.datasets[1].data = Object.values(props.chronoHistory)
}, {immediate: true, deep: true})
const container = ref();

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = container.value;

  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";

      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      htmlLegend: {
        // ID of the container to put the legend in
        containerID: "legend-container",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        position: "right",
      },
      x: {
        position: "bottom",
      },
    },
  },
  plugins: [htmlLegendPlugin],
};

const productChart = ref();
onMounted(() => {
  new Chart(productChart.value, config);
});

function getGradient(ctx, chartArea, isSecond = false) {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    if (isSecond) {
      gradient.addColorStop(1, "#FFDD2B");
      gradient.addColorStop(0, "rgba(255, 221, 43, 0.9)");
    } else {
      gradient.addColorStop(1, "#BD9542");
      gradient.addColorStop(0, "rgba(189, 149, 66, 0.9)");
    }
  }

  return gradient;
}
</script>

<style scoped></style>
