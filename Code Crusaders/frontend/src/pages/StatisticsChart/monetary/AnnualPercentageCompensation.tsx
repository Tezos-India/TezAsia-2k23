import { useTranslation } from 'react-i18next'
import i18n, { currentLanguage } from '../../../utils/i18n'
import { tooltipColor, tooltipWidth, SmartChartPage } from '../common'
import { DATA_ZOOM_CONFIG } from '../../../utils/chart'
import { ChartCachedKeys } from '../../../constants/cache'
import { fetchStatisticAnnualPercentageCompensation } from '../../../service/http/fetcher'

const getOption = (
  statisticAnnualPercentageCompensations: State.StatisticAnnualPercentageCompensation[],
  chartColor: State.App['chartColor'],
  isMobile: boolean,
  isThumbnail = false,
): echarts.EChartOption => {
  const gridThumbnail = {
    left: '4%',
    right: '10%',
    top: '8%',
    bottom: '6%',
    containLabel: true,
  }
  const grid = {
    left: '2%',
    right: '3%',
    top: '5%',
    bottom: '5%',
    containLabel: true,
  }
  return {
    color: chartColor.colors,
    tooltip: !isThumbnail
      ? {
          trigger: 'axis',
          formatter: (dataList: any) => {
            const widthSpan = (value: string) => tooltipWidth(value, currentLanguage() === 'en' ? 220 : 80)
            let result = `<div>${tooltipColor('#333333')}${widthSpan(i18n.t('statistic.year'))} ${
              dataList[0].data[0]
            }</div>`
            result += `<div>${tooltipColor(chartColor.colors[0])}${widthSpan(i18n.t('statistic.nominal_apc'))} ${
              dataList[0].data[1]
            }%</div>`
            return result
          },
        }
      : undefined,
    grid: isThumbnail ? gridThumbnail : grid,
    dataZoom: isThumbnail ? [] : DATA_ZOOM_CONFIG,
    xAxis: [
      {
        name: isMobile || isThumbnail ? '' : i18n.t('statistic.year'),
        nameLocation: 'middle',
        nameGap: 30,
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          interval: isMobile || isThumbnail ? 7 : 3,
        },
      },
    ],
    yAxis: [
      {
        position: 'left',
        name: i18n.t('statistic.nominal_apc'),
        type: 'value',
        nameTextStyle: {
          align: 'left',
        },
        axisLine: {
          lineStyle: {
            color: chartColor.colors[0],
          },
        },
        axisLabel: {
          formatter: (value: string) => `${value}%`,
        },
      },
    ],
    series: [
      {
        name: i18n.t('statistic.nominal_apc'),
        type: 'line',
        yAxisIndex: 0,
        symbol: isThumbnail ? 'none' : 'circle',
        symbolSize: 3,
        stack: 'sum',
      },
    ],
    dataset: {
      source: statisticAnnualPercentageCompensations.map(data => [data.year, (+data.apc).toFixed(2)]),
    },
  }
}

const fetchStatisticAnnualPercentageCompensations = async () => {
  const {
    attributes: { nominalApc },
  } = await fetchStatisticAnnualPercentageCompensation()
  const statisticAnnualPercentageCompensations = nominalApc
    .filter((_apc, index) => index % 3 === 0 || index === nominalApc.length - 1)
    .map((apc, index) => ({
      year: 0.25 * index,
      apc,
    }))
  return statisticAnnualPercentageCompensations
}

const toCSV = (statisticAnnualPercentageCompensations: State.StatisticAnnualPercentageCompensation[]) =>
  statisticAnnualPercentageCompensations
    ? statisticAnnualPercentageCompensations.map(data => [data.year, (Number(data.apc) / 100).toFixed(4)])
    : []

export const AnnualPercentageCompensationChart = ({ isThumbnail = false }: { isThumbnail?: boolean }) => {
  const [t] = useTranslation()
  return (
    <SmartChartPage
      title={t('statistic.nominal_apc')}
      description={t('statistic.nominal_rpc_description')}
      isThumbnail={isThumbnail}
      fetchData={fetchStatisticAnnualPercentageCompensations}
      getEChartOption={getOption}
      toCSV={toCSV}
      cacheKey={ChartCachedKeys.APC}
      cacheMode="forever"
    />
  )
}

export default AnnualPercentageCompensationChart
