'use client'

import { Icon } from '@iconify/react'
import Image from 'rc-image'
import 'rc-image/assets/index.css'
import { forwardRef, useImperativeHandle, useState } from 'react'

export const ImagePreview = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  // 抛出这个方法
  const showImage = (src: string) => {
    setImgSrc(src)
    setVisible(true)
  }

  useImperativeHandle(ref, () => ({
    showImage,
  }))

  return (
    <Image
      className="hidden"
      src={imgSrc}
      preview={{
        visible,
        onVisibleChange: (value) => {
          setVisible(value)
        },
        destroyOnClose: true,
        icons: {
          rotateLeft: <Icon icon="dashicons:image-rotate-left" />,
          rotateRight: <Icon icon="dashicons:image-rotate-right" />,
          close: <Icon icon="dashicons:no" />,
          zoomIn: <Icon icon="iconamoon:zoom-in-light" />,
          zoomOut: <Icon icon="clarity:zoom-out-line" />,
          left: <Icon icon="dashicons:arrow-left-alt2" />,
          right: <Icon icon="dashicons:arrow-right-alt2" />,
          flipX: <Icon icon="solar:flip-horizontal-broken" />,
          flipY: <Icon icon="solar:flip-vertical-broken" />,
        },
      }}
    />
  )
})
ImagePreview.displayName = 'ImagePreview'
