import React, { useState } from 'react'

interface Position {
  x: number | string
  y: number | string
}

export function useFollowMouse() {
  const [position, setPosition] = useState<Position>({ x: window.innerWidth / 2 - 100, y: 200 })
  const [dragging, setDragging] = useState<boolean>(false)
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 })

  const handleMouseDown = (e: any) => {
    setDragging(true)
    setOffset({
      x: e.clientX - (position.x as number),
      y: e.clientY - (position.y as number),
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - (offset.x as number),
        y: e.clientY - (offset.y as number),
      })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  return {
    position,
    dragging,
    handleMouseDown,
  }
}
