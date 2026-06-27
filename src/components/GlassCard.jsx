/**
 * GlassCard
 * The signature glassmorphism surface used throughout QRFreek:
 * translucent, blurred, softly bordered, with elegant shadow.
 */
export default function GlassCard({
  children,
  className = '',
  as: Tag = 'div',
  hover = false,
  ...rest
}) {
  return (
    <Tag
      className={`glass-surface rounded-3xl ${
        hover ? 'transition-transform duration-300 hover:-translate-y-1' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
