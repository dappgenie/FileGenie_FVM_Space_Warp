export const useImageThumbnail = (file: File, size = 200) => {
  let data
  const img = new Image()
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      console.log(event)
      console.log(img)
      img.onload = function () {
        const oc = document.createElement('canvas')
        const octx = oc.getContext('2d')
        if (img.width > size) {
          oc.width = img.width
          oc.height = img.height
          octx?.drawImage(img, 0, 0)
          if (img.width > img.height) {
            oc.height = (img.height / img.width) * size
            oc.width = size
          }
          else {
            oc.width = (img.width / img.height) * size
            oc.height = size
          }
          octx?.drawImage(oc, 0, 0, oc.width, oc.height)
          octx?.drawImage(img, 0, 0, oc.width, oc.height)
          data = oc.toDataURL()
        }
        else {
          data = oc.toDataURL()
        }
        //   cb(data);
      }
      img.src = (event?.target?.result ?? '').toString()
    }
    reader.readAsDataURL(file)
  }
  return img
}
