import { useRef } from 'react'

export const ColorPicker = () => {

  const dialogRef = useRef(null)

  const openDialog = () => {
    dialogRef.current.showModal()
  }

  const closeDialog = () => {
    dialogRef.current.close()
  }

  return (
    <div>
      <button onClick={openDialog}>Open dialog</button>
      <dialog ref={dialogRef}>
        <h1>Color Picker</h1>
        <input type="color" />
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  )
}