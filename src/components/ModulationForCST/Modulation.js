import { Download } from '../Dowload/Download'

export function Modulation({ rows }) {
  const modulation = rows.map((el, index) => {
    if (index === rows.length - 1) {
      return (`m${index + 1}="${el.element.split(' ')[5]}" ""\nm${index + 2}="${el.element.split(' ')[5]}" ""\n`)
    }
    return `m${index + 1}="${el.element.split(' ')[5]}" ""\n`
  })
  Download(modulation, 'm.txt')
}
