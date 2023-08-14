import Image from 'next/image'
import React, { useState } from 'react'

interface ImageDefaultProps {
  src: string
  alt: string
  fallBackSrc?: string
}

function OptimizedImageWithFallback({
  src = '',
  alt = '',
  fallBackSrc = '/images/mqdefault_6s.png',
  ...props
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <Image
      src={imageError || !src ? fallBackSrc : src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      onError={(e) => setImageError(true)}
      {...props}
    />
  )
}

export default OptimizedImageWithFallback
