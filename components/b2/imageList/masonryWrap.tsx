'use client'

import PhotoAlbum from 'react-photo-album'
import { useMemo } from 'react'
import type { FileUploadInfo } from '@/app/api/list'

const heights = [780, 1620, 720, 607, 608, 1549, 694, 1440, 810, 595, 160]
interface MasonryWrapProps {
  files: FileUploadInfo[]
}
export function MasonryWrap(props: MasonryWrapProps) {
  const { files } = props

  const ps = useMemo(() => {
    const photos = files?.map((file) => {
      const height = heights[Math.floor(Math.random() * heights.length)]
      return {
        src: `https://cloud.ryanuo.cc/${file.fileName}`,
        width: 1080,
        height,
        key: file.fileName,
      }
    }) || []
    return photos
  }, [files])

  return (
    <PhotoAlbum
      photos={ps}
      layout="rows"
      defaultContainerWidth={1650}
      sizes={{
        size: 'calc(100vw - 40px)',
        sizes: [
          { viewport: '(max-width: 299px)', size: 'calc(100vw - 10px)' },
          { viewport: '(max-width: 599px)', size: 'calc(100vw - 20px)' },
          { viewport: '(max-width: 1199px)', size: 'calc(100vw - 30px)' },
        ],
      }}
    />
  )
}
