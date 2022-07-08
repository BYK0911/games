const Slip = (() => {
  let dragPrevX, dragPrevY

  const handlers = {}
  const emit = type => handlers[type] && handlers[type].forEach(h => h())

  return {
    listen () {
      document.body.addEventListener('dragstart', e => e.preventDefault())
      document.body.addEventListener('drag', e => e.preventDefault())
      document.body.addEventListener('mousedown', e => {
        dragPrevX = e.pageX
        dragPrevY = e.pageY
      })
      document.body.addEventListener('mouseup', e => {
        console.log('// mouseup', e)
        const dx = e.pageX - dragPrevX
        const dy = e.pageY - dragPrevY
        if (!dx && !dy) return

        const _dx = Math.abs(dx)
        const _dy = Math.abs(dy)
        if (_dx > _dy) {
          emit(dx > 0 ? 'right' : 'left')
        } else {
          emit(dy > 0 ? 'down' : 'up')
        }
      })
      document.body.addEventListener('touchstart', e => {
        dragPrevX = e.changedTouches[0].pageX
        dragPrevY = e.changedTouches[0].pageY
      })
      document.body.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].pageX - dragPrevX
        const dy = e.changedTouches[0].pageY - dragPrevY
        if (!dx && !dy) return

        const _dx = Math.abs(dx)
        const _dy = Math.abs(dy)
        if (_dx > _dy) {
          emit(dx > 0 ? 'right' : 'left')
        } else {
          emit(dy > 0 ? 'down' : 'up')
        }
      })
    },
  
    on (type, handler) {
      handlers[type] = handlers[type] || []
      handlers[type].push(handler)
    }
  }
})()