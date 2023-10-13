import { Download } from '../Dowload/Download'

export function Radius({ rows }) {
  const R_0 = rows.map((el, index) => {
    if (index === rows.length - 1) {
      return (`R${index + 1}="${el.element.split(' ')[7]}" ""\nR${index + 2}="${el.element.split(' ')[7]}" ""\n`)
    }
    return `R${index + 1}="${el.element.split(' ')[7]}" ""\n`
  })
  Download(R_0, 'R.txt')
}
