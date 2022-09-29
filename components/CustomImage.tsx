import NextImage from 'next/image'

type imageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  placeholder?: 'blur' | 'empty'
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive'
  [x: string]: any
}

export default function Image({
  src,
  alt = '',
  width,
  height,
  placeholder,
  layout,
  ...props
}: imageProps) {
  return (
    <div aria-label="image-wrapper" {...props}>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        placeholder={placeholder || 'blur'}
        layout={layout}
      />
    </div>
  )
}
