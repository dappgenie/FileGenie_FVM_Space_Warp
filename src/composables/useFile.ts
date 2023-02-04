import { Compressed, Document, FileTypes, Image, Music, Video } from '@dappgenie/utils'

export const useFileType = (type: FileTypes) => {
  switch (type) {
    case FileTypes.Image: {
      return Object.values(Image).join(',').toString()
    }
    case FileTypes.Video: {
      return Object.values(Video).join(',').toString()
    }
    case FileTypes.Compressed: {
      return Object.values(Compressed).join(',').toString()
    }
    case FileTypes.Document: {
      return Object.values(Document).join(',').toString()
    }
    case FileTypes.Music: {
      return Object.values(Music).join(',').toString()
    }
    case FileTypes.Any: {
      return ''
    }
    default:
      return ''
  }
}

const getKeyNameFromValue = (enumData: Record<string, string | number>, value: string, name: string) => {
  if (value) {
    if (Object.values(enumData).includes(value as any))
      return Object.entries(enumData).find(([_key, val]) => val === value)?.[0]
  }
  else {
    return name.split('.')[name.split('.').length - 1]
  }
}

export const useOrganicFileName = (name: string, fileType: FileTypes, type: string) => {
  switch (fileType) {
    case FileTypes.Image: {
      return `${FileTypes.Image}.${getKeyNameFromValue(Image, type, name)}`
    }
    case FileTypes.Video: {
      return `${FileTypes.Video}.${getKeyNameFromValue(Video, type, name)}`
    }
    case FileTypes.Compressed: {
      return `${FileTypes.Compressed}.${getKeyNameFromValue(Compressed, type, name)}`
    }
    case FileTypes.Document: {
      return `${FileTypes.Document}.${getKeyNameFromValue(Document, type, name)}`
    }
    case FileTypes.Music: {
      return `${FileTypes.Music}.${getKeyNameFromValue(Music, type, name)}`
    }
    default: {
      return `${FileTypes.Any}.${name.split('.')[name.split('.').length - 1]}`
    }
  }
}
