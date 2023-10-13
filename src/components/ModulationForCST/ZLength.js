import { Download } from '../Dowload/Download'

export function ZLength({ rows }) {
  const Z = rows.map((el, index) => `Z${index + 1}="${el.element.split(' ')[22]}" ""\n`)
  Download(Z, 'Z.txt')
}
