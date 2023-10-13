/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable camelcase */
export function getTip({
  t, Z_start, Z_end, R0_start, R0_end, m_start, m_end, koef,
}) {
  return (
    (R0_start + ((t / (Z_end - Z_start)) * (R0_end - R0_start)))
          * (1
            + (koef) * ((0.5 * (m_start + m_end) + 0.5 * (m_start - m_end) * Math.cos(Math.PI * t / (Z_end - Z_start)) - 1) / (0.5 * (m_start + m_end) + 0.5 * (m_start - m_end) * Math.cos(Math.PI * t / (Z_end - Z_start)) + 1)
            ) * (Math.cos(Math.PI * t / (Z_end - Z_start))))
  )
}
